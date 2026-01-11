"use client";

import { cn } from "@/utils";
import { Avatar } from "./Avatar";
import { HTMLAttributes, useRef } from "react";

type Props = {
  isStoryExists: boolean;
  isStoryWatched: boolean;
  avatarUrl?: string;
  size: 24 | 32 | 44 | 56 | 77 | 150;
} & HTMLAttributes<HTMLDivElement>;

function AvatarWithStoryIndicator({
  avatarUrl,
  size,
  isStoryExists,
  isStoryWatched,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative flex size-max shrink-0 items-center justify-center p-0.5">
      {isStoryExists ? (
        isStoryWatched ? (
          <div className="bg-bg-secondary absolute inset-0 size-full rounded-full" />
        ) : (
          <div className="absolute inset-0 size-full rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600" />
        )
      ) : (
        <div />
      )}
      <div
        ref={ref}
        onClick={props.onClick}
        className={cn(
          "bg-background relative shrink-0 cursor-pointer rounded-full",
          isStoryExists ? (size === 150 ? "p-1.5" : "p-0.75") : "",
          props.className
        )}
      >
        <Avatar style={{ width: size, height: size }} url={avatarUrl} />
      </div>
    </div>
  );
}

export default AvatarWithStoryIndicator;
