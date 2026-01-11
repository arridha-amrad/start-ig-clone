import { cn } from "@/utils";
import { Button } from "@headlessui/react";
import { useFollowMutation } from "../mutations";

type ProfileFollowButtonProps = {
  isFollowing: boolean;
  userId: string;
  username: string;
};
export const ProfileFollowButton = ({
  isFollowing,
  userId,
  username,
}: ProfileFollowButtonProps) => {
  const { mutate } = useFollowMutation({ userId, username });
  return (
    <Button
      onClick={() => mutate()}
      className={cn(
        "flex-1 transition-colors py-2.5 rounded-xl font-medium text-sm",
        isFollowing ? "bg-foreground/10 hover:bg-foreground/20" : "bg-blue-500"
      )}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export const SuggestedUserFollowButton = ({
  isFollowing,
  userId,
}: Omit<ProfileFollowButtonProps, "username">) => {
  const { mutate } = useFollowMutation({ userId });
  return (
    <Button
      onClick={() => mutate()}
      className={cn(
        "text-xs font-medium",
        isFollowing ? "text-foreground/80" : "text-skin-primary"
      )}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export const PostDetailFollowButton = () => {
  return (
    <Button className="text-blue-500 font-medium text-sm cursor-pointer">
      Follow
    </Button>
  );
};
