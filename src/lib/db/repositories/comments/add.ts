import { TAddCommentSchema } from "@/lib/zod/post.schema";
import db from "../..";
import * as schema from "../../schema";

export async function addComment(data: TAddCommentSchema, authUserId: string) {
  const { body, postId, parenCommenttId } = data;
  const result = await db
    .insert(schema.comments)
    .values({
      content: body,
      postId,
      userId: authUserId,
      parentId: parenCommenttId,
    })
    .returning();
  return result[0];
}
