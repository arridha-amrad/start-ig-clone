import { queryOptions } from "@tanstack/react-query";
import { fetchComments } from "./service";

export const commentKeys = {
  comments: (postId: string) => ["comments", "post", postId],
};

export const comments = (postId: string) =>
  queryOptions({
    queryKey: commentKeys.comments(postId),
    queryFn: () => fetchComments({ data: { postId } }),
    staleTime: 60 * 60 * 1000,
  });
