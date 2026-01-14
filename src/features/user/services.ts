import { follow as followUser } from "@/lib/db/repositories/users/follow";
import { queryUserByUsernameWithInfo } from "@/lib/db/repositories/users/queryByUsernameWithInfo";
import { querySuggestedUsers } from "@/lib/db/repositories/users/querySuggestedUsers";
import { updateProfile as updateUserProfile } from "@/lib/db/repositories/users/updateProfile";
import { updateProfileSchema } from "@/lib/zod/user.schema";
import {
  optionalAuthMiddleware,
  requireAuthMiddleware,
} from "@/middlewares/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const fetchSuggestedUsers = createServerFn()
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { auth } }) => {
    return querySuggestedUsers(auth.user.id);
  });

export const fetchProfile = createServerFn()
  .inputValidator(
    z.object({
      username: z.string(),
    })
  )
  .middleware([optionalAuthMiddleware])
  .handler(async ({ data: { username }, context: { auth } }) => {
    return queryUserByUsernameWithInfo(username, auth?.user?.id);
  });

export const updateProfile = createServerFn()
  .inputValidator(updateProfileSchema)
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context: { auth } }) => {
    return updateUserProfile(data, auth.user.id);
  });

export const follow = createServerFn()
  .inputValidator(
    z.object({
      userId: z.string(),
    })
  )
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { auth }, data: { userId } }) => {
    return followUser(userId, auth.user.id);
  });
