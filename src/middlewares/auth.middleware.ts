import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-client";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import {
  getRequestHeaders,
  setResponseHeader,
} from "@tanstack/react-start/server";

const sessionLookUp = async () => {
  const headers = getRequestHeaders();
  const sessionResponse = await auth.api.getSession({
    headers,
    asResponse: true,
  });
  const session = await sessionResponse.json();
  const setCookieHeader = sessionResponse.headers.get("set-cookie");
  if (setCookieHeader) {
    setResponseHeader("set-cookie", setCookieHeader);
  }
  return session as Session;
};

export const requireAuthMiddleware = createMiddleware().server(
  async ({ next }) => {
    try {
      const session = await sessionLookUp();
      if (!session) {
        throw new Error("session not found");
      }
      return next({
        context: {
          auth: session,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("---require auth middleware err", error.message);
      }
      throw redirect({ to: "/auth/login" });
    }
  },
);

export const optionalAuthMiddleware = createMiddleware().server(
  async ({ next }) => {
    try {
      const session = await sessionLookUp();
      return next({
        context: {
          auth: session,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log("---optional auth middleware err", err.message);
      }
      throw redirect({ to: "/auth/login" });
    }
  },
);
