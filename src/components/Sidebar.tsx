import { cn } from "@/utils";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Button } from "@headlessui/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ActivityIcon,
  BellIcon,
  ChevronLeft,
  Compass,
  File,
  HomeIcon,
  Menu,
  MessageSquareQuote,
  MoonIcon,
  PlusSquare,
  SaveIcon,
  Search,
  SettingsIcon,
  SunIcon,
  UserRound,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import DialogLogout from "./DialogLogout";
import MySwitch from "./Switch";
import { InstagramIcon, InstagramText } from "./svg/Instagram";
import { setThemeServerFn } from "@/features/Theme";

type SidebarProps = {
  username?: string;
};

export const Sidebar = ({ username }: SidebarProps) => {
  return (
    <aside className="lg:w-72 sticky top-0 flex flex-col h-screen border-r border-foreground/5 px-2 py-8">
      <SidebarBrand />
      <div className="px-2 space-y-2 flex-1">
        <SidebarLink
          href="/"
          icon={<HomeIcon className="size-6" />}
          label="Home"
        />
        <SidebarLink
          href="/search"
          icon={<Search className="size-6" />}
          label="Search"
        />
        <SidebarLink
          href="/explore"
          icon={<Compass className="size-6" />}
          label="Explore"
        />
        <SidebarLink
          href="/reels"
          icon={<Video className="size-6" />}
          label="Reels"
        />
        <SidebarLink
          href="/messages"
          icon={<MessageSquareQuote className="size-6" />}
          label="Messages"
        />
        <SidebarLink
          href="/notifications"
          icon={<BellIcon className="size-6" />}
          label="Notifications"
        />
        <SidebarLink
          href={`/${username}`}
          icon={<UserRound className="size-6" />}
          label="Profile"
        />
        <ButtonCreatePost />
      </div>
      <div className="px-2">
        <MoreOptions />
      </div>
    </aside>
  );
};

const SidebarBrand = () => {
  return (
    <div className="px-5.5 mb-8">
      <div className="lg:hidden block">
        <InstagramIcon />
      </div>
      <Link to="/" className="hidden lg:block">
        <InstagramText />
      </Link>
    </div>
  );
};

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
};
const SidebarLink = ({ href, icon, label }: Props) => {
  const pathname = useLocation().pathname;
  const isActive = pathname === href;
  return (
    <Link
      className={cn(
        "flex items-center text-xl p-1.5 font-medium hover:bg-foreground/10 gap-2 lg:pr-4 w-max rounded-xl",
        isActive && "bg-foreground/10"
      )}
      to={href}
    >
      <div className="p-2">{icon}</div>
      <span className={isActive ? "font-bold" : ""}>{label}</span>
    </Link>
  );
};

const ButtonCreatePost = () => {
  return (
    <Button className="flex mt-2 items-center gap-2 text-xl p-1.5 font-medium hover:bg-foreground/10 lg:pr-4 w-max rounded-xl">
      <div className="p-2">
        <PlusSquare className="size-6" />
      </div>
      <span className="hidden lg:block">Create Post</span>
    </Button>
  );
};

function MoreOptions() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: "top-start",
    middleware: [offset(5), shift()],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
  ]);

  const [openTheme, setOpenTheme] = useState(false);
  // const { theme } = useTheme();

  // const [isPending, startTransition] = useTransition();
  // const router = useRouter();
  const logout = async () => {};

  // const t = useTranslations("Sidebar");
  return (
    <>
      <Button
        onClick={() => {
          setOpenTheme(false);
          setOpen((val) => !val);
        }}
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex mt-2 items-center text-xl gap-2 p-1.5 font-medium hover:bg-foreground/10 lg:pr-4 w-max rounded-xl"
      >
        <div className="p-2">
          <Menu className="size-6" />
        </div>
        <span className="hidden lg:block">More</span>
      </Button>

      <AnimatePresence>
        {open && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className={cn(
                  "bg-skin-elevated-separator w-max space-y-2 overflow-hidden rounded-lg p-2 drop-shadow-sm"
                )}
              >
                {openTheme ? (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="w-full space-y-4"
                  >
                    <div className="flex h-12 items-center justify-between gap-4 pr-2">
                      <ChevronLeft
                        onClick={() => setOpenTheme(false)}
                        className="size-6"
                      />
                      <h1 className="block">Switch appearance</h1>
                      {true ? <MoonIcon /> : <SunIcon />}
                    </div>
                    <div className="flex h-12 justify-between px-2">
                      <h1>Dark mode</h1>
                      <SwitchTheme />
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <OptionsButton icon={<SettingsIcon />} label="Settings" />
                    <OptionsButton
                      icon={<ActivityIcon />}
                      label="Recent activity"
                    />
                    <OptionsButton icon={<SaveIcon />} label="BookMark" />
                    <OptionsButton
                      onClick={() => {
                        setOpenTheme(true);
                      }}
                      icon={true ? <MoonIcon /> : <SunIcon />}
                      label="Switch appearance"
                    />
                    <OptionsButton icon={<File />} label="Report a problem" />
                    <hr className="bg-skin-muted/20 my-2 h-px w-full border-0" />
                    <OptionsButton label="Switch account" />
                    <OptionsButton onClick={logout} label="Logout" />
                  </>
                )}
              </motion.div>
            </div>
          </FloatingPortal>
        )}
      </AnimatePresence>
      <DialogLogout open={false} />
    </>
  );
}

export function SwitchTheme() {
  const [isDark, setIsDark] = useState(false);

  // const { setTheme, theme } = useTheme();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <MySwitch
      isChecked={isDark}
      onChange={() => {
        setThemeServerFn({ data: isDark ? "light" : "dark" });
        setIsDark((val) => {
          if (val) {
            document.documentElement.classList.remove("dark");
          } else {
            document.documentElement.classList.add("dark");
          }
          return !val;
        });
      }}
    />
  );
}

export const OptionsButton = ({
  icon,
  label,
  ...props
}: {
  label: string;
  icon?: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...props}
      className="hover:bg-foreground/10 flex h-10 w-full cursor-pointer items-center gap-4 rounded-lg p-4"
    >
      {icon}
      {label}
    </Button>
  );
};
