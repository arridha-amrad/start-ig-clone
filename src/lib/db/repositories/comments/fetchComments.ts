import db from "../..";
import {
  countTotalReplies,
  isCommentLiked,
  countCommentTotalLikes,
} from "../utils";

export async function fetchComments(postId: string, authUserId?: string) {
  try {
    const result = await db.query.comments.findMany({
      where: ({ postId: pId, parentId }, { eq, and, isNull }) =>
        and(eq(pId, postId), isNull(parentId)),
      limit: 10,
      orderBy: ({ createdAt }, { desc }) => desc(createdAt),
      extras: ({ id }) => ({
        isLiked: isCommentLiked(id, authUserId),
        totalReplies: countTotalReplies(id),
        totalLikes: countCommentTotalLikes(id),
      }),
      with: {
        replies: {
          extras: ({ id }) => ({
            isLiked: isCommentLiked(id, authUserId),
            totalLikes: countCommentTotalLikes(id),
          }),
          with: {
            user: {
              columns: {
                id: true,
                username: true,
                name: true,
                image: true,
              },
            },
          },
        },
        user: {
          columns: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
