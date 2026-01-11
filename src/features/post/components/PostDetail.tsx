import { PostDetailFollowButton } from "@/features/user/components/ButtonFollow";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Smile,
} from "lucide-react";
import { PostDetailLikeButton } from "./ButtonLike";
import FormComment from "./FormComment";
import { useEffect, useRef, useState } from "react";
import CommentCard from "@/components/CommentCard";
import Carousel from "@/components/Carousel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postDetail } from "../queries";
import { PostAvatar } from "@/components/Avatar";
import { Link } from "@tanstack/react-router";

type Props = {
  id: string;
};

const PostDetail = ({ id }: Props) => {
  const { data: post } = useSuspenseQuery(postDetail(id));
  const formCommentInputRef = useRef<HTMLInputElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(ref.current?.offsetHeight ?? 0);
  }, []);

  return (
    <div
      style={{ height }}
      className="flex w-full border border-foreground/20 overflow-hidden rounded-xl"
    >
      {/* LEFT SIDE: Image/Graphic Section */}
      <div ref={ref} className="h-max">
        <Carousel
          aspectRatio={post.aspectRatio}
          url={post.media.map((media) => media.url)}
        />
      </div>

      {/* RIGHT SIDE: Interactions & Comments */}
      <div className="w-xs flex-none flex overflow-hidden flex-col">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Main Caption */}
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
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
            1 DAY AGO
          </div>
        </div>
        {/* Comment Input */}
        <FormComment ref={formCommentInputRef} />
      </div>
    </div>
  );
};

export default PostDetail;
