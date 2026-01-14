import { queryOptions } from "@tanstack/react-query";
import { fetchProfile, fetchSuggestedUsers } from "./services";
import { notFound } from "@tanstack/react-router";

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
    enabled: !!username && username !== "undefined",
    queryKey: userKeys.profile(username),
    queryFn: () => {
      try {
        return fetchProfile({ data: { username } });
      } catch (err) {
        const error = err as Error;
        if (error.message === "user not found") {
          throw notFound();
        }
        throw err;
      }
    },
    staleTime: 60 * 60 * 1000,
  });
