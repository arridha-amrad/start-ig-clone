import { fetchProfile, fetchSuggestedUsers } from "./services";

export type TSuggestedUser = Awaited<
  ReturnType<typeof fetchSuggestedUsers>
>[number];

export type TProfile = Awaited<ReturnType<typeof fetchProfile>>;
