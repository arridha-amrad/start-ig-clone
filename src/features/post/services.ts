import { and, eq, sql } from "drizzle-orm";
import db from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { postLike } from "@/db/schema";

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
        totalLikes:
          sql<number>`(select count(*) from "post_like" where "post_like"."post_id" = "post"."id")`.as(
            "likes_count"
          ),
        isLiked:
          sql<boolean>`(select exists(select 1 from "post_like" where "post_like"."post_id" = "post"."id" and "post_like"."user_id" = ${authUserId}))`.as(
            "is_liked"
          ),
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
