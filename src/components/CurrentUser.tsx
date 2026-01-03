import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { currentUserQueryOptions } from "@/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function CurrentUser() {
  const { data: user } = useSuspenseQuery(currentUserQueryOptions());
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex flex-1 basis-0 items-center justify-start gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={44}
          avatarUrl={user?.image ?? undefined}
        />
        <div className="max-w-37.5 overflow-hidden text-sm">
          <h1 className="overflow-hidden font-medium text-ellipsis whitespace-pre-line">
            {user?.username}
          </h1>
          <p className="text-foreground/70 line-clamp-1">{user?.name}</p>
        </div>
      </div>
      {user && (
        <Link
          className="text-skin-primary text-sm font-semibold"
          to={"/$username"}
          params={{ username: user.username }}
        >
          Visit
        </Link>
      )}
    </div>
  );
}
