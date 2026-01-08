import { queryOptions } from "@tanstack/react-query";
import { fetchFeedPosts, fetchUserPosts } from "./services";

export const postKeys = {
  feedPosts: "feed-posts",
  userPosts: "user-posts",
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
