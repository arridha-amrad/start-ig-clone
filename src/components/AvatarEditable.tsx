import { ChangeEvent, useRef, useState } from "react";
import AvatarWithStoryIndicator from "./AvatarWithStoryIndicator";
import { Camera, Loader2 } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "@/query-options";
import { useLocation, useParams } from "@tanstack/react-router";

const EditableAvatar = () => {
  const { username } = useParams({ from: "/_optionalAuth/$username" });
  const { data } = useSuspenseQuery(profileQueryOptions(username));
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = useLocation().pathname;

  const [currAvatar, setCurrAvatar] = useState(data?.image ?? "/default.jpg");

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= 1000 * 1000) {
        const url = URL.createObjectURL(file);
        setCurrAvatar(url);
        btnRef.current?.click();
      } else {
        // showToast("File too big. 1MB is allowed", "error");
      }
    }
  };

  return (
    <form className="group relative size-[166px] cursor-pointer">
      {true && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/50">
          <Loader2 className="size-6 animate-spin" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100">
        <Camera className="aspect-square w-7" />
        <input
          disabled={false}
          accept="image/*"
          name="image"
          onChange={onChangeFileInput}
          hidden
          ref={inputRef}
          type="file"
          className="h-full w-full"
        />
      </div>
      <AvatarWithStoryIndicator
        onClick={() => inputRef.current?.click()}
        isStoryExists={false}
        isStoryWatched={false}
        size={150}
        avatarUrl={currAvatar}
      />
      <button hidden type="submit" ref={btnRef}></button>
    </form>
  );
};

export default EditableAvatar;
