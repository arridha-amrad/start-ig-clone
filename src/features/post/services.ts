import { queryFeedPosts } from "@/lib/db/repositories/posts/fetchFeedPosts";
import { queryPostDetail } from "@/lib/db/repositories/posts/fetchPostDetail";
import { queryUserPosts } from "@/lib/db/repositories/posts/fetchUserPosts";
import { likePost as likeThisPost } from "@/lib/db/repositories/posts/likePost";
import {
  optionalAuthMiddleware,
  requireAuthMiddleware,
} from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { setTimeout } from "timers/promises";
import { z } from "zod";

export const fetchPostDetail = createServerFn()
  .middleware([optionalAuthMiddleware])
  .inputValidator(
    z.object({
      postId: z.string(),
    })
  )
  .handler(async ({ data: { postId }, context: { auth } }) => {
    return queryPostDetail(postId, auth?.user?.id);
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
    return queryFeedPosts(authUserId);
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
