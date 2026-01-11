import db from "@/db";
import { postLike } from "@/db/schema";
import {
  optionalAuthMiddleware,
  requireAuthMiddleware,
} from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq, sql } from "drizzle-orm";
import { setTimeout } from "timers/promises";
import { z } from "zod";
import { isFollowingQuery } from "../user/services";

const totalLikesQuery = sql<number>`(
    select count(*) 
    from "post_like" 
    where "post_like"."post_id" = "post"."id"
  )`.as("likes_count");

const isLikedQuery = (authUserId: string) =>
  sql<boolean>`(
    select exists(
    select 1 from "post_like"
    where "post_like"."post_id" = "post"."id"
    and "post_like"."user_id" = ${authUserId})
  )`.as("is_liked");

export const fetchPostDetail = createServerFn()
  .middleware([optionalAuthMiddleware])
  .inputValidator(
    z.object({
      postId: z.string(),
    })
  )
  .handler(async ({ data: { postId }, context: { auth } }) => {
    const authUserId = auth?.user?.id;
    try {
      const post = await db.query.post.findFirst({
        where: (post, { eq }) => eq(post.id, postId),
        with: {
          media: true,
          owner: {
            columns: {
              name: true,
              image: true,
              id: true,
              username: true,
            },
            extras: (user, { sql }) => ({
              isFollowing: authUserId
                ? sql<boolean>`
                    exists (
                    select 1 
                    from "follows" 
                    where "follows"."follower_id" = ${authUserId} 
                    and "follows"."following_id" = ${user.id}
                    )`.as("is_following")
                : sql<boolean>`false`.as("is_following"),
            }),
          },
        },
        extras: {
          totalLikes: totalLikesQuery,
          isLiked: authUserId
            ? isLikedQuery(authUserId)
            : sql<boolean>`false`.as("is_liked"),
        },
      });
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  });

export const likePost = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      postId: z.string(),
    })
  )
  .middleware([requireAuthMiddleware])
  .handler(
    async ({
      context: {
        auth: { user },
      },
      data: { postId },
    }) => {
      await setTimeout(5000);
      try {
        return await db.transaction(async (tx) => {
          const existingLike = await tx.query.postLike.findFirst({
            where: (postLike, { eq, and }) =>
              and(eq(postLike.postId, postId), eq(postLike.userId, user.id)),
          });
          if (existingLike) {
            await tx
              .delete(postLike)
              .where(
                and(eq(postLike.postId, postId), eq(postLike.userId, user.id))
              );
            return { liked: false };
          }
          await tx.insert(postLike).values({
            userId: user.id,
            postId: postId,
          });
          return { liked: true };
        });
      } catch (err) {
        console.error(err);
        throw new Error("Something went wrong");
      }
    }
  );

export const fetchFeedPosts = createServerFn()
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { auth } }) => {
    const authUserId = auth.user.id;
    const posts = await db.query.post.findMany({
      limit: 10,
      orderBy: ({ createdAt }, { desc }) => desc(createdAt),
      with: {
        owner: {
          columns: {
            name: true,
            image: true,
            id: true,
            username: true,
          },
        },
        media: true,
      },
      extras: {
        totalLikes: totalLikesQuery,
        isLiked: isLikedQuery(authUserId),
      },
    });
    return posts;
  });

export type TFeedPost = Awaited<ReturnType<typeof fetchFeedPosts>>[number];

export const fetchUserPosts = createServerFn()
  .inputValidator(
    z.object({
      userId: z.string(),
    })
  )
  .handler(async ({ data: { userId } }) => {
    const posts = await db.query.post.findMany({
      with: {
        media: true,
      },
      where: (post, { eq }) => eq(post.userId, userId),
    });
    return posts;
  });
export type TUserPost = Awaited<ReturnType<typeof fetchUserPosts>>[number];
