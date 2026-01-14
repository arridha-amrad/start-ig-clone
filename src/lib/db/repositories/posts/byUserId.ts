import db from "../..";

export async function queryUserPosts(userId: string) {
  const posts = await db.query.post.findMany({
    with: {
      media: true,
    },
    where: (post, { eq }) => eq(post.userId, userId),
  });
  return posts;
}
