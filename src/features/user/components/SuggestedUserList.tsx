import SuggestedUserCard from "@/components/SuggestedUserCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { suggestedUsers } from "../queries";

export default function SuggestedUsers() {
  const { data } = useSuspenseQuery(suggestedUsers);

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-medium text-sm">Suggested Users</h1>
        <Link className="font-medium text-sm block" to="/">
          See All
        </Link>
      </div>
      <div className="space-y-3">
        {data.map((user) => (
          <SuggestedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
