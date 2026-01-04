import db from "@/db";
import * as schema from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { ne } from "drizzle-orm";

export const fetchSuggestedUsers = createServerFn()
  .inputValidator(
    z.object({
      currentUserId: z.string(),
    })
  )
  .handler(async ({ data: { currentUserId } }) => {
    return db
      .select({
        id: schema.user.id,
        username: schema.user.username,
        name: schema.user.name,
        image: schema.user.image,
      })
      .from(schema.user)
      .where(ne(schema.user.id, currentUserId))
      .limit(5);
  });

export const fetchProfile = createServerFn()
  .inputValidator(
    z.object({
      username: z.string(),
    })
  )
  .handler(async ({ data: { username } }) => {
    try {
      const profile = db.query.user.findFirst({
        where: (user, { eq }) => eq(user.username, username),
        with: {
          additionalInfo: true,
        },
      });
      if (!profile) {
        throw new Error("Profile not found");
      }
      return profile;
    } catch (err) {
      throw new Error("Something went wrong");
    }
  });

export type TProfile = Awaited<ReturnType<typeof fetchProfile>>;
