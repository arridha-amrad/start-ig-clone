import ReplyItem from "@/components/ReplyItem";
import { useSuspenseQuery } from "@tanstack/react-query";
import { replies } from "../queries";

export default function ReplyList({ commentId }: { commentId: string }) {
  const { data } = useSuspenseQuery(replies(commentId));
  return (
    <div className="flex flex-col gap-4 mt-4">
      {data.map((reply) => (
        <ReplyItem key={reply.id} data={reply} />
      ))}
    </div>
  );
}
