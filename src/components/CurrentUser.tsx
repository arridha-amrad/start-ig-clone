import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { Link } from "@tanstack/react-router";

export default function CurrentUser() {
  // const session = await getServerSideSession();
  // if (!session) {
  //   redirect("/auth/login");
  // }

  // const user = session?.user;

  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex flex-1 basis-0 items-center justify-start gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={44}
          avatarUrl={undefined}
        />
        <div className="max-w-37.5 overflow-hidden text-sm">
          <h1 className="overflow-hidden font-medium text-ellipsis whitespace-pre-line">
            {/* {user?.username} */}
            Ronaldo
          </h1>
          <p className="text-foreground/70 line-clamp-1">C.Ronaldo</p>
        </div>
      </div>
      <Link
        className="text-skin-primary text-sm font-semibold"
        // to={`/${user?.username}`}
        to="/"
      >
        Visit
      </Link>
    </div>
  );
}
