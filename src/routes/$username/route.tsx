import { FooterAuth } from "@/components/FooterAuth";
import { Sidebar } from "@/components/Sidebar";
import { authKeys, me } from "@/features/auth/queries";
import { userPosts } from "@/features/post/queries";
import ProfileCard from "@/features/user/components/ProfileCard";
import { profile } from "@/features/user/queries";
import { optionalAuthMiddleware } from "@/middlewares/auth.middleware";
import { cn } from "@/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";
import { Bookmark, Grid, UserSquareIcon } from "lucide-react";
import { ReactNode } from "react";

export const Route = createFileRoute("/$username")({
  server: {
    middleware: [optionalAuthMiddleware],
  },
  beforeLoad: ({ serverContext, context }) => {
    context?.queryClient.setQueryData(
      [authKeys.currentUser],
      serverContext?.auth?.user
    );
  },
  loader: async ({
    params: { username },
    context: { queryClient },
    serverContext,
  }) => {
    // Daftar kata yang dilarang menjadi username
    const excluded = [".well-known", "favicon.ico", "api", "public"];
    if (excluded.includes(username)) {
      throw notFound(); // Langsung hentikan proses sebelum panggil DB
    }
    const currUser = serverContext?.auth?.user;
    queryClient.setQueryData([authKeys.currentUser], currUser);
    const user = await queryClient.ensureQueryData(profile(username));
    await queryClient.ensureQueryData(userPosts(user?.id ?? ""));
  },
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: () => <div>Not Found</div>,
  component: Component,
});

function Component() {
  const { username } = Route.useParams();
  const { data: currUser } = useSuspenseQuery(me);
  return (
    <div className="flex min-h-screen container max-w-[1280px] mx-auto">
      {currUser && <Sidebar username={currUser.username} />}
      <main className="flex-1 max-w-4xl mx-auto">
        <div className="w-full p-4">
          <ProfileCard username={username} />
        </div>
        <Tab username={username} />
        <Outlet />
        <div className="mt-10">
          <FooterAuth />
        </div>
      </main>
    </div>
  );
}

function Tab({ username }: { username: string }) {
  return (
    <div className="w-full border-b border-foreground/20">
      <div className="flex justify-center max-w-sm lg:max-w-lg mx-auto w-full">
        <TabLink
          icon={<Grid className="size-6 text-foreground/50" />}
          activeIcon={<Grid className="size-6" />}
          to="/$username"
          username={username}
        />
        <TabLink
          icon={<Bookmark className="size-6 text-foreground/50" />}
          activeIcon={<Bookmark className="size-6" />}
          to="/$username/saved"
          username={username}
        />
        <TabLink
          icon={<UserSquareIcon className="size-6 text-foreground/50" />}
          activeIcon={<UserSquareIcon className="size-6" />}
          to="/$username/tagged"
          username={username}
        />
      </div>
    </div>
  );
}

function TabLink({
  icon,
  activeIcon,
  to,
  username,
}: {
  to: string;
  username: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}) {
  return (
    <div className="flex-1 flex justify-center">
      <Link to={to} params={{ username }} activeOptions={{ exact: true }}>
        {({ isActive }) => (
          <div className="w-max relative py-3 px-6">
            <>
              {isActive ? activeIcon : icon}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 bg-foreground",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              ></div>
            </>
          </div>
        )}
      </Link>
    </div>
  );
}
