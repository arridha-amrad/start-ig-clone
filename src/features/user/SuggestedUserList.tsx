import SuggestedUserCard from "@/components/SuggestedUserCard";
import {
  currentUserQueryOptions,
  suggestedUsersQueryOptions,
} from "@/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function SuggestedUsers() {
  const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions());
  const { data } = useSuspenseQuery(
    suggestedUsersQueryOptions(currentUser?.id ?? "")
  );

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold text-sm">Suggested Users</h1>
        <Link className="font-extrabold text-sm block" to="/">
          See All
        </Link>
      </div>
      <div className="space-y-2">
        {data.map((user) => (
          <SuggestedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
