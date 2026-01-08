import PostCard from "@/components/UserPostCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { profile as profileQueryOptions } from "../../user/queries";
import { userPosts } from "../queries";

export default function UserPostList() {
  const { username } = useParams({ from: "/_optionalAuth/$username" });
  const { data: profile } = useSuspenseQuery(profileQueryOptions(username));
  const { data: posts } = useSuspenseQuery(userPosts(profile?.id ?? ""));
  return (
    <div className="grid w-full max-w-4xl mx-auto grid-cols-4 gap-1">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
