import { Button } from "@headlessui/react";
import { Heart } from "lucide-react";

export function CommentButtonLike({ commentId }: { commentId: string }) {
  return (
    <Button className="">
      <Heart className="w-3 h-3 stroke-[3px]" />
    </Button>
  );
}
