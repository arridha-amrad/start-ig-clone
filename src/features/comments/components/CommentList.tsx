import { useSuspenseQuery } from "@tanstack/react-query";
import { comments } from "../../post/queries";
import CommentCard from "@/components/CommentCard";

export default function Comments({ postId }: { postId: string }) {
  const { data: cmts } = useSuspenseQuery(comments(postId));
  return (
    <div>
      {cmts.map((cmt) => (
        <CommentCard key={cmt.id} comment={cmt} />
      ))}
    </div>
  );
}
