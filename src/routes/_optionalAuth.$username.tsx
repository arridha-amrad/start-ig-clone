import ProfileCard from "@/components/profile-route/ProfileCard";
import { Sidebar } from "@/components/Sidebar";
import UserPostList from "@/features/post/UserPostList";
import { profileQueryOptions } from "@/query-options";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";
import z from "zod";

export const Route = createFileRoute("/_optionalAuth/$username")({
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
  loader: async ({ params: { username }, context: { queryClient } }) => {
    await queryClient.ensureQueryData(profileQueryOptions(username));
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar />
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
