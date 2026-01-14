import db from "../..";
import { countTotalReplies, isCommentLiked } from "../utils";

export async function fetchComments(postId: string, authUserId?: string) {
  try {
    const result = await db.query.comments.findMany({
      where: ({ postId: pId }, { eq }) => eq(pId, postId),
      limit: 10,
      orderBy: ({ createdAt }, { desc }) => desc(createdAt),
      extras: ({ id }) => ({
        isLiked: isCommentLiked(id, authUserId),
        totalReplies: countTotalReplies(id),
      }),
      with: {
        replies: {
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
