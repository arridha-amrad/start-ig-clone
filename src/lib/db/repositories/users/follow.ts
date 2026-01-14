import { and, eq } from "drizzle-orm";
import db from "../..";
import * as schema from "../../schema";

export async function follow(targetUserId: string, authUserId: string) {
  return db.transaction(async (tx) => {
    const existingFollow = await tx.query.follows.findFirst({
      where: (table, { eq, and }) =>
        and(
          eq(table.followerId, authUserId),
          eq(table.followingId, targetUserId)
        ),
    });
    if (existingFollow) {
      // unfollow
      await db
        .delete(schema.follows)
        .where(
          and(
            eq(schema.follows.followerId, authUserId),
            eq(schema.follows.followingId, targetUserId)
          )
        );
      return {
        follow: false,
      };
    }
    // follow
    await db.insert(schema.follows).values({
      followerId: authUserId,
      followingId: targetUserId,
    });
    return {
      follow: true,
    };
  });
}
