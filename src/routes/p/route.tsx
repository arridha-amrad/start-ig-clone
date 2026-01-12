import { Sidebar } from "@/components/Sidebar";
import { authKeys, me } from "@/features/auth/queries";
import { optionalAuthMiddleware } from "@/middlewares/auth.middleware";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/p")({
  component: RouteComponent,
  server: {
    middleware: [optionalAuthMiddleware],
  },
  loader: ({ context: { queryClient }, serverContext }) => {
    queryClient.setQueryData([authKeys.currentUser], serverContext?.auth?.user);
  },
});

function RouteComponent() {
  const { data: currentUser } = useSuspenseQuery(me);

  return (
    <div className="flex min-h-screen container max-w-[1280px] mx-auto">
      {currentUser && <Sidebar username={currentUser.username} />}
      <main className="flex-1 max-w-4xl mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
}
