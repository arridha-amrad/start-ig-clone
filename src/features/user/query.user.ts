import db from "@/db";
import * as schema from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const fetchSuggestedUsers = createServerFn().handler(async () => {
  return db
    .select({
      id: schema.user.id,
      username: schema.user.username,
      name: schema.user.name,
      image: schema.user.image,
    })
    .from(schema.user)
    .limit(5);
});

export const fetchProfile = createServerFn()
  .inputValidator(
    z.object({
      username: z.string(),
    })
  )
  .handler(async ({ data }) => {
    return db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, data.username),
    });
  });
