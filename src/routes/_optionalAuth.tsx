import { authKeys } from "@/features/auth/queries";
import { optionalAuthMiddleware } from "@/middlewares/auth.middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_optionalAuth")({
  server: {
    middleware: [optionalAuthMiddleware],
  },
  beforeLoad: ({ serverContext, context }) => {
    context?.queryClient.setQueryData(
      [authKeys.currentUser],
      serverContext?.auth?.user
    );
  },
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: () => <div>Not Found</div>,
});
