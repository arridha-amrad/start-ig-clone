import {
  addComment,
  likePost,
  TAddCommentSchema,
  TComment,
  TFeedPost,
  TFetchPostDetail,
  TReply,
} from "@/features/post/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "./queries";
import { generateRandomString } from "better-auth/crypto";
import { me } from "../auth/queries";

export const useAddCommentMutation = ({
  body,
  postId,
  parenCommenttId,
}: TAddCommentSchema) => {
  const qc = useQueryClient();
  const { data: currUser } = useQuery(me);
  return useMutation({
    mutationFn: () => addComment({ data: { body, postId, parenCommenttId } }),
    // onMutate: async () => {
    //   await qc.cancelQueries({ queryKey: postKeys.postDetail(postId) });
    //   const prevPost = qc.getQueryData<TFetchPostDetail>(
    //     postKeys.postDetail(postId)
    //   );
    //   const newComment: TComment = {
    //     id: generateRandomString(32),
    //     content: body,
    //     createdAt: new Date(),
    //     parentId: parenCommenttId ?? null,
    //     postId,
    //     replies: [],
    //     userId: currUser?.id ?? generateRandomString(32),
    //     updatedAt: new Date(),
    //     user: null
    //   };
    //   qc.setQueryData(postKeys.postDetail(postId), (old: TFetchPostDetail) => ({
    //     ...old,
    //     comments: old?.comments.unshift(newComment),
    //   }));
    //   return prevPost;
    // },
    // onSuccess(data, variables, onMutateResult, context) {
    //   const newComment: TComment = {
    //     ...data,
    //     replies: [] as TReply[]
    //   }
    //   qc.setQueryData(postKeys.postDetail(postId), )
    // },
  });
};

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
