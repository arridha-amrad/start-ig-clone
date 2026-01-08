import SidebarSetting from "@/components/settings-route/SettingSidebar";
import { Sidebar } from "@/components/Sidebar";
import { authKeys, me } from "@/features/auth/queries";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: async ({ context: { queryClient }, serverContext }) => {
    queryClient.setQueryData([authKeys.currentUser], serverContext?.auth.user);
  },
});

function RouteComponent() {
  const { data } = useSuspenseQuery(me);
  return (
    <div className="flex min-h-screen container mx-auto">
      {data && <Sidebar username={data.username} />}
      <main className="w-full flex">
        <div className="w-82.5 py-8 px-8 h-screen overflow-y-auto sticky top-0 flex-none">
          <SidebarSetting />
        </div>
        <div>{<Outlet />}</div>
      </main>
    </div>
  );
}
