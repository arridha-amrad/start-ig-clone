import { CommentButtonLike } from "@/features/comments/components/ButtonLike";
import { TComment } from "@/features/comments/types";

type Props = {
  comment: TComment;
};

export default function CommentCard({ comment }: Props) {
  return (
    <div className="flex gap-4 border">
      <div className="flex-none rounded-full overflow-hidden h-8 aspect-square">
        <img
          src={comment.user.image ?? "/default.jpg"}
          alt="default"
          className="aspect-square object-cover"
        />
      </div>
      <div className="text-sm flex-1">
        <span className="font-semibold mr-2">{comment.user.username}</span>
        {comment.content} Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Ex, blanditiis!
      </div>
      <div className="">
        <CommentButtonLike commentId={comment.id} />
      </div>
    </div>
  );
}
