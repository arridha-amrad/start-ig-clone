import FeedPostCard from "@/components/FeedPostCard";
import {
  currentUserQueryOptions,
  feedPostsQueryOptions,
} from "@/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";

export const FeedPosts = () => {
  const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions());
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
