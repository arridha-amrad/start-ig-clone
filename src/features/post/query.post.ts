import { sql } from "drizzle-orm";
import db from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const fetchFeedPosts = createServerFn()
  .inputValidator(
    z.object({
      currentUserId: z.string(),
    })
  )
  .handler(async ({ data: { currentUserId } }) => {
    const posts = await db.query.post.findMany({
      limit: 10,
      orderBy: (post, { desc }) => [desc(post.createdAt)],
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
          sql<boolean>`(select exists(select 1 from "post_like" where "post_like"."post_id" = "post"."id" and "post_like"."user_id" = ${currentUserId}))`.as(
            "is_liked"
          ),
      },
    });
    return posts;
  });

export type TFeedPost = Awaited<ReturnType<typeof fetchFeedPosts>>[number];
