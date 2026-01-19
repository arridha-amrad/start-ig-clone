import { CommentButtonLike } from "@/features/comments/components/ButtonLike";
import { TComment } from "@/features/comments/types";
import { formatShorthand } from "@/utils";
import { Button } from "@headlessui/react";
import { usePostDetailContext } from "./PostDetailProvider";

type Props = {
  comment: TComment;
};

export default function CommentCard({ comment }: Props) {
  const { setReplyState } = usePostDetailContext();

  const initReply = () => {
    setReplyState({
      parentCommentId: comment.id,
      toUserId: comment.userId,
      toUsername: comment.user.username,
    });
  };
  return (
    <div className="flex gap-4">
      {/* AVATAR */}
      <div className="flex-none rounded-full overflow-hidden h-8 aspect-square">
        <img
          src={comment.user.image ?? "/default.jpg"}
          alt="default"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="w-full flex">
          <div className="text-sm flex-1">
            <span className="font-semibold mr-2">{comment.user.username}</span>
            {comment.content}
          </div>
          <div className="flex-none">
            <CommentButtonLike commentId={comment.id} postId={comment.postId} />
          </div>
        </div>
        <div className="flex gap-x-4 text-xs text-foreground/50 font-medium">
          <span>{formatShorthand(comment.createdAt)}</span>
          {comment.totalLikes > 0 && (
            <span>
              {comment.totalLikes} {comment.totalLikes === 1 ? "like" : "likes"}
            </span>
          )}
          <div className="flex-none">
            <Button onClick={initReply} className="">
              Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
