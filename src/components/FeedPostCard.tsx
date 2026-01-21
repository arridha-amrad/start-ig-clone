import { cn } from "@/utils";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import VerifiedAccountIndicator from "./VerifiedAccountIndicator";
import { FeedPostLikeButton } from "@/features/post/components/ButtonLike";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@headlessui/react";
import { PostAvatar } from "./Avatar";
import { TFeedPost } from "@/features/post/types";

type Props = {
  post: TFeedPost;
};

export default function FeedPostCard({ post }: Props) {
  return (
    <div className="my-4">
      <div className="max-w-md mx-auto bg-background text-foreground rounded-lg overflow-hidden">
        {/* 1. HEADER */}
        <div className="flex items-center justify-between p-3 gap-2">
          <div className="flex items-center gap-3">
            <PostAvatar url={post.owner.image} />
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                <Link
                  to="/$username"
                  params={{ username: post.owner.username }}
                  className="text-sm font-medium line-clamp-1"
                >
                  {post.owner.username}
                </Link>
                <VerifiedAccountIndicator />
                <span className="text-foreground/70 text-sm flex-none">
                  •{" "}
                  {formatDistanceToNowStrict(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="text-xs text-foreground/70">{post.location}</p>
            </div>
          </div>
          <div className="flex-none">
            <Button>
              <MoreHorizontal className="w-5 h-5 text-foreground cursor-pointer" />
            </Button>
          </div>
        </div>
        {/* 2. CONTENT */}
        <Carousel post={post} />
        {/* 3. ACTION BUTTONS */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <FeedPostLikeButton post={post} />
              <Comment post={post} />
              <Send className="w-6 h-6 hover:text-foreground cursor-pointer" />
            </div>
            <Bookmark className="w-6 h-6 hover:text-foreground cursor-pointer" />
          </div>
          <Caption post={post} />
        </div>
      </div>
    </div>
  );
}

function Caption({ post }: { post: TFeedPost }) {
  return (
    <div className="space-y-1">
      <div className="text-sm">
        <span className="font-semibold mr-2">{post.owner.username}</span>
        <span className="text-gray-200">
          {post.caption} Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Praesentium incidunt adipisci accusantium illum quae, laboriosam
          sapiente obcaecati ab optio corporis. Et temporibus consequuntur nulla
          eligendi!
        </span>
      </div>
    </div>
  );
}

function Comment({ post }: { post: TFeedPost }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-x-2">
      <MessageCircle
        onClick={() => navigate({ to: "/p/$id", params: { id: post.id } })}
        className="size-6 cursor-pointer"
      />
      {/* <p className="text-sm">{post.totalComments as string}</p> */}
    </div>
  );
}

function Carousel({ post }: { post: TFeedPost }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="relative w-full group">
      <div
        className={cn(
          "overflow-hidden rounded-lg",
          `aspect-[${post.aspectRatio}]`,
        )}
        ref={emblaRef}
      >
        <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
          {post.media.map((url, i) => (
            <div
              className={cn(
                "w-full overflow-hidden",
                `aspect-[${post.aspectRatio}]`,
              )}
              style={{
                aspectRatio: post.aspectRatio,
                transform: "translate3d(0, 0, 0)",
                flex: "0 0 100%",
                minWidth: 0,
                paddingLeft: "1rem",
              }}
              key={i}
            >
              <img
                src={url.url}
                alt="post image"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute group-hover:opacity-100 transition-opacity duration-150 ease-in opacity-0 left-4 top-1/2 -translate-y-1/2">
        <Button
          onClick={() => emblaApi?.scrollPrev()}
          className="size-max p-1 rounded-full bg-background/50"
        >
          <ChevronLeft className="w-5 h-5 text-foreground cursor-pointer" />
        </Button>
      </div>
      <div className="absolute group-hover:opacity-100 transition-opacity duration-150 ease-in opacity-0 right-4 top-1/2 -translate-y-1/2">
        <Button
          onClick={() => emblaApi?.scrollNext()}
          className="size-max p-1 rounded-full bg-background/50"
        >
          <ChevronRight className="w-5 h-5 text-foreground cursor-pointer" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1">
        {scrollSnaps.map((_, i) => (
          <div
            key={i}
            className={`${
              i === selectedIndex ? "bg-foreground" : "bg-foreground/50"
            } size-2 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}
