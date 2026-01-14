import { z } from "zod";

export const genderEnum = z.enum(["male", "female", "-"]);
export type TGender = z.infer<typeof genderEnum>;
export const updateProfileSchema = z.object({
  bio: z.string().optional(),
  website: z.url().optional(),
  showThreadsBadge: z.boolean().optional(),
  showAccountSuggestions: z.boolean().optional(),
  gender: genderEnum.optional(),
});
export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;
