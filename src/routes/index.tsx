import { Sidebar } from "@/components/Sidebar";
import CurrentUser from "@/features/auth/components/CurrentUser";
import { authKeys, me } from "@/features/auth/queries";
import { FeedPosts } from "@/features/post/components/FeedPostList";
import { feedPosts } from "@/features/post/queries";
import StoryList from "@/features/stories/StoryList";
import SuggestedUsers from "@/features/user/components/SuggestedUserList";
import { suggestedUsers } from "@/features/user/queries";
import { requireAuthMiddleware } from "@/middlewares/auth.middleware";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: App,
  server: {
    middleware: [requireAuthMiddleware],
  },
  loader: ({ context, serverContext }) => {
    const currentUser = serverContext?.auth.user;
    context?.queryClient.ensureQueryData(suggestedUsers);
    context?.queryClient.ensureQueryData(feedPosts);
    context.queryClient.setQueryData([authKeys.currentUser], currentUser);
    return {
      currentUser,
    };
  },
});

function App() {
  const { data: currentUser } = useSuspenseQuery(me);
  return (
    <div className="flex min-h-screen container max-w-[1280px] mx-auto">
      {currentUser && <Sidebar username={currentUser.username} />}
      <div className="w-full sm:max-w-157.5 max-w-full mx-auto min-h-screen p-4">
        <Suspense fallback={<div>loading...</div>}>
          <StoryList />
        </Suspense>
        <Suspense fallback={<div>loading...</div>}>
          <FeedPosts />
        </Suspense>
      </div>
      <aside className="w-sm hidden border-l border-foreground/5 xl:flex flex-col h-screen px-2 lg:px-8 py-8 sticky top-0">
        <CurrentUser />
        <Suspense fallback={<div>Loading...</div>}>
          <SuggestedUsers />
        </Suspense>
        <Footer />
      </aside>
    </div>
  );
}

const Footer = () => {
  return (
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
  );
};
