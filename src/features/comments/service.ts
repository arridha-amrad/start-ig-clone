import db from "@/db";
import { optionalAuthMiddleware } from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import z from "zod";

const WITH_USER_COL = {
  id: true,
  username: true,
  name: true,
  image: true,
};

export const fetchComments = createServerFn()
  .inputValidator(
    z.object({
      postId: z.string(),
    })
  )
  .middleware([optionalAuthMiddleware])
  .handler(async ({ data: { postId }, context: { auth } }) => {
    const currUserId = auth?.user.id;
    try {
      const result = await db.query.comments.findMany({
        where: ({ postId: pId }, { eq }) => eq(pId, postId),
        limit: 10,
        orderBy: ({ createdAt }, { desc }) => desc(createdAt),
        extras: ({}) => ({
          isLiked: !!currUserId
            ? sql<boolean>`false`.as("is_liked")
            : sql<boolean>`true`.as("is_liked"),
        }),
        with: {
          replies: {
            with: {
              user: {
                columns: WITH_USER_COL,
              },
              replies: {
                limit: 5,
                orderBy: ({ createdAt }, { desc }) => desc(createdAt),
                with: {
                  user: {
                    columns: WITH_USER_COL,
                  },
                },
              },
            },
          },
        },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
