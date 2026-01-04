import EditProfile from "@/features/user/EditProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditProfile />;
}
