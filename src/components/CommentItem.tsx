import { CommentLikeButton } from "@/features/comments/components/ButtonLike";
import ReplyList from "@/features/comments/components/ReplyList";
import { TComment } from "@/features/comments/types";
import { formatShorthand } from "@/utils";
import { Button } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import { Suspense, useState } from "react";
import { usePostDetailContext } from "./PostDetailProvider";

export default function CommentItem({ comment }: { comment: TComment }) {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const { setReplyState } = usePostDetailContext();

  const handleReplyClick = () => {
    setReplyState({
      parentCommentId: comment.id,
      toUserId: comment.userId,
      toUsername: comment.user.username,
    });
  };

  return (
    <div className={`flex gap-3`}>
      {/* Avatar Section */}
      <div className="flex-none">
        <div className={`rounded-full overflow-hidden aspect-square h-8`}>
          <img
            src={comment.user.image ?? "/default.jpg"}
            alt={comment.user.username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-start gap-2">
          <div className="flex-1 text-sm leading-tight">
            <div className="flex flex-wrap">
              <p className="font-semibold mr-1">{comment.user.username}</p>
              <p>{comment.content}</p>
            </div>

            {/* Meta Actions (Time, Likes, Reply Button) */}
            <div className="flex mt-2 gap-x-4 text-xs text-foreground/50 font-medium items-center">
              <span>{formatShorthand(comment.createdAt)}</span>
              {comment.totalLikes > 0 && (
                <span>
                  {comment.totalLikes}{" "}
                  {comment.totalLikes === 1 ? "like" : "likes"}
                </span>
              )}
              <Button
                onClick={handleReplyClick}
                className="hover:text-foreground"
              >
                Reply
              </Button>
            </div>
          </div>

          <div className="flex-none">
            <CommentLikeButton
              commentId={comment.id}
              postId={comment.postId}
              isLiked={comment.isLiked}
            />
          </div>
        </div>

        {/* Recursive Replies Section */}
        {comment.totalReplies > 0 && (
          <div className="mt-2">
            {!isRepliesOpen ? (
              <div className="flex items-center gap-x-4">
                <div className="w-8 h-px bg-foreground/20" />
                <Button
                  onClick={() => setIsRepliesOpen(true)}
                  className="text-xs text-foreground/50 font-semibold"
                >
                  View {comment.totalReplies}{" "}
                  {comment.totalReplies === 1 ? "reply" : "replies"}
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <Suspense fallback={<Loader2 className="animate-spin w-4" />}>
                    <ReplyList commentId={comment.id} />
                  </Suspense>
                </div>
                <div className="flex items-center gap-x-4 mt-4">
                  <div className="w-8 h-px bg-foreground/20" />
                  <Button
                    onClick={() => setIsRepliesOpen(false)}
                    className="text-xs text-foreground/50 font-semibold"
                  >
                    Hide replies
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
