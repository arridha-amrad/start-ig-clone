import { cn } from "@/utils";
import { HTMLAttributes } from "react";

type Props = {
  url?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Avatar = ({ url, ...props }: Props) => {
  return (
    <div
      className={cn("shrink-0 overflow-hidden rounded-full", props.className)}
      style={props.style}
      {...props}
    >
      <img
        alt="avatar"
        className="h-full w-full object-cover"
        src={url ?? "/default.jpg"}
      />
    </div>
  );
};

export function PostAvatar({ url }: { url?: string | null }) {
  const hasStory = true;
  return (
    <div className="flex flex-none flex-col items-center space-y-1 w-max">
      {/* Outer Gradient Ring */}
      <div
        className={cn(
          "flex flex-none items-center justify-center rounded-full p-0.5",
          hasStory
            ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600"
            : "bg-gray-300",
        )}
      >
        {/* Inner Gap (Black) */}
        <div className="bg-background flex-none rounded-full p-0.5">
          {/* Profile Image */}
          <img
            src={url ?? "/default.jpg"}
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
