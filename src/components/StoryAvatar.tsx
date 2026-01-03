import { cn } from "@/utils";

export const StoryAvatar = () => {
  const hasStory = true;
  const imageSrc = "https://avatars.githubusercontent.com/u/97165289";
  const username = "username";

  return (
    <div className="flex flex-none flex-col items-center space-y-1 w-max">
      <div
        className={cn(
          "flex flex-none items-center justify-center rounded-full p-0.5",
          hasStory
            ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600"
            : "bg-background/10"
        )}
      >
        <div className="bg-background flex-none rounded-full p-0.5">
          <img
            src={imageSrc}
            alt={username}
            width={100}
            height={100}
            className="size-20 rounded-full object-cover border border-foreground/10"
          />
        </div>
      </div>
      <span className="text-xs text-foreground truncate w-full text-center">
        {username}
      </span>
    </div>
  );
};
