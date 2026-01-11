import PostDetail from "@/features/post/components/PostDetail";
import { postDetail } from "@/features/post/queries";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/p/$id")({
  component: RouteComponent,
  loader: async ({ params: { id }, context: { queryClient } }) => {
    await queryClient.ensureQueryData(postDetail(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostDetail id={id} />
    </Suspense>
  );
}
