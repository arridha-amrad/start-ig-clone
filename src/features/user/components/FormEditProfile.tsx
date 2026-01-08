import { FooterAuth } from "@/components/FooterAuth";
import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { CheckIcon, ChevronDown } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { TGender, updateProfile } from "../services";
import { profile as profileQueryOptions } from "../queries";
import { me } from "@/features/auth/queries";

export default function FormEditProfile() {
  const { data: currentUser } = useSuspenseQuery(me);
  const { data: profile } = useSuspenseQuery(
    profileQueryOptions(currentUser?.username ?? "")
  );

  const info = profile?.additionalInfo;
  const [bio, setBio] = useState(info?.bio ?? "");
  const [website, setWebsite] = useState(info?.website ?? "");
  const [threadsBadge, setThreadsBadge] = useState(
    info?.isShowThreadBadge ?? false
  );
  const [suggestions, setSuggestions] = useState(
    info?.isShowAccountSuggestion ?? false
  );

  const [gender, setGender] = useState<TGender>(info?.gender ?? "-");

  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      updateProfile({
        data: {
          bio,
          website,
          showThreadsBadge: threadsBadge,
          showAccountSuggestions: suggestions,
          gender,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["profile", profile!.username],
      });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      try {
        const validationErrors = JSON.parse(error.message);
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach((err) => {
            toast.error(`${err.path[0]}: ${err.message}`);
          });
        } else {
          toast.error(error.message);
        }
      } catch (e) {
        toast.error(error.message || "An unexpected error occurred");
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen py-8">
      <form
        className="max-w-157.5 w-full mx-auto space-y-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold">Edit profile</h1>
        {/* Section: Profile Header */}
        <div className="bg-foreground/10 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-linear-to-tr from-yellow-400 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-background">
                {/* Placeholder Image */}
                <img
                  src={profile?.image ?? "/default.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm">{profile?.username}</p>
              <p className="text-gray-400 text-sm">{profile?.name}</p>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Change photo
          </button>
        </div>

        {/* Section: Website */}
        <div className="space-y-2">
          <label className="block font-bold text-sm">Website</label>
          <Input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="website"
            className="w-full text-sm py-2.5 bg-foreground/5 px-4 rounded-xl focus:ring-foreground/50 outline-0 border border-foreground/15 focus:ring"
          />
          <p className="text-xs text-foreground/50 leading-tight">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </p>
        </div>

        {/* Section: Bio */}
        <div className="space-y-2">
          <label className="block font-bold text-sm">Bio</label>
          <div className="relative bg-foreground/5 border border-foreground/15 rounded-xl p-3 focus-within:ring-foreground/50 focus-within:ring transition-colors">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 150))}
              placeholder="Bio"
              rows={4}
              className="w-full bg-transparent outline-none text-sm resize-none"
            />
            <span className="absolute bottom-3 right-3 text-xs text-foreground/50">
              {bio.length} / 150
            </span>
          </div>
        </div>

        {/* Section: Threads Badge Toggle */}
        <div className="space-y-3">
          <label className="block font-bold text-sm">Show Threads badge</label>
          <div className="border border-foreground/15 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium">Show Threads badge</span>
            <Toggle
              active={threadsBadge}
              onClick={() => setThreadsBadge(!threadsBadge)}
            />
          </div>
        </div>

        <Gender setValue={(v: any) => setGender(v)} value={gender} />

        <div className="space-y-3">
          <label className="block font-bold text-sm">
            Show account suggestions on profiles
          </label>
          <div className="border border-foreground/15 rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium mb-1">
                Show account suggestions on profiles
              </p>
              <p className="text-xs text-foreground/50 leading-snug">
                Choose whether people can see similar account suggestions on
                your profile, and whether your account can be suggested on other
                profiles.
              </p>
            </div>
            <Toggle
              active={suggestions}
              onClick={() => setSuggestions(!suggestions)}
            />
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-foreground/50 text-center px-4">
          Certain profile info, like your name, bio and links, is visible to
          everyone.
          <a href="#" className="text-[#0095f6] hover:underline">
            See what profile info is visible
          </a>
        </p>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 w-full max-w-50 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="w-full mt-8">
        <FooterAuth />
      </div>
    </div>
  );
}

// Custom Toggle Component
const Toggle = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-10 h-6 flex-none rounded-full relative transition-colors duration-200 ease-in-out ${
      active ? "bg-white" : "bg-[#363636]"
    }`}
  >
    <div
      className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
        active ? "translate-x-4 bg-black" : "translate-x-0 bg-gray-500"
      }`}
    />
  </button>
);

function Gender({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  const gender = ["male", "female", "-"];

  return (
    <Menu as="div" className="relative">
      <MenuButton as="div">
        <div className="space-y-2">
          <label className="block font-bold text-sm">Gender</label>
          <div className="relative">
            <div className="border border-foreground/15 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-foreground/5 transition-colors">
              <span className="text-sm">
                {value === "-" ? "prefer not to say" : value}
              </span>
              <ChevronDown />
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            This won't be part of your public profile.
          </p>
        </div>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="-mt-8 p-1 bg-background border rounded-xl border-foreground/10 shadow"
      >
        <RadioGroup value={value} onChange={setValue} aria-label="Server size">
          {gender.map((g) => (
            <MenuItem
              as="div"
              key={g}
              className="w-full origin-top-right text-sm/6 transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <Radio
                value={g}
                className="group relative hover:bg-foreground/10 rounded-xl flex cursor-pointer w-full shadow-md p-4 transition data-focus:outline outline-none"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="text-sm pr-4">
                    <p className="font-semibold">
                      {g === "-" ? "Prefer not to say" : g}
                    </p>
                  </div>
                  <CheckIcon className="size-6 opacity-0 transition group-data-checked:opacity-100" />
                </div>
              </Radio>
            </MenuItem>
          ))}
        </RadioGroup>
      </MenuItems>
    </Menu>
  );
}
