import { queryOptions } from "@tanstack/react-query";
import { fetchFeedPosts, fetchUserPosts } from "./services";

export const postKeys = {
  feedPosts: ["feed-posts"],
  userPosts: (userId: string) => ["user-posts", userId],
};

export const feedPosts = queryOptions({
  queryKey: ["feed-posts"],
  queryFn: () => fetchFeedPosts(),
  staleTime: 60 * 60 * 1000,
  enabled: true,
});

export const userPosts = (userId: string) =>
  queryOptions({
    queryKey: ["user-posts", userId],
    queryFn: () => fetchUserPosts({ data: { userId } }),
    staleTime: 60 * 60 * 1000,
    enabled: userId !== "",
  });
