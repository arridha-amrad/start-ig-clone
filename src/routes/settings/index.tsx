import { authKeys } from "@/features/auth/queries";
import EditProfile from "@/features/user/components/FormEditProfile";
import { profile } from "@/features/user/queries";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: ({ serverContext, context: { queryClient } }) => {
    queryClient.setQueryData([authKeys.currentUser], serverContext?.auth.user);
    const username = serverContext?.auth.user.username;
    if (username) {
      queryClient.ensureQueryData(profile(username));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <EditProfile />;
}
