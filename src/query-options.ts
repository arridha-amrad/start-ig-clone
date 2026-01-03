import { queryOptions } from "@tanstack/react-query";
import { fetchProfile, fetchSuggestedUsers } from "./features/user/query.user";
import { fetchFeedPosts } from "./features/post/query.post";

export const suggestedUsersQueryOptions = () =>
  queryOptions({
    queryKey: ["suggested-users"],
    queryFn: fetchSuggestedUsers,
    staleTime: 60 * 60 * 1000,
  });

export const feedPostsQueryOptions = (currentUserId?: string) =>
  queryOptions({
    queryKey: ["feed-posts"],
    queryFn: () => fetchFeedPosts(currentUserId ?? ""),
    staleTime: 60 * 60 * 1000,
    enabled: !!currentUserId,
  });

export const profileQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ["profile", username],
    queryFn: () => fetchProfile({ data: { username } }),
    staleTime: 60 * 60 * 1000,
  });
