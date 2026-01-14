import { z } from "zod";

export const addCommentSchema = z.object({
  postId: z.string(),
  body: z.string(),
  parenCommenttId: z.string().optional(),
});
export type TAddCommentSchema = z.infer<typeof addCommentSchema>;
