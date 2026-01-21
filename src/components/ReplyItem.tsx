import { ReplyLikeButton } from "@/features/comments/components/ButtonLike";
import { TReply } from "@/features/comments/types";
import { formatShorthand } from "@/utils";
import { Button } from "@headlessui/react";
import { Link } from "@tanstack/react-router";
import { usePostDetailContext } from "./PostDetailProvider";

export default function CommentItem({ data }: { data: TReply }) {
  const { setReplyState } = usePostDetailContext();

  const body = data.content.split(" ");
  const firstWord = body[0];
  const restBody = body.slice(1).join(" ");

  const handleReplyClick = () => {
    setReplyState({
      parentCommentId: data.parentId!,
      toUserId: data.userId,
      toUsername: data.user.username,
    });
  };

  return (
    <div className={`flex gap-2`}>
      {/* Avatar Section */}
      <div className="flex-none">
        <div className={`rounded-full overflow-hidden aspect-square h-6`}>
          <img
            src={data.user.image ?? "/default.jpg"}
            alt={data.user.username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-start gap-2">
          <div className="flex-1 text-sm leading-tight">
            <div className="flex flex-wrap">
              <p className="font-semibold mr-1">{data.user.username}</p>
              {firstWord.startsWith("@") ? (
                <Link
                  to={"/$username"}
                  params={{ username: firstWord.replace("@", "") }}
                  className="text-skin-primary hover:underline"
                >
                  {firstWord}
                </Link>
              ) : (
                <p>{firstWord}</p>
              )}
              <p>&nbsp;{restBody}</p>
            </div>

            {/* Meta Actions (Time, Likes, Reply Button) */}
            <div className="flex mt-2 gap-x-4 text-xs text-foreground/50 font-medium items-center">
              <span>{formatShorthand(data.createdAt)}</span>
              {data.totalLikes > 0 && (
                <span>
                  {data.totalLikes} {data.totalLikes === 1 ? "like" : "likes"}
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
            <ReplyLikeButton
              parentCommentId={data.parentId ?? ""}
              isLiked={data.isLiked}
              replyId={data.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
