import CurrentUser from "@/components/CurrentUser";
import { Sidebar } from "@/components/Sidebar";
import { FeedPosts } from "@/features/post/FeedPostList";
import StoryList from "@/features/stories/StoryList";
import SuggestedUsers from "@/features/user/SuggestedUserList";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  feedPostsQueryOptions,
  suggestedUsersQueryOptions,
} from "@/query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_requireAuth/")({
  component: App,
  server: {
    middleware: [authMiddleware],
  },
  beforeLoad: ({ serverContext }) => {
    const user = serverContext?.auth?.user;
    console.log(user);
    if (!user) {
      throw redirect({ to: "/auth/login" });
    }
    return {
      currentUser: user,
    };
  },
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(suggestedUsersQueryOptions());
    context.queryClient.prefetchQuery(
      feedPostsQueryOptions(context.currentUser?.id)
    );
    return {
      currentUser: context.currentUser,
    };
  },
});

function App() {
  const { currentUser } = Route.useLoaderData();
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar />
      <main className="flex-1">
        <div className="w-full sm:max-w-157.5 max-w-full mx-auto min-h-screen p-4">
          <StoryList />
          {/* <FeedPostCard /> */}
          <Suspense fallback={<div>loading...</div>}>
            <FeedPosts />
          </Suspense>
        </div>
      </main>
      <aside className="lg:w-xs flex flex-col h-screen px-2 py-8 sticky top-0">
        {currentUser && <CurrentUser user={currentUser} />}
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
