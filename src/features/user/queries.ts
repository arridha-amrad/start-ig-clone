import { queryOptions } from "@tanstack/react-query";
import { fetchProfile, fetchSuggestedUsers } from "./services";

export const userKeys = {
  suggestedUsers: "suggested-user",
  profile: (username: string) => ["profile", username],
};

export const suggestedUsers = queryOptions({
  queryKey: [userKeys.suggestedUsers],
  queryFn: fetchSuggestedUsers,
  staleTime: 60 * 60 * 1000,
  enabled: true,
});

export const profile = (username: string) =>
  queryOptions({
    queryKey: userKeys.profile(username),
    queryFn: () => fetchProfile({ data: { username } }),
    staleTime: 60 * 60 * 1000,
  });
