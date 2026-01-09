import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { SuggestedUserFollowButton } from "@/features/user/components/ButtonFollow";
import { TSuggestedUser } from "@/features/user/services";
import { Link } from "@tanstack/react-router";

type Props = {
  user: TSuggestedUser;
};

const SuggestedUserCard = ({ user }: Props) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-start gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={44}
          avatarUrl={user.image ?? undefined}
        />
        <div className="max-w-37.5 overflow-hidden text-sm">
          <Link
            to={"/$username"}
            params={{ username: user.username }}
            className="font-medium line-clamp-1"
          >
            {user.username}
          </Link>
          <p className="text-foreground/70 line-clamp-1 text-xs">{user.name}</p>
        </div>
      </div>
      <SuggestedUserFollowButton
        userId={user.id}
        isFollowing={user.isFollowing}
      />
    </div>
  );
};

export default SuggestedUserCard;
