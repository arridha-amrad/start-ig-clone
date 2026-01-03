import CurrentUser from "@/components/CurrentUser";
import { Sidebar } from "@/components/Sidebar";
import { FeedPosts } from "@/features/post/FeedPostList";
import StoryList from "@/features/stories/StoryList";
import SuggestedUsers from "@/features/user/SuggestedUserList";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import {
  feedPostsQueryOptions,
  suggestedUsersQueryOptions,
} from "@/query-options";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: App,
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: ({ context, serverContext }) => {
    const currentUser = serverContext?.auth.user;
    context?.queryClient.prefetchQuery(
      suggestedUsersQueryOptions(currentUser?.id ?? "")
    );
    context?.queryClient.prefetchQuery(
      feedPostsQueryOptions(currentUser?.id ?? "")
    );
    context.queryClient.setQueryData(["current-user"], currentUser);
  },
});

function App() {
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar />
      <div className="w-full sm:max-w-157.5 max-w-full mx-auto min-h-screen p-4">
        <Suspense fallback={<div>loading...</div>}>
          <StoryList />
        </Suspense>
        <Suspense fallback={<div>loading...</div>}>
          <FeedPosts />
        </Suspense>
      </div>
      <aside className="w-xs hidden xl:flex flex-col min-h-screen px-2 py-8 sticky top-0">
        <CurrentUser />
        <Suspense fallback={<div>Loading...</div>}>
          <SuggestedUsers />
        </Suspense>
        <>
          <ul className="flex flex-wrap gap-1 text-xs text-foreground/50 mt-4">
            <li className="w-max leading-6">About &middot;</li>
            <li className="w-max leading-6">Blog &middot;</li>
            <li className="w-max leading-6">Jobs &middot;</li>
            <li className="w-max leading-6">Help &middot;</li>
            <li className="w-max leading-6">API &middot;</li>
            <li className="w-max leading-6">Privacy &middot;</li>
            <li className="w-max leading-6">Terms &middot;</li>
            <li className="w-max leading-6">Locations &middot;</li>
            <li className="w-max leading-6">Language &middot;</li>
            <li className="w-max leading-6">Meta Verified</li>
          </ul>
          <p className="text-xs text-foreground/50 mt-4 uppercase">
            © {new Date().getFullYear()} Instagram from devari
          </p>
        </>
      </aside>
    </div>
  );
}
