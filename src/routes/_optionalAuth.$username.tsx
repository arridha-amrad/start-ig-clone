import { Sidebar } from "@/components/Sidebar";
import { authKeys, me } from "@/features/auth/queries";
import UserPostList from "@/features/post/components/UserPostList";
import ProfileCard from "@/features/user/components/ProfileCard";
import { profile } from "@/features/user/queries";
import { optionalAuthMiddleware } from "@/middlewares/auth.middleware";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";
import z from "zod";

export const Route = createFileRoute("/_optionalAuth/$username")({
  server: {
    middleware: [optionalAuthMiddleware],
  },
  params: {
    parse: (params) => ({
      username: z.string().parse(params.username),
    }),
  },
  beforeLoad: ({ params }) => {
    const systemPaths = [".well-known", "api", "static"];
    if (systemPaths.includes(params.username)) {
      throw notFound();
    }
  },
  loader: async ({
    params: { username },
    context: { queryClient },
    serverContext,
  }) => {
    const currUser = serverContext?.auth?.user;
    queryClient.setQueryData([authKeys.currentUser], currUser);
    await queryClient.ensureQueryData(profile(username));
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { data: currUser } = useSuspenseQuery(me);
  return (
    <div className="flex min-h-screen container max-w-[1280px] mx-auto">
      {currUser && <Sidebar username={currUser.username} />}
      <main className="flex-1">
        <div className="w-full p-4">
          <ProfileCard />
        </div>
        <Suspense fallback={<p>loading posts...</p>}>
          <UserPostList />
        </Suspense>
      </main>
    </div>
  );
}
