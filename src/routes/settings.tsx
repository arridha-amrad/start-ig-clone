import SidebarSetting from "@/components/settings-route/SettingSidebar";
import { Sidebar } from "@/components/Sidebar";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: async ({ context: { queryClient }, serverContext }) => {
    queryClient.setQueryData(["current-user"], serverContext?.auth.user);
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar />
      <main className="w-full flex">
        <div className="w-[330px] py-8 px-8 h-screen overflow-y-auto sticky top-0 flex-none">
          <SidebarSetting />
        </div>
        <div>{<Outlet />}</div>
      </main>
    </div>
  );
}
