import CurrentUser from "@/features/auth/components/CurrentUser";
import { FeedPosts } from "@/features/post/components/FeedPostList";
import { feedPosts } from "@/features/post/queries";
import StoryList from "@/features/stories/StoryList";
import SuggestedUsers from "@/features/user/components/SuggestedUserList";
import { suggestedUsers } from "@/features/user/queries";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_mustAuth/")({
  component: App,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(suggestedUsers);
    queryClient.ensureQueryData(feedPosts);
  },
});
function App() {
  return (
    <>
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
    </>
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
