import { CommentButtonLike } from "@/features/comments/components/ButtonLike";
import { TComment } from "@/features/comments/types";
import { formatShorthand } from "@/utils";
import { Button } from "@headlessui/react";

type Props = {
  comment: TComment;
};

export default function CommentCard({ comment }: Props) {
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
            <CommentButtonLike commentId={comment.id} />
          </div>
        </div>
        <div className="flex gap-x-4 text-xs text-foreground/50 font-medium">
          <span>{formatShorthand(comment.createdAt)}</span>
          <span>2 likes</span>
          <div className="flex-none">
            <Button className="">Reply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
