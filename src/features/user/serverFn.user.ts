import db from "@/db";
import * as schema from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { eq, ne } from "drizzle-orm";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";

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
export const genderEnum = z.enum(["male", "female", "-"]);
export type TGender = z.infer<typeof genderEnum>;
export const updateProfileSchema = z.object({
  bio: z.string().optional(),
  website: z.url().optional(),
  showThreadsBadge: z.boolean().optional(),
  showAccountSuggestions: z.boolean().optional(),
  gender: genderEnum.optional(),
});
export const updateProfile = createServerFn()
  .inputValidator(updateProfileSchema)
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context }) => {
    try {
      const { bio, website, showThreadsBadge, showAccountSuggestions, gender } =
        data;
      const {
        auth: { user },
      } = context;
      const result = await db
        .update(schema.userAdditionalInfo)
        .set({
          bio,
          website,
          isShowThreadBadge: showThreadsBadge,
          isShowAccountSuggestion: showAccountSuggestions,
          gender,
        })
        .where(eq(schema.userAdditionalInfo.userId, user.id))
        .returning();
      return result;
    } catch (error) {
      throw error;
    }
  });
