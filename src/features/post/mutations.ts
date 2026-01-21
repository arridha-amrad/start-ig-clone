import { likePost } from "@/features/post/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "./queries";
import { TFeedPost, TPostDetail } from "./types";

export const useLikePostMutation = (postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => likePost({ data: { postId } }),
    onMutate: async () => {
      // console.log("trigger...");

      // // post detail
      // await qc.cancelQueries({ queryKey: postKeys.postDetail(postId) });
      // const prevPostDetail = qc.getQueryData<TPostDetail>([
      //   postKeys.postDetail(postId),
      // ]);
      // console.log({ prevPostDetail });

      // qc.setQueryData([postKeys.postDetail(postId)], (old: TPostDetail) => {
      //   return {
      //     ...old,
      //     isLiked: !old.isLiked,
      //     totalLikes: old.isLiked
      //       ? Number(old.totalLikes) - 1
      //       : Number(old.totalLikes) + 1,
      //   };
      // });

      // feed posts
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
              },
        );
      });
      return {
        prevFeedPosts,
        // prevPostDetail,
      };
    },
    onError: (_, __, mutateResult) => {
      const oldFeedPosts = mutateResult?.prevFeedPosts;
      // const oldPostDetail = mutateResult?.prevPostDetail;
      // qc.setQueryData(postKeys.postDetail(postId), oldPostDetail);
      qc.setQueryData([postKeys.feedPosts], oldFeedPosts);
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: [postKeys.feedPosts],
        refetchType: "none",
      });
      // qc.invalidateQueries({
      //   queryKey: postKeys.postDetail(postId),
      //   refetchType: "none",
      // });
    },
  });
};
