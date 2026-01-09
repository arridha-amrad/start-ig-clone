import UserPostList from "@/features/post/components/UserPostList";
import { optionalAuthMiddleware } from "@/middlewares/auth.middleware";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/$username/")({
  server: {
    middleware: [optionalAuthMiddleware],
  },
  beforeLoad: ({ params }) => {
    const systemPaths = [".well-known", "api", "static"];
    if (systemPaths.includes(params.username)) {
      throw notFound();
    }
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { username } = Route.useParams();
  return (
    <Suspense fallback={<p>loading posts...</p>}>
      <UserPostList username={username} />
    </Suspense>
  );
}
