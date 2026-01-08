import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentUser } from "./services";

export const authKeys = {
  currentUser: "current-user",
};

export const me = queryOptions({
  queryKey: [authKeys.currentUser],
  queryFn: fetchCurrentUser,
  staleTime: 60 * 60 * 1000,
});
