import { and, eq } from "drizzle-orm";
import db from "../..";
import * as schema from "../../schema";

export async function likeComment(commentId: string, authUserId: string) {
  try {
    return db.transaction(async (tx) => {
      const isLiked = await tx.query.commentLike.findFirst({
        where: ({ commentId: cId, userId }, { eq, and }) =>
          and(eq(cId, commentId), eq(userId, authUserId)),
      });
      if (isLiked) {
        // dislike
        await tx
          .delete(schema.commentLike)
          .where(
            and(
              eq(schema.commentLike.commentId, commentId),
              eq(schema.commentLike.userId, authUserId)
            )
          );
        return {
          isLiked: false,
        };
      }
      await tx.insert(schema.commentLike).values({
        commentId,
        userId: authUserId,
      });
      return {
        isLiked: true,
      };
    });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
}
