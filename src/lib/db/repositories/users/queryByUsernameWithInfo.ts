import db from "../..";
import { amIFollowingYou } from "../utils";

export async function queryUserByUsernameWithInfo(
  username: string,
  authUserId?: string
) {
  console.log({ username });

  try {
    const profile = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, username),
      with: {
        additionalInfo: true,
      },
      extras: ({ id }, { sql }) => ({
        isFollowing: amIFollowingYou(id, authUserId),
        totalPosts:
          sql<number>`(select count("post"."id") from "post" where "post"."user_id" = "user"."id")`.as(
            "total_posts"
          ),
        totalFollowers:
          sql<number>`(select count("follows"."follower_id") from "follows" where "follows"."following_id" = "user"."id")`.as(
            "total_followers"
          ),
        totalFollowing:
          sql<number>`(select count("follows"."following_id") from "follows" where "follows"."follower_id" = "user"."id")`.as(
            "total_following"
          ),
      }),
    });
    if (!profile) {
      throw new Error("user not found");
    }
    return profile;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
}
