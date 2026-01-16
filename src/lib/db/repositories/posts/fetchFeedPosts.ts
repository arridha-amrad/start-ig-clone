import db from "../..";
import { countPostTotalLikes, isPostLiked } from "../utils";

export async function queryFeedPosts(authUserId?: string) {
  try {
    const posts = await db.query.post.findMany({
      limit: 10,
      orderBy: ({ createdAt }, { desc }) => desc(createdAt),
      with: {
        owner: {
          columns: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
        },
        media: true,
      },
      extras: ({ id }) => ({
        totalLikes: countPostTotalLikes(id),
        isLiked: isPostLiked(id, authUserId),
      }),
    });
    return posts;
  } catch (err) {
    throw err;
  }
}
