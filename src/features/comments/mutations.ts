import { TAddCommentSchema } from "@/lib/zod/post.schema";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { me } from "../auth/queries";
import { postKeys } from "../post/queries";
import { addComment } from "../post/services";
import { TComment } from "./types";

export const useAddCommentMutation = (postId: string) => {
  const qc = useQueryClient();
  const { data: currUser } = useQuery(me);
  return useMutation({
    mutationFn: (data: TAddCommentSchema) => addComment({ data }),
    onSuccess(data) {
      if (!currUser) return;
      const newComment: TComment = {
        ...data,
        isLiked: false,
        replies: [],
        totalReplies: 0,
        user: {
          id: currUser.id,
          image: currUser.image ?? null,
          name: currUser.name,
          username: currUser.username,
        },
      };
      qc.setQueryData(
        postKeys.comments(postId),
        (old: TComment[] | undefined) => {
          if (!old) return [newComment];
          return [newComment, ...old];
        }
      );
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: postKeys.comments(postId),
        refetchType: "none",
      });
    },
  });
};
