import { queryOptions } from "@tanstack/react-query";
import {
  fetchProfile,
  fetchSuggestedUsers,
} from "./features/user/serverFn.user";
import { fetchFeedPosts, fetchUserPosts } from "./features/post/serverFn.post";
import { fetchCurrentUser } from "./features/auth/query.auth";

export const suggestedUsersQueryOptions = (currentUserId: string) =>
  queryOptions({
    queryKey: ["suggested-users"],
    queryFn: () => fetchSuggestedUsers({ data: { currentUserId } }),
    staleTime: 60 * 60 * 1000,
    enabled: currentUserId !== "",
  });

export const feedPostsQueryOptions = (currentUserId: string) =>
  queryOptions({
    queryKey: ["feed-posts"],
    queryFn: () => fetchFeedPosts({ data: { currentUserId } }),
    staleTime: 60 * 60 * 1000,
    enabled: currentUserId !== "",
  });

export const profileQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ["profile", username],
    queryFn: () => fetchProfile({ data: { username } }),
    staleTime: 60 * 60 * 1000,
  });

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    staleTime: 60 * 60 * 1000,
  });

export const userPostsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["user-posts", userId],
    queryFn: () => fetchUserPosts({ data: { userId } }),
    staleTime: 60 * 60 * 1000,
    enabled: userId !== "",
  });
