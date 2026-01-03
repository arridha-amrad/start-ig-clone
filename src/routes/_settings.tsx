import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_settings")({
  component: RouteComponent,
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: async ({ context: { queryClient }, serverContext }) => {
    queryClient.setQueryData(["current-user"], serverContext?.auth.user);
  },
});

function RouteComponent() {
  return <div>Hello "/_settings"!</div>;
}
