import PostCard from "@/components/UserPostCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { profile as profileQueryOptions } from "../../user/queries";
import { userPosts } from "../queries";

type Props = {
  username: string;
};

export default function UserPostList({ username }: Props) {
  const { data: profile } = useSuspenseQuery(profileQueryOptions(username));
  const { data: posts } = useSuspenseQuery(userPosts(profile?.id ?? ""));
  return (
    <div className="grid w-full grid-cols-4 gap-1">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
