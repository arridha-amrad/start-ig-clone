import db from "../..";
import { countCommentTotalLikes, isCommentLiked } from "../utils";

export const fetchReplies = async (commentId: string, authUserId?: string) => {
  try {
    const result = await db.query.comments.findMany({
      where: ({ parentId }, { eq }) => eq(parentId, commentId),
      limit: 5,
      orderBy: ({ createdAt }, { asc }) => asc(createdAt),
      with: {
        user: {
          columns: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
      extras: ({ id }) => ({
        isLiked: isCommentLiked(id, authUserId),
        totalLikes: countCommentTotalLikes(id),
      }),
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
