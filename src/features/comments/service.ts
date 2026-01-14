import { fetchComments as queryComments } from "@/lib/db/repositories/comments/all";
import { optionalAuthMiddleware } from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const fetchComments = createServerFn()
  .inputValidator(
    z.object({
      postId: z.string(),
    })
  )
  .middleware([optionalAuthMiddleware])
  .handler(async ({ data: { postId }, context: { auth } }) => {
    const authUserId = auth?.user.id;
    return queryComments(postId, authUserId);
  });
