import { likePost, TFeedPost } from "@/features/post/serverFn.post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLikePostMutation = (postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => likePost({ data: { postId } }),
    onSuccess: () => {
      qc.setQueryData(["feed-posts"], (old: TFeedPost[]) => {
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
    },
  });
};
