import { profileQueryOptions } from "@/query-options";
import { Button } from "@headlessui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BadgeCheck,
  Link as LinkIcon,
  MoreHorizontal,
  UserPlus,
} from "lucide-react";

export default function InstagramProfile() {
  const { username } = useParams({ from: "/_optionalAuth/$username" });
  const { data: profile } = useSuspenseQuery(profileQueryOptions(username));
  const isMe = username === profile?.username;

  const navigate = useNavigate();

  return (
    <div className="bg-background text-foreground p-6 max-w-[610px] mx-auto">
      {/* Header Section: Avatar & Stats */}
      <div className="flex items-center gap-8 mb-6">
        {/* Avatar dengan Border Ring */}
        <div className="relative">
          <div className="size-[150px] rounded-full border-2 border-zinc-800 p-1">
            <img
              src={profile?.image ?? "/default.jpg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Username & Stats */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{profile?.username}</h1>
            <BadgeCheck className="size-5 fill-blue-500 text-background" />
            <MoreHorizontal className="ml-2 w-6 h-6 cursor-pointer" />
          </div>
          <h2 className="font-light text-sm">{profile?.name}</h2>
          <div className="flex gap-6 text-sm mt-2 md:text-base">
            <div>
              <span className="font-bold">65</span> posts
            </div>
            <div>
              <span className="font-bold">106K</span> followers
            </div>
            <div>
              <span className="font-bold">53</span> following
            </div>
          </div>
          {/* OCCUPATION */}
          <div className="mt-4">
            <p className="text-foreground/70 text-sm">Software Engineer</p>
          </div>
          {/* BIO */}
          <div className="text-sm">
            PCOS | Fertilite | Hormonlar 💡 Evidence-Based Diyet ✨ Beslenme
            tedavisi ile hormonlarınızı yönetmenize yardımcı oluyorum. 📍
            Serdivan / Sakarya
          </div>
          {/* WEBSITE */}
          <div className="flex text-sm items-center gap-1 text-blue-400 font-medium pt-1">
            <LinkIcon className="w-4 h-4 -rotate-45" />
            <a href="#" className="hover:underline">
              diyetisyenhale.com
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isMe ? (
          <Button
            onClick={() => navigate({ to: "/settings" })}
            className="flex-1 bg-blue-500 transition-colors py-2.5 rounded-xl font-semibold text-sm"
          >
            Edit Profile
          </Button>
        ) : (
          <Button className="flex-1 bg-blue-500 transition-colors py-2.5 rounded-xl font-semibold text-sm">
            Follow
          </Button>
        )}
        <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 transition-colors py-2.5 rounded-xl font-semibold text-sm">
          Message
        </button>
        <button className="bg-foreground/10 hover:bg-foreground/20 transition-colors w-max px-3 aspect-square rounded-xl">
          <UserPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
