import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
// import { follow as fl } from "@/lib/actions/follow";
// import { TSearchUser } from "@/lib/drizzle/queries/type";
import { cn } from "@/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";

type User = {
  name: string;
  username: string;
  image: string | null;
  id: string;
};

type Props = {
  user: User;
};

const SuggestedUserCard = ({ user }: Props) => {
  const pathname = useLocation().pathname;
  const [isFollow, setFollow] = useState(false);

  const follow = async () => {
    // setFollow((val) => !val);
    // try {
    //   const result = await fl.bind(
    //     null,
    //     pathname
    //   )({
    //     targetId: id,
    //   });
    //   if (result?.serverError) {
    //     showToast(result.serverError, "error");
    //     setFollow((val) => !val);
    //   }
    // } catch (err) {
    //   if (isRedirectError(err)) {
    //     return;
    //   }
    //   showToast("Something went wrong", "error");
    // }
  };
  // const t = useTranslations("SuggestedUsers");
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
            // to={`/${user.username}`}
            to="/"
            className="overflow-hidden font-medium text-ellipsis whitespace-pre-line"
          >
            {user.username}
          </Link>
          <p className="text-foreground/70 line-clamp-1 text-xs">{user.name}</p>
        </div>
      </div>
      <button
        onClick={follow}
        className={cn(
          "text-sm font-medium",
          isFollow ? "text-foreground/70" : "text-skin-primary"
        )}
      >
        {isFollow ? "unFollow" : "follow"}
      </button>
    </div>
  );
};

export default SuggestedUserCard;
