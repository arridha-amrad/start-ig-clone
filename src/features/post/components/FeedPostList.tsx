import FeedPostCard from "@/components/FeedPostCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { feedPosts } from "../queries";

export const FeedPosts = () => {
  const { data: posts } = useSuspenseQuery(feedPosts);
  return (
    <div>
      {posts.map((post) => (
        <FeedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
