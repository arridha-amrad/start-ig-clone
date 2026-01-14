import { addComment, likePost } from "@/features/post/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "./queries";
import { generateRandomString } from "better-auth/crypto";
import { me } from "../auth/queries";
import { TFeedPost } from "./types";
import { TAddCommentSchema } from "@/lib/zod/post.schema";
import { TComment } from "../comments/types";

export const useLikePostMutation = (postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => likePost({ data: { postId } }),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: [postKeys.feedPosts] });
      const prevFeedPosts = qc.getQueryData<TFeedPost[]>([postKeys.feedPosts]);
      qc.setQueryData([postKeys.feedPosts], (old: TFeedPost[]) => {
        return old.map((post) =>
          post.id !== postId
            ? post
            : {
                ...post,
                isLiked: !post.isLiked,
                totalLikes: post.isLiked
                  ? Number(post.totalLikes) - 1
                  : Number(post.totalLikes) + 1,
              }
        );
      });
      return {
        prevFeedPosts,
      };
    },
    onError: (_, __, mutateResult) => {
      const oldFeedPosts = mutateResult?.prevFeedPosts;
      qc.setQueryData([postKeys.feedPosts], oldFeedPosts);
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: [postKeys.feedPosts],
        refetchType: "none",
      });
    },
  });
};
