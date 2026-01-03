import Profile from "@/components/ProfileInfo";
import { Sidebar } from "@/components/Sidebar";
import { currentUserQueryOptions, profileQueryOptions } from "@/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_optionalAuth/$username")({
  component: RouteComponent,
  loader: async ({ params: { username }, context: { queryClient } }) => {
    try {
      const profile = await queryClient.ensureQueryData(
        profileQueryOptions(username)
      );
      if (!profile) {
        throw notFound();
      }
      return profile;
    } catch (err) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const { username } = Route.useParams();
  const { data } = useSuspenseQuery(profileQueryOptions(username));
  const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions());
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar />
      <main className="flex-1">
        <div className="w-full sm:max-w-157.5 max-w-full mx-auto min-h-screen p-4">
          <Profile />
        </div>
      </main>
    </div>
  );
}
