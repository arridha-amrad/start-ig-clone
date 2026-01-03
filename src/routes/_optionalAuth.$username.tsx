import db from "@/db";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

const fetchProfile = createServerFn()
  .inputValidator(
    z.object({
      username: z.string(),
    })
  )
  .handler(async ({ data }) => {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, data.username),
    });
  });

export const Route = createFileRoute("/_optionalAuth/$username")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const user = await fetchProfile({
      data: { username: params.username },
    });
    if (!user) {
      throw notFound();
    }
    return { user };
  },
  notFoundComponent: () => <div>Not Found</div>,
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return <div>Hello {user.username}</div>;
}
