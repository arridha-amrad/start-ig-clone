import EditProfile from "@/features/user/EditProfile";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { profileQueryOptions } from "@/query-options";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: ({ serverContext, context }) => {
    context.queryClient.setQueryData(
      ["current-user"],
      serverContext?.auth.user
    );
    const username = serverContext?.auth.user.username;
    if (username) {
      context.queryClient.ensureQueryData(profileQueryOptions(username));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <EditProfile />;
}
