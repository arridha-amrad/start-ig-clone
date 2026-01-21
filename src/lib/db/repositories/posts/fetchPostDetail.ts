import db from "../..";
import {
  amIFollowingYou,
  countPostTotalLikes,
  countTotalComments,
  isPostLiked,
} from "../utils";

export async function queryPostDetail(postId: string, authUserId?: string) {
  try {
    const post = await db.query.post.findFirst({
      where: (post, { eq }) => eq(post.id, postId),
      with: {
        media: true,
        owner: {
          columns: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
          extras: (user) => ({
            isFollowing: amIFollowingYou(user.id, authUserId),
          }),
        },
      },
      extras: ({ id }) => ({
        totalLikes: countPostTotalLikes(id),
        isLiked: isPostLiked(id, authUserId),
        totalComments: countTotalComments(id),
      }),
    });
    if (!post) {
      // return null;
      throw new Error("Post not found");
    }
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
}
