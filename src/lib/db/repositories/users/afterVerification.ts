import db from "../..";
import * as schema from "../../tables";
import { eq } from "drizzle-orm";

export async function verifyUser(userId: string) {
  await db.transaction(async (tx) => {
    await tx.insert(schema.userAdditionalInfo).values({
      userId: userId,
    });
    await tx
      .update(schema.user)
      .set({
        verifiedAt: new Date(),
      })
      .where(eq(schema.user.id, userId));
  });
}
