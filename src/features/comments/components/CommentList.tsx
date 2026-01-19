import { useSuspenseQuery } from "@tanstack/react-query";
import CommentCard from "@/components/CommentCard";
import { comments } from "../queries";

export default function Comments({ postId }: { postId: string }) {
  const { data: cmts } = useSuspenseQuery(comments(postId));
  return (
    <div className="space-y-4 w-full">
      {cmts.map((cmt) => (
        <CommentCard key={cmt.id} comment={cmt} />
      ))}
    </div>
  );
}
