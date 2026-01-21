import { cn } from "@/utils";
import { Heart } from "lucide-react";
import { useLikePostMutation } from "../mutations";
import { Button } from "@headlessui/react";
import { TFeedPost, TPostDetail } from "../types";

export function FeedPostLikeButton({ post }: { post: TFeedPost }) {
  const { mutate } = useLikePostMutation(post.id);
  return (
    <div className="flex items-center gap-x-2">
      <Heart
        onClick={() => mutate()}
        className={cn(
          "size-6 cursor-pointer transition-colors",
          post.isLiked
            ? "fill-rose-500 text-rose-500"
            : "hover:text-foreground/80",
        )}
      />
      {post.totalLikes > 0 && (
        <p className="text-sm font-semibold">{post.totalLikes}</p>
      )}
    </div>
  );
}

export function PostDetailLikeButton({ post }: { post: TPostDetail }) {
  return (
    <div className="flex items-center gap-x-2">
      <Heart
        className={cn(
          "size-6 cursor-pointer transition-colors",
          post.isLiked
            ? "fill-rose-500 text-rose-500"
            : "hover:text-foreground/80",
        )}
      />
    </div>
  );
}

export function CommentLikeButton() {
  return (
    <Button>
      <Heart className="size-4" />
    </Button>
  );
}
