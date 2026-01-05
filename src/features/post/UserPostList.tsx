import PostCard from "@/components/UserPostCard";
import { profileQueryOptions, userPostsQueryOptions } from "@/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function UserPostList() {
  const { username } = useParams({ from: "/_optionalAuth/$username" });
  const { data: profile } = useSuspenseQuery(profileQueryOptions(username));
  const { data: posts } = useSuspenseQuery(
    userPostsQueryOptions(profile?.id ?? "")
  );
  return (
    <div className="grid w-full max-w-4xl mx-auto grid-cols-4 gap-2">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
