import { authMiddleware } from "@/middlewares/auth.middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_optionalAuth")({
  server: {
    middleware: [authMiddleware],
  },
  beforeLoad({ serverContext }) {
    const user = serverContext?.auth?.user;
    return {
      currentUser: user,
    };
  },
});
