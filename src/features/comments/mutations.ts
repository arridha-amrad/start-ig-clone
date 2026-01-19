import { TAddCommentSchema } from "@/lib/zod/post.schema";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { me } from "../auth/queries";
import { postKeys } from "../post/queries";
import { TComment, TReply } from "./types";
import { addComment, likeComment } from "./service";
import { commentKeys } from "./queries";

export const useLikeCommentMutation = (commentId: string, postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => likeComment({ data: { commentId } }),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: commentKeys.comments(postId) });
      const prevComments = qc.getQueryData<TComment[]>(
        commentKeys.comments(postId),
      );
      qc.setQueryData(commentKeys.comments(postId), (old: TComment[]) => {
        return old.map((comment) =>
          comment.id !== commentId
            ? comment
            : {
                ...comment,
                isLiked: !comment.isLiked,
                totalLikes: comment.isLiked
                  ? Number(comment.totalLikes) - 1
                  : Number(comment.totalLikes) + 1,
              },
        );
      });
      return { prevComments };
    },
    onError: (_, __, mutateResult) => {
      const oldComments = mutateResult?.prevComments;
      qc.setQueryData(commentKeys.comments(postId), oldComments);
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: commentKeys.comments(postId),
        refetchType: "none",
      });
    },
  });
};

export const useAddCommentMutation = (
  postId: string,
  parentCommentId?: string,
) => {
  const qc = useQueryClient();
  const { data: currUser } = useQuery(me);
  return useMutation({
    mutationFn: (data: TAddCommentSchema) => addComment({ data }),
    onSuccess: (data) => {
      if (!currUser) return;
      if (parentCommentId) {
        // reply
        const newReply: TReply = {
          ...data,
          isLiked: false,
          totalLikes: 0,
          user: {
            id: currUser.id,
            image: currUser.image ?? null,
            name: currUser.name,
            username: currUser.username,
          },
        };
        qc.setQueryData(
          commentKeys.comments(postId),
          (old: TComment[] | undefined) => {
            if (!old) return [newReply];
            return old.map((comment) => ({
              ...comment,
              totalReplies:
                comment.id === parentCommentId
                  ? Number(comment.totalReplies) + 1
                  : comment.totalReplies,
              replies:
                comment.id === parentCommentId
                  ? [...comment.replies, newReply]
                  : comment.replies,
            }));
          },
        );
        return;
      }
      const newComment: TComment = {
        ...data,
        isLiked: false,
        replies: [],
        totalReplies: 0,
        totalLikes: 0,
        user: {
          id: currUser.id,
          image: currUser.image ?? null,
          name: currUser.name,
          username: currUser.username,
        },
      };
      qc.setQueryData(
        commentKeys.comments(postId),
        (old: TComment[] | undefined) => {
          if (!old) return [newComment];
          return [newComment, ...old];
        },
      );
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: commentKeys.comments(postId),
        refetchType: "none",
      });
    },
  });
};
