import { useState } from "react";
import { ChevronDown, PencilIcon } from "lucide-react";
import { FooterAuth } from "@/components/FooterAuth";
import {
  Menu,
  Input,
  MenuButton,
  MenuItem,
  MenuItems,
  Field,
  Label,
  RadioGroup,
  Radio,
} from "@headlessui/react";

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [threadsBadge, setThreadsBadge] = useState(true);
  const [suggestions, setSuggestions] = useState(false);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-[630px] mx-auto space-y-8">
        <h1 className="text-xl font-bold">Edit profile</h1>
        {/* Section: Profile Header */}
        <div className="bg-foreground/5 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-linear-to-tr from-yellow-400 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-black">
                {/* Placeholder Image */}
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm">amrad2108</p>
              <p className="text-gray-400 text-sm">amrad</p>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
            Change photo
          </button>
        </div>

        {/* Section: Website */}
        <div className="space-y-2">
          <label className="block font-bold text-sm">Website</label>
          <Input
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

        {/* Section: Gender */}
        <DropDownGender />
        <Example />
        {/* <div className="space-y-2">
          <label className="block font-bold text-sm">Gender</label>
          <div className="relative">
            <div className="border border-foreground/15 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-gray-500 transition-colors">
              <span className="text-sm">Prefer not to say</span>
              <DropDownGender />
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            This won't be part of your public profile.
          </p>
        </div> */}

        {/* Section: Account Suggestions */}
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
          everyone.{" "}
          <a href="#" className="text-[#0095f6] hover:underline">
            See what profile info is visible
          </a>
        </p>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 w-full max-w-[200px] py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="w-full mt-8">
        <FooterAuth />
      </div>
    </div>
  );
};

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

function DropDownGender() {
  const gender = ["male", "female", "prefer not to say"];
  let [selected, setSelected] = useState(gender[0]);

  return (
    <Menu as="div" className="relative">
      <MenuButton as="div">
        <div className="space-y-2">
          <label className="block font-bold text-sm">Gender</label>
          <div className="relative">
            <div className="border border-foreground/15 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-foreground/5 transition-colors">
              <span className="text-sm">Prefer not to say</span>
              <ChevronDown />
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            This won't be part of your public profile.
          </p>
        </div>
      </MenuButton>
      <MenuItems anchor="bottom end">
        <RadioGroup
          value={selected}
          onChange={setSelected}
          aria-label="Server size"
        >
          {gender.map((plan) => (
            <MenuItem as="div" key={plan} className="flex items-center gap-2">
              <Radio
                value={plan}
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
              </Radio>
              <Label>{plan}</Label>
            </MenuItem>
          ))}
        </RadioGroup>
      </MenuItems>
    </Menu>
  );
}

function Example() {
  return (
    <div className="">
      <Menu as={"div"}>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
          Options
          <ChevronDown className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <PencilIcon className="size-4 fill-white/30" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default EditProfile;
