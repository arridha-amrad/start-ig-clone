import { and, eq } from "drizzle-orm";
import db from "../..";
import * as schema from "../../schema";

export async function likePost(postId: string, authUserId: string) {
  console.log("ready to like..");

  try {
    return await db.transaction(async (tx) => {
      const existingLike = await tx.query.postLike.findFirst({
        where: (postLike, { eq, and }) =>
          and(eq(postLike.postId, postId), eq(postLike.userId, authUserId)),
      });
      if (existingLike) {
        await tx
          .delete(schema.postLike)
          .where(
            and(
              eq(schema.postLike.postId, postId),
              eq(schema.postLike.userId, authUserId),
            ),
          );
        return { liked: false };
      }
      await tx.insert(schema.postLike).values({
        userId: authUserId,
        postId: postId,
      });
      return { liked: true };
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong");
  }
}
