import { fetchComments as queryComments } from "@/lib/db/repositories/comments/fetchComments";
import {
  optionalAuthMiddleware,
  requireAuthMiddleware,
} from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { likeComment as likeC } from "@/lib/db/repositories/comments/like";
import { addCommentSchema } from "@/lib/zod/post.schema";
import { createComment } from "@/lib/db/repositories/comments/createComment";
import { fetchReplies as queryReplies } from "@/lib/db/repositories/comments/fetchReplies";

export const fetchReplies = createServerFn()
  .inputValidator(
    z.object({
      commentId: z.string(),
    }),
  )
  .middleware([optionalAuthMiddleware])
  .handler(async ({ data: { commentId }, context: { auth } }) => {
    return queryReplies(commentId, auth?.user.id);
  });

export const addComment = createServerFn()
  .inputValidator(addCommentSchema)
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context: { auth } }) => {
    return createComment(data, auth.user.id);
  });

export const fetchComments = createServerFn()
  .inputValidator(
    z.object({
      postId: z.string(),
    }),
  )
  .middleware([optionalAuthMiddleware])
  .handler(async ({ data: { postId }, context: { auth } }) => {
    const authUserId = auth?.user.id;
    return queryComments(postId, authUserId);
  });

export const likeComment = createServerFn()
  .inputValidator(
    z.object({
      commentId: z.string(),
    }),
  )
  .middleware([requireAuthMiddleware])
  .handler(async ({ data: { commentId }, context: { auth } }) => {
    return likeC(commentId, auth.user.id);
  });
