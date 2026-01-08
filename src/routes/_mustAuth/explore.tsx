import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mustAuth/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/explore"!</div>;
}
