import SuggestedUserCard from "@/components/SuggestedUserCard";
import { Link } from "@tanstack/react-router";

// const fetchSuggestedUsers = async () => {
//   const result = await db.query.user.findMany({
//     limit: 5,
//     columns: {
//       id: true,
//       username: true,
//       name: true,
//       image: true,
//     },
//   });
//   return result;
// };

export default function SuggestedUsers() {
  // const users = await fetchSuggestedUsers();
  const users: any[] = [];
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold text-sm">Suggested Users</h1>
        <Link className="font-extrabold text-sm block" to="/">
          See All
        </Link>
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <SuggestedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
