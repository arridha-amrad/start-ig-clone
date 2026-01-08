import { Sidebar } from "@/components/Sidebar";
import { authKeys, me } from "@/features/auth/queries";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_mustAuth")({
  component: RouteComponent,
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: ({ serverContext, context: { queryClient } }) => {
    const currentUser = serverContext?.auth.user;
    queryClient.setQueryData([authKeys.currentUser], currentUser);
  },
});

function RouteComponent() {
  const { data: currentUser } = useSuspenseQuery(me);
  return (
    <div className="flex min-h-screen container max-w-[1280px] mx-auto">
      {currentUser && <Sidebar username={currentUser.username} />}
      <Outlet />
    </div>
  );
}
