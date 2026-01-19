import { Button } from "@headlessui/react";
import { Heart } from "lucide-react";
import { useLikeCommentMutation } from "../mutations";

export function CommentButtonLike({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) {
  const {} = useLikeCommentMutation(commentId, postId);
  return (
    <Button className="">
      <Heart className="w-3 h-3 stroke-[3px]" />
    </Button>
  );
}
