import { addComment as addCommentToPost } from "@/lib/db/repositories/comments/add";
import { queryPosts } from "@/lib/db/repositories/posts/all";
import { queryPostById } from "@/lib/db/repositories/posts/byId";
import { queryUserPosts } from "@/lib/db/repositories/posts/byUserId";
import { likePost as likeThisPost } from "@/lib/db/repositories/posts/like";
import { addCommentSchema } from "@/lib/zod/post.schema";
import {
  optionalAuthMiddleware,
  requireAuthMiddleware,
} from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { setTimeout } from "timers/promises";
import { z } from "zod";

export const addComment = createServerFn()
  .inputValidator(addCommentSchema)
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context: { auth } }) => {
    return addCommentToPost(data, auth.user.id);
  });

export const fetchPostDetail = createServerFn()
  .middleware([optionalAuthMiddleware])
  .inputValidator(
    z.object({
      postId: z.string(),
    })
  )
  .handler(async ({ data: { postId }, context: { auth } }) => {
    const authUserId = auth?.user?.id;
    return queryPostById(postId, authUserId);
  });

export const likePost = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      postId: z.string(),
    })
  )
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { auth }, data: { postId } }) => {
    await setTimeout(5000);
    return likeThisPost(postId, auth.user.id);
  });

export const fetchFeedPosts = createServerFn()
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { auth } }) => {
    const authUserId = auth.user.id;
    return queryPosts(authUserId);
  });

export const fetchUserPosts = createServerFn()
  .inputValidator(
    z.object({
      userId: z.string(),
    })
  )
  .handler(async ({ data: { userId } }) => {
    return queryUserPosts(userId);
  });
