import { auth } from "@/lib/auth";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import {
  getRequestHeaders,
  setResponseHeader,
} from "@tanstack/react-start/server";

const sessionLoookUp = async () => {
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
  return session;
};

export const requireAuthMiddleware = createMiddleware().server(
  async ({ next }) => {
    try {
      const session = await sessionLoookUp();
      if (!session) {
        throw new Error("session not found");
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
    try {
      const session = await sessionLoookUp();
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
