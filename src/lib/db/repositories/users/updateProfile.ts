import { TUpdateProfileSchema } from "@/lib/zod/user.schema";
import db from "../..";
import * as schema from "../../schema";
import { eq } from "drizzle-orm";

export async function updateProfile(
  data: TUpdateProfileSchema,
  authUserId: string
) {
  try {
    const { bio, website, showThreadsBadge, showAccountSuggestions, gender } =
      data;
    const result = await db
      .update(schema.userAdditionalInfo)
      .set({
        bio,
        website,
        isShowThreadBadge: showThreadsBadge,
        isShowAccountSuggestion: showAccountSuggestions,
        gender,
      })
      .where(eq(schema.userAdditionalInfo.userId, authUserId))
      .returning();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
