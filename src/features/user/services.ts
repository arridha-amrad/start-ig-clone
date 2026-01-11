import db from "@/db";
import * as schema from "@/db/schema";
import {
  optionalAuthMiddleware,
  requireAuthMiddleware,
} from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq, sql } from "drizzle-orm";
import z from "zod";

export const isFollowingQuery = (currUserId: string) =>
  sql<boolean>`
  exists (
    select 1 
    from "follows" 
    where "follows"."follower_id" = ${currUserId} 
    and "follows"."following_id" = "user"."id"
    )`.as("is_following");

export const fetchSuggestedUsers = createServerFn()
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { auth } }) => {
    const currentUserId = auth.user.id;
    const result = db.query.user.findMany({
      columns: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
      extras: {
        isFollowing: isFollowingQuery(currentUserId),
      },
      limit: 5,
      where: (users, { and, ne, notExists, eq }) => {
        return and(
          // 1. Exclude the current user
          ne(users.id, currentUserId),
          // 2. Exclude users already followed by the current user
          notExists(
            db
              .select()
              .from(schema.follows)
              .where(
                and(
                  eq(schema.follows.followerId, currentUserId),
                  eq(schema.follows.followingId, users.id)
                )
              )
          )
        );
      },
    });
    return result;
  });
export type TSuggestedUser = Awaited<
  ReturnType<typeof fetchSuggestedUsers>
>[number];

export const fetchProfile = createServerFn()
  .inputValidator(
    z.object({
      username: z.string(),
    })
  )
  .middleware([optionalAuthMiddleware])
  .handler(async ({ data: { username }, context: { auth } }) => {
    const currUserId = auth?.user?.id;
    try {
      const profile = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.username, username),
        with: {
          additionalInfo: true,
        },
        extras: (_, { sql }) => ({
          isFollowing: currUserId
            ? isFollowingQuery(currUserId)
            : sql<boolean>`false`.as("is_following"),
          totalPosts:
            sql<number>`(select count("post"."id") from "post" where "post"."user_id" = "user"."id")`.as(
              "total_posts"
            ),
          totalFollowers:
            sql<number>`(select count("follows"."follower_id") from "follows" where "follows"."following_id" = "user"."id")`.as(
              "total_followers"
            ),
          totalFollowing:
            sql<number>`(select count("follows"."following_id") from "follows" where "follows"."follower_id" = "user"."id")`.as(
              "total_following"
            ),
        }),
      });
      if (!profile) {
        throw new Error("Profile not found");
      }
      return profile;
    } catch (err) {
      throw new Error("Something went wrong");
    }
  });

export type TProfile = Awaited<ReturnType<typeof fetchProfile>>;
export const genderEnum = z.enum(["male", "female", "-"]);
export type TGender = z.infer<typeof genderEnum>;
export const updateProfileSchema = z.object({
  bio: z.string().optional(),
  website: z.url().optional(),
  showThreadsBadge: z.boolean().optional(),
  showAccountSuggestions: z.boolean().optional(),
  gender: genderEnum.optional(),
});
export const updateProfile = createServerFn()
  .inputValidator(updateProfileSchema)
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context }) => {
    try {
      const { bio, website, showThreadsBadge, showAccountSuggestions, gender } =
        data;
      const {
        auth: { user },
      } = context;
      const result = await db
        .update(schema.userAdditionalInfo)
        .set({
          bio,
          website,
          isShowThreadBadge: showThreadsBadge,
          isShowAccountSuggestion: showAccountSuggestions,
          gender,
        })
        .where(eq(schema.userAdditionalInfo.userId, user.id))
        .returning();
      return result;
    } catch (error) {
      throw error;
    }
  });

export const follow = createServerFn()
  .inputValidator(
    z.object({
      userId: z.string(),
    })
  )
  .middleware([requireAuthMiddleware])
  .handler(async ({ context, data: { userId } }) => {
    const {
      auth: { user },
    } = context;
    return db.transaction(async (tx) => {
      const existingFollow = await tx.query.follows.findFirst({
        where: (table, { eq, and }) =>
          and(eq(table.followerId, user.id), eq(table.followingId, userId)),
      });
      if (existingFollow) {
        // unfollow
        await db
          .delete(schema.follows)
          .where(
            and(
              eq(schema.follows.followerId, user.id),
              eq(schema.follows.followingId, userId)
            )
          );
        return {
          follow: false,
        };
      }
      await db.insert(schema.follows).values({
        followerId: user.id,
        followingId: userId,
      });
      return {
        follow: true,
      };
    });
  });
