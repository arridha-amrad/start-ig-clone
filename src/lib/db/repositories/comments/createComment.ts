import { TAddCommentSchema } from "@/lib/zod/post.schema";
import db from "../..";
import * as schema from "../../schema";

export async function createComment(
  data: TAddCommentSchema,
  authUserId: string
) {
  const { body, postId, parentCommentId } = data;
  const result = await db
    .insert(schema.comments)
    .values({
      content: body,
      postId,
      userId: authUserId,
      parentId: parentCommentId,
    })
    .returning();
  return result[0];
}
