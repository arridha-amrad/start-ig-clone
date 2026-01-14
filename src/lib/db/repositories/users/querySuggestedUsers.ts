import db from "../..";
import * as schema from "../../schema";

export async function querySuggestedUsers(authUserId: string) {
  const result = db.query.user.findMany({
    columns: {
      id: true,
      username: true,
      name: true,
      image: true,
    },
    extras: (_, { sql }) => ({
      isFollowing: sql<boolean>`false`.as("is_following"),
    }),
    limit: 5,
    where: (users, { and, ne, notExists, eq }) => {
      return and(
        // 1. Exclude the current user
        ne(users.id, authUserId),
        // 2. Exclude users already followed by the current user
        notExists(
          db
            .select()
            .from(schema.follows)
            .where(
              and(
                eq(schema.follows.followerId, authUserId),
                eq(schema.follows.followingId, users.id)
              )
            )
        )
      );
    },
  });
  return result;
}
