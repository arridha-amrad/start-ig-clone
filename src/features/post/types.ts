import { fetchFeedPosts, fetchPostDetail, fetchUserPosts } from "./services";

export type TFeedPost = Awaited<ReturnType<typeof fetchFeedPosts>>[number];
export type TUserPost = Awaited<ReturnType<typeof fetchUserPosts>>[number];
export type TPostDetail = Awaited<ReturnType<typeof fetchPostDetail>>;
