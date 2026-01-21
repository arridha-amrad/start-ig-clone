import { likePost } from "@/features/post/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "./queries";
import { TFeedPost, TPostDetail } from "./types";

export const useLikePostMutation = (postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => likePost({ data: { postId } }),
    onMutate: async () => {
      // 1. cancel ongoing re-fetches so they don't overwrite my optimistic update
      await Promise.all([
        qc.cancelQueries({ queryKey: postKeys.postDetail(postId) }),
        qc.cancelQueries({ queryKey: [postKeys.feedPosts] }),
      ]);

      // 2. snapshot old data for rollback if an error occurs
      const prevPostDetail = qc.getQueryData<TPostDetail>(
        postKeys.postDetail(postId),
      );
      const prevFeedPosts = qc.getQueryData<TFeedPost[]>([postKeys.feedPosts]);

      // 3. optimistic update for post detail
      qc.setQueryData(
        postKeys.postDetail(postId),
        (old: TPostDetail | undefined) => {
          if (!old) return old;
          return {
            ...old,
            isLiked: !old.isLiked,
            totalLikes: old.isLiked
              ? Number(old.totalLikes) - 1
              : Number(old.totalLikes) + 1,
          };
        },
      );

      // 4. optimistic update for feed posts
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
              },
        );
      });

      return {
        prevFeedPosts,
        prevPostDetail,
      };
    },
    onError: (_, __, mutateResult) => {
      if (mutateResult?.prevFeedPosts) {
        qc.setQueryData([postKeys.feedPosts], mutateResult?.prevFeedPosts);
      }
      if (mutateResult?.prevPostDetail) {
        qc.setQueryData(
          postKeys.postDetail(postId),
          mutateResult?.prevPostDetail,
        );
      }
    },
    onSettled: () => {
      // re-sync with the server
      qc.invalidateQueries({
        queryKey: [postKeys.feedPosts],
        refetchType: "none",
      });
      qc.invalidateQueries({
        queryKey: postKeys.postDetail(postId),
        refetchType: "none",
      });
    },
  });
};
