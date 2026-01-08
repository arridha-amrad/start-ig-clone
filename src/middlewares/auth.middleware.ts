import { auth } from "@/lib/auth";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const requireAuthMiddleware = createMiddleware().server(
  async ({ next }) => {
    const headers = getRequestHeaders();
    try {
      const session = await auth.api.getSession({ headers });
      if (!session) {
        throw redirect({ to: "/auth/login" });
      }
      return next({
        context: {
          auth: session,
        },
      });
    } catch (error) {
      console.log("---require auth middleware err", error);
      throw redirect({ to: "/auth/login" });
    }
  }
);

export const optionalAuthMiddleware = createMiddleware().server(
  async ({ next }) => {
    const headers = getRequestHeaders();
    try {
      const session = await auth.api.getSession({ headers });
      return next({
        context: {
          auth: session,
        },
      });
    } catch (err) {
      console.log("---optional auth middleware err", err);
      throw redirect({ to: "/auth/login" });
    }
  }
);
