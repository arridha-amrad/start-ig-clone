import { PostAvatar } from "@/components/Avatar";
import Carousel from "@/components/Carousel";
import { PostDetailFollowButton } from "@/features/user/components/ButtonFollow";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { useRef } from "react";
import { postDetail } from "../queries";
import { PostDetailLikeButton } from "./ButtonLike";
import FormComment from "../../comments/components/FormComment";
import { formatDistanceToNowStrict } from "date-fns";
import Comments from "../../comments/components/CommentList";
import { cn } from "@/utils";
import useMeasure from "react-use-measure";
import { PostDetailProvider } from "@/components/PostDetailProvider";

type Props = {
  id: string;
};

const PostDetail = ({ id }: Props) => {
  const { data: post } = useSuspenseQuery(postDetail(id));

  const [refMeasure, { height }] = useMeasure();

  const formCommentInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      style={{ height }}
      className={cn(
        "flex w-full rounded-xl",
        height === 0 ? "" : "border overflow-hidden border-foreground/20"
      )}
    >
      {/* LEFT SIDE: Image/Graphic Section */}
      <div ref={refMeasure} className="h-max flex-1">
        <Carousel
          aspectRatio={post.aspectRatio}
          url={post.media.map((media) => media.url)}
        />
      </div>

      {/* RIGHT SIDE: Interactions & Comments */}
      <PostDetailProvider>
        <div style={{ height }} className="w-xs flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-foreground/20">
            <div className="flex items-center gap-3">
              <PostAvatar url={post.owner.image} />
              <Link
                to="/$username"
                params={{ username: post.owner.username }}
                className="font-medium text-sm"
              >
                {post.owner.username}
              </Link>
              {!post.owner.isFollowing && (
                <>
                  <span>•</span>
                  <PostDetailFollowButton />
                </>
              )}
            </div>
            <MoreHorizontal className="w-5 h-5 cursor-pointer" />
          </div>

          {/* Scrollable Comments Area */}
          <div className="w-full flex-1 flex-wrap overflow-y-auto p-4 space-y-4">
            {/* Main Caption */}
            <Comments postId={id} />
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-foreground/20">
            <div className="flex justify-between mb-2">
              <div className="flex gap-4">
                {/* <Heart className="w-6 h-6 hover:text-gray-600 cursor-pointer" /> */}
                <PostDetailLikeButton />
                <MessageCircle
                  onClick={() => formCommentInputRef.current?.focus()}
                  className="w-6 h-6 hover:text-gray-600 cursor-pointer"
                />
                <Send className="w-6 h-6 hover:text-gray-600 cursor-pointer" />
              </div>
              <Bookmark className="w-6 h-6 hover:text-gray-600 cursor-pointer" />
            </div>
            <div className="font-semibold text-sm">73,166 likes</div>
            <div className="text-foreground/50 text-[10px] uppercase mt-1">
              {formatDistanceToNowStrict(post.createdAt, { addSuffix: true })}
            </div>
          </div>
          <FormComment postId={id} ref={formCommentInputRef} />
        </div>
      </PostDetailProvider>
    </div>
  );
};

export default PostDetail;
