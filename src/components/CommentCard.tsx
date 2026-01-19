import { CommentButtonLike } from "@/features/comments/components/ButtonLike";
import { TComment, TReply } from "@/features/comments/types";
import { formatShorthand } from "@/utils";
import { Button } from "@headlessui/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { usePostDetailContext } from "./PostDetailProvider";

type Props = {
  comment: TComment;
};

export default function CommentCard({ comment }: Props) {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Avatar image={comment.user.image} />
      <div className="flex-1">
        <SectionOne
          username={comment.user.username}
          content={comment.content}
          commentId={comment.id}
          postId={comment.postId}
        />
        <SectionTwo
          commentId={comment.id}
          userId={comment.userId}
          username={comment.user.username}
          totalLikes={comment.totalLikes}
          createdAt={comment.createdAt}
        />
        {comment.totalReplies > 0 && (
          <>
            {!isRepliesOpen && (
              <div className="my-4 flex items-center gap-x-4">
                <RepliesToggleButton
                  onClick={() => setIsRepliesOpen(true)}
                  totalReplies={comment.totalReplies}
                  label="View"
                />
              </div>
            )}
            {isRepliesOpen && (
              <div className="flex mt-4 flex-col gap-y-4">
                {comment.replies.map((reply) => (
                  <ReplyCard key={reply.id} reply={reply} />
                ))}
              </div>
            )}
            {isRepliesOpen && (
              <div className="my-4 flex items-center gap-x-4">
                <RepliesToggleButton
                  onClick={() => setIsRepliesOpen(false)}
                  totalReplies={comment.totalReplies}
                  label="Hide"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const ReplyCard = ({ reply }: { reply: TReply }) => {
  return (
    <div className="flex gap-2">
      <Avatar image={reply.user.image} />
      <div className="flex-1">
        <SectionOne
          commentId={reply.id}
          content={reply.content}
          username={reply.user.username}
          postId={reply.postId}
          isReply
        />
        {reply.parentId && (
          <SectionTwo
            commentId={reply.parentId}
            userId={reply.userId}
            username={reply.user.username}
            totalLikes={reply.totalLikes}
            createdAt={reply.createdAt}
          />
        )}
      </div>
    </div>
  );
};

const SectionTwo = ({
  commentId,
  userId,
  username,
  totalLikes,
  createdAt,
}: {
  commentId: string;
  userId: string;
  username: string;
  totalLikes: number;
  createdAt: Date;
}) => {
  const { setReplyState } = usePostDetailContext();
  const initReply = () => {
    setReplyState({
      parentCommentId: commentId,
      toUserId: userId,
      toUsername: username,
    });
  };
  return (
    <div className="flex mt-2 gap-x-4 text-xs text-foreground/50 font-medium">
      <span>{formatShorthand(createdAt)}</span>
      {totalLikes > 0 && (
        <span>
          {totalLikes} {totalLikes === 1 ? "like" : "likes"}
        </span>
      )}
      <div className="flex-none">
        <Button onClick={initReply} className="">
          Reply
        </Button>
      </div>
    </div>
  );
};

const SectionOne = ({
  username,
  content,
  commentId,
  postId,
  isReply = false,
}: {
  username: string;
  content: string;
  commentId: string;
  postId: string;
  isReply?: boolean;
}) => {
  const body = content.split(" ");
  const startBody = body.slice(0, 1)[0];
  const restBody = body.slice(1);
  return (
    <div className="w-full flex">
      <div className="text-sm flex flex-wrap flex-1">
        <p className="font-semibold mr-2">{username}</p>
        {isReply ? (
          <Link
            to={"/$username"}
            params={{ username: startBody.replace("@", "") }}
            className="text-skin-primary"
          >
            {startBody}
          </Link>
        ) : (
          <span>{startBody}</span>
        )}
        <p>&nbsp;{restBody.join(" ")}</p>
      </div>
      <div className="flex-none">
        <CommentButtonLike commentId={commentId} postId={postId} />
      </div>
    </div>
  );
};

const Avatar = ({ image }: { image?: string | null }) => {
  return (
    <div className="flex-none rounded-full overflow-hidden h-8 aspect-square">
      <img
        src={image ?? "/default.jpg"}
        alt="default"
        className="aspect-square object-cover"
      />
    </div>
  );
};

const RepliesToggleButton = ({
  totalReplies,
  onClick,
  label,
}: {
  totalReplies: number;
  onClick: () => void;
  label: string;
}) => {
  return (
    <>
      <div className="w-[15%] h-0.5 bg-foreground/40" />
      <Button
        onClick={onClick}
        className="text-xs text-foreground/50 font-medium"
      >
        {label} {totalReplies} {totalReplies === 1 ? "reply" : "replies"}
      </Button>
    </>
  );
};
