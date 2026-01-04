import React from "react";
import {
  User,
  ShieldCheck,
  BarChart3,
  UserCircle,
  Bell,
  Lock,
  Star,
  Slash,
  MapPin,
} from "lucide-react"; // Menggunakan lucide-react untuk ikon
import Meta from "../svg/Meta";
import { Link, useLocation, useMatch } from "@tanstack/react-router";

export default function SidebarSetting() {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      {/* Meta Accounts Center Card */}
      <div className="bg-foreground/5 rounded-2xl p-4 mb-6 cursor-pointer hover:bg-foreground/10 transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <Meta />
        </div>
        <h2 className="text-lg font-bold mb-1">Accounts Center</h2>
        <p className="text-xs text-foreground/50 mb-4 leading-tight">
          Manage your connected experiences and account settings across Meta
          technologies.
        </p>
        <div className="space-y-4">
          <MenuCenterItem
            icon={<User className="size-4" />}
            label="Personal details"
          />
          <MenuCenterItem
            icon={<ShieldCheck className="size-4" />}
            label="Password and security"
          />
          <MenuCenterItem
            icon={<BarChart3 className="size-4" />}
            label="Ad preferences"
          />
        </div>

        <button className="text-blue-500 hover:text-blue-400 text-sm font-semibold mt-4 transition-colors">
          See more in Accounts Center
        </button>
      </div>

      {/* How you use Instagram Section */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-foreground/50 px-4 mb-2">
          How you use Instagram
        </h3>
        <MenuRegularItem
          href="/settings"
          icon={<UserCircle className="size-6" />}
          label="Edit profile"
        />
        <MenuRegularItem
          href="/settings/notification"
          icon={<Bell size={24} />}
          label="Notifications"
        />
      </div>

      {/* Who can see your content Section */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 px-4 mb-2">
          Who can see your content
        </h3>
        <div className="space-y-1">
          <MenuRegularItem
            href="/"
            icon={<Lock size={24} />}
            label="Account privacy"
          />
          <MenuRegularItem
            href="/"
            icon={<Star size={24} />}
            label="Close Friends"
          />
          <MenuRegularItem
            href="/"
            icon={<Slash size={24} />}
            label="Blocked"
          />
          <MenuRegularItem
            href="/"
            icon={
              <div className="relative">
                <MapPin size={24} />
                <div className="absolute top-0 right-0 w-3 h-[2px] bg-white rotate-45 mt-3 mr-[-2px]"></div>
              </div>
            }
            label="Story and location"
          />
        </div>
      </div>
    </>
  );
}

// Sub-komponen untuk item di dalam Meta Center
const MenuCenterItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-3 text-foreground/50">
    <div className="w-5 flex justify-center">{icon}</div>
    <span className="text-sm">{label}</span>
  </div>
);

// Sub-komponen untuk item menu reguler
const MenuRegularItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  const pathname = useLocation().pathname;
  const isActive = pathname === href;
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 p-4 cursor-pointer rounded-xl ${
        isActive ? "bg-foreground/5" : ""
      }`}
    >
      <div className="justify-center">{icon}</div>
      <span className="text-sm flex-1">{label}</span>
    </Link>
  );
};
