import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchCurrentUser = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  try {
    const session = await auth.api.getSession({ headers });
    if (!session) {
      return null;
    }
    return session.user;
  } catch (err) {
    console.log(err);
    throw err;
  }
});
