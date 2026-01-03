import FeedPostCard from "@/components/FeedPostCard";
import { feedPostsQueryOptions } from "@/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

export const FeedPosts = () => {
  const { currentUser } = useRouteContext({ from: "/_requireAuth/" });
  const { data: posts } = useSuspenseQuery(
    feedPostsQueryOptions(currentUser?.id)
  );
  return (
    <div>
      {posts.map((post) => (
        <FeedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
