import { Button } from "@headlessui/react";
import { Heart } from "lucide-react";
import { useLikeCommentMutation, useLikeReplyMutation } from "../mutations";
import { cn } from "@/utils";

export function CommentLikeButton({
  commentId,
  postId,
  isLiked,
}: {
  commentId: string;
  postId: string;
  isLiked: boolean;
}) {
  const { mutate } = useLikeCommentMutation(commentId, postId);
  return (
    <Button onClick={() => mutate()}>
      <Heart
        className={cn(
          "w-3 stroke-[3px]",
          isLiked ? "fill-rose-500 text-rose-500" : "hover:text-foreground/80",
        )}
      />
    </Button>
  );
}

export function ReplyLikeButton({
  replyId,
  parentCommentId,
  isLiked,
}: {
  parentCommentId: string;
  replyId: string;
  isLiked: boolean;
}) {
  const { mutate } = useLikeReplyMutation(replyId, parentCommentId);
  return (
    <Button onClick={() => mutate()}>
      <Heart
        className={cn(
          "w-3 stroke-[3px]",
          isLiked ? "fill-rose-500 text-rose-500" : "hover:text-foreground/80",
        )}
      />
    </Button>
  );
}
