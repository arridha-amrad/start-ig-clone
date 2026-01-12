import db from "@/db";
import { postLike, comments } from "@/db/schema";
import {
  optionalAuthMiddleware,
  requireAuthMiddleware,
} from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { and, eq, NotNull, sql } from "drizzle-orm";
import { setTimeout } from "timers/promises";
import { z } from "zod";

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

const USER_COLUMN = {
  name: true,
  image: true,
  id: true,
  username: true,
};

const addCommentSchema = z.object({
  postId: z.string(),
  body: z.string(),
  parenCommenttId: z.string().optional(),
});
export type TAddCommentSchema = z.infer<typeof addCommentSchema>;
export const addComment = createServerFn()
  .inputValidator(addCommentSchema)
  .middleware([requireAuthMiddleware])
  .handler(
    async ({
      data: { body, postId, parenCommenttId },
      context: {
        auth: { user },
      },
    }) => {
      const result = await db
        .insert(comments)
        .values({
          content: body,
          postId,
          userId: user.id,
          parentId: parenCommenttId,
        })
        .returning();
      // const comment = await db.query.comments.findFirst({
      //   where: ({ id }, { eq }) => eq(id, result[0].id),
      //   with: {
      //     user: {
      //       columns: USER_COLUMN,
      //     },
      //     replies: {
      //       with: {
      //         user: {
      //           columns: USER_COLUMN,
      //         },
      //       },
      //     },
      //   },
      // });
      return result[0];
    }
  );

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
          comments: {
            orderBy: (fields, { desc }) => desc(fields.createdAt),
            with: {
              replies: {
                orderBy: ({ createdAt }, { asc }) => asc(createdAt),
                limit: 5,
                with: {
                  user: {
                    columns: {
                      name: true,
                      image: true,
                      id: true,
                      username: true,
                    },
                  },
                },
              },
              user: {
                columns: {
                  name: true,
                  image: true,
                  id: true,
                  username: true,
                },
              },
            },
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
        return null;
      }
      return post;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  });
export type TFetchPostDetail = Awaited<ReturnType<typeof fetchPostDetail>>;
export type TComment = NonNullable<TFetchPostDetail>["comments"][number];
export type TReply =
  NonNullable<TFetchPostDetail>["comments"][number]["replies"][number];

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
