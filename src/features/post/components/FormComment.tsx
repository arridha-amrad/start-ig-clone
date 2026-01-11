import { cn } from "@/utils";
import { Smile } from "lucide-react";
import { useState } from "react";

type Props = {
  ref: React.RefObject<HTMLInputElement | null>;
};

export default function FormComment({ ref }: Props) {
  const [value, setValue] = useState("");
  return (
    <div className="p-4 border-t border-foreground/20 flex items-center gap-3">
      <Smile className="w-6 h-6" />
      <input
        ref={ref}
        type="text"
        placeholder="Add a comment..."
        className="flex-1 text-sm outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={cn(
          "font-medium text-sm",
          value ? "text-blue-500" : "text-foreground/50"
        )}
      >
        Post
      </button>
    </div>
  );
}
