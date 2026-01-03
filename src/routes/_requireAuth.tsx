import { authMiddleware } from "@/middlewares/auth.middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_requireAuth")({
  server: {
    middleware: [authMiddleware],
  },
});
