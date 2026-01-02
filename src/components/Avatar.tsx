import { cn } from "@/utils";
import { HTMLAttributes } from "react";

type Props = {
  url?: string;
} & HTMLAttributes<HTMLDivElement>;

const Avatar = ({ url, ...props }: Props) => {
  return (
    <div
      className={cn("shrink-0 overflow-hidden rounded-full")}
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

export default Avatar;
