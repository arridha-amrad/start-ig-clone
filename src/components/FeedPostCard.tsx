import { TFeedPost } from "@/features/post/serverFn.post";
import { cn } from "@/utils";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import VerifiedAccountIndicator from "./VerifiedAccountIndicator";

import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useLikePostMutation } from "@/hooks/mutations/post-hook";

type Props = {
  post: TFeedPost;
};

export default function FeedPostCard({ post }: Props) {
  return (
    <div className="my-4">
      <div className="max-w-md mx-auto bg-background text-foreground rounded-lg overflow-hidden">
        {/* 1. HEADER */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Avatar post={post} />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{post.owner.name}</span>
                <VerifiedAccountIndicator />
                <span className="text-gray-400 text-sm">• 3h</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-none">
                {post.location}
              </p>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>
        {/* 2. CONTENT */}
        <Carousel post={post} />
        {/* 3. ACTION BUTTONS */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Like post={post} />
              <Comment post={post} />
              <Send className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
            </div>
            <Bookmark className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
          </div>
          <Caption post={post} />
        </div>
      </div>
    </div>
  );
}

function Avatar({ post }: { post: TFeedPost }) {
  const hasStory = true;
  return (
    <div className="flex flex-none flex-col items-center space-y-1 w-max">
      {/* Outer Gradient Ring */}
      <div
        className={cn(
          "flex flex-none items-center justify-center rounded-full p-0.5",
          hasStory
            ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600"
            : "bg-gray-300"
        )}
      >
        {/* Inner Gap (Black) */}
        <div className="bg-background flex-none rounded-full p-0.5">
          {/* Profile Image */}
          <img
            src={post.owner.image ?? "/default.jpg"}
            alt={"avatar"}
            width={100}
            height={100}
            className="size-8 rounded-full object-cover border border-background"
          />
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
  return (
    <div className="flex items-center gap-x-2">
      <MessageCircle className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
      {/* <p className="text-sm">{post.totalComments as string}</p> */}
    </div>
  );
}

function Like({ post }: { post: TFeedPost }) {
  const { mutate } = useLikePostMutation(post.id);

  return (
    <div className="flex items-center gap-x-2">
      <Heart
        onClick={() => {
          mutate();
        }}
        className={cn(
          "size-6 cursor-pointer",
          post.isLiked
            ? "fill-rose-500 text-rose-500"
            : "hover:text-foreground/80"
        )}
      />
      {post.totalLikes > 0 && (
        <p className="text-sm font-semibold">{post.totalLikes}</p>
      )}
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
    <div className="relative w-full">
      <div
        className={cn(
          "overflow-hidden rounded-lg",
          `aspect-[${post.aspectRatio}]`
        )}
        ref={emblaRef}
      >
        <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
          {post.media.map((url, i) => (
            <div
              className={cn(
                "w-full overflow-hidden",
                `aspect-[${post.aspectRatio}]`
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
                // placeholder="blur"
                // blurDataURL={rgbDataURL(60, 60, 60)}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
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
