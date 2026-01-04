import ProfileCard from "@/components/profile-route/ProfileCard";
import { Sidebar } from "@/components/Sidebar";
import { currentUserQueryOptions, profileQueryOptions } from "@/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
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
});

function RouteComponent() {
  const { username } = Route.useParams();
  const { data } = useSuspenseQuery(profileQueryOptions(username));
  const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions());
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar />
      <main className="flex-1">
        <div className="w-full border min-h-screen p-4">
          <ProfileCard />
        </div>
      </main>
    </div>
  );
}
