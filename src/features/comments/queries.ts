import { queryOptions } from "@tanstack/react-query";
import { fetchComments, fetchReplies } from "./service";

export const commentKeys = {
  comments: (postId: string) => ["comments", "post", postId],
  replies: (commentId: string) => ["replies", "comment", commentId],
};

export const comments = (postId: string) =>
  queryOptions({
    queryKey: commentKeys.comments(postId),
    queryFn: () => fetchComments({ data: { postId } }),
    staleTime: 60 * 60 * 1000,
  });

export const replies = (commentId: string) =>
  queryOptions({
    queryKey: commentKeys.replies(commentId),
    queryFn: () => fetchReplies({ data: { commentId } }),
    staleTime: 60 * 60 * 1000,
  });
