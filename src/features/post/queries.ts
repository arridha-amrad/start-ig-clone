import { queryOptions } from "@tanstack/react-query";
import { fetchFeedPosts, fetchPostDetail, fetchUserPosts } from "./services";
import { fetchComments } from "../comments/service";

export const postKeys = {
  feedPosts: "feed-posts",
  userPosts: "user-posts",
  postDetail: (id: string) => ["post-detail", id],
  comments: (postId: string) => ["comments", postId],
};

export const feedPosts = queryOptions({
  queryKey: [postKeys.feedPosts],
  queryFn: () => fetchFeedPosts(),
  staleTime: 60 * 60 * 1000,
  enabled: true,
});

export const userPosts = (userId: string) =>
  queryOptions({
    queryKey: [postKeys.userPosts, userId],
    queryFn: () => fetchUserPosts({ data: { userId } }),
    staleTime: 60 * 60 * 1000,
    enabled: userId !== "",
  });

export const postDetail = (postId: string) =>
  queryOptions({
    queryKey: postKeys.postDetail(postId),
    queryFn: () => fetchPostDetail({ data: { postId } }),
    staleTime: 60 * 60 * 1000,
  });

export const comments = (postId: string) =>
  queryOptions({
    queryKey: postKeys.comments(postId),
    queryFn: () => fetchComments({ data: { postId } }),
    staleTime: 60 * 60 * 1000,
  });
