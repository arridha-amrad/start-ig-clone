"use client";

import Avatar from "@/components/Avatar";
import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { useFeedPostStore } from "@/lib/stores/feedPostStore";
import { useUserPostStore } from "@/lib/stores/profilePostStore";
import { cn, showToast } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import Accessibility from "./Accessibility";
import AdvanceSettings from "./AdvanceSettings";
import { useCreatePost } from "./Context";
import Emoji from "./Emoji";
import ShareTo from "./ShareTo";

const FormCreatePost = () => {
  const { setStep, files, newPostFormRef } = useCreatePost();
  const addPostToFeed = useFeedPostStore((store) => store.addPost);
  const addPostToUserPosts = useUserPostStore((store) => store.addPost);

  const { data: session } = useSession();
  const pathname = usePathname();

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("isSubmitting");
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("location", location);
      files.forEach((file) => formData.append("images", file));
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        if (data.message) {
          showToast(data.message, "error");
        }
      } else {
        const data = await response.json();
        const newPost = data.post as TFeedPost;
        addPostToFeed(newPost);
        if (pathname === `/${session?.user.username}`) {
          const { createdAt, urls, id, sumComments, sumLikes } = newPost;
          addPostToUserPosts({ createdAt, id, sumComments, sumLikes, urls });
        }
        showToast(data.message, "success");
        setStep("isSubmitted");
      }
    } catch {
      toast.error("Failed to create post");
      setStep("makeCaption");
    }
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const cursorPositionRef = useRef<number>(0);

  const handleCursorPosition = (
    e: React.SyntheticEvent<HTMLTextAreaElement>,
  ) => {
    const position = e.currentTarget.selectionStart;
    cursorPositionRef.current = position ?? 0;
  };

  if (!session) return null;

  return (
    <fieldset
      className={cn(
        "custom-scrollbar flex h-full w-full flex-col overflow-y-scroll pb-8",
      )}
    >
      <div className="flex h-[60px] w-full shrink-0 items-center gap-3 px-2 py-2">
        <Avatar
          url={session?.user.image ?? "/default.jpg"}
          style={{ width: 32, height: 32 }}
        />
        <h1 className="text-sm font-medium">{session?.user.username}</h1>
      </div>
      <form
        ref={newPostFormRef}
        onSubmit={handleSubmit}
        className="flex-1 shrink-0 space-y-4 px-2"
      >
        <textarea
          ref={textAreaRef}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onClick={handleCursorPosition}
          onKeyUp={handleCursorPosition}
          name="description"
          className="bg-bg-secondary custom-scrollbar w-full resize-none rounded-lg outline-0"
          rows={7}
        ></textarea>

        <div className="flex justify-between pr-2">
          <Emoji
            cursorPosition={cursorPositionRef}
            inputRef={textAreaRef}
            setText={setDescription}
            placement="left"
          />
          <h2 className="text-foreground/20 text-sm">0/2200</h2>
        </div>

        <div className="relative flex w-full items-center py-1 pr-2">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name="location"
            placeholder="Add location"
            className="w-full font-light outline-0"
          />
          <svg
            aria-label="Add location"
            fill="currentColor"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
          >
            <title>Add location</title>
            <path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path>
          </svg>
        </div>

        <div className="relative flex w-full items-center py-1 pr-2">
          <input
            name="collaborators"
            placeholder="Add collaborators"
            className="w-full font-light outline-0"
          />
          <svg
            aria-label="Add collaborators"
            fill="currentColor"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
          >
            <title>Add collaborators</title>
            <path d="M21 10a1 1 0 0 0-1 1v9c0 .932-.643 1.71-1.507 1.931C18.429 19.203 16.199 17 13.455 17H8.55c-2.745 0-4.974 2.204-5.037 4.933A1.999 1.999 0 0 1 2 20V6c0-1.103.897-2 2-2h9a1 1 0 1 0 0-2H4C1.794 2 0 3.794 0 6v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4v-9a1 1 0 0 0-1-1zM8.549 19h4.906a3.05 3.05 0 0 1 3.045 3H5.505a3.05 3.05 0 0 1 3.044-3z"></path>
            <path d="M6.51 11.002c0 2.481 2.02 4.5 4.502 4.5 2.48 0 4.499-2.019 4.499-4.5s-2.019-4.5-4.5-4.5a4.506 4.506 0 0 0-4.5 4.5zm7 0c0 1.378-1.12 2.5-2.498 2.5-1.38 0-2.501-1.122-2.501-2.5s1.122-2.5 2.5-2.5a2.502 2.502 0 0 1 2.5 2.5zM23.001 3.002h-2.004V1a1 1 0 1 0-2 0v2.002H17a1 1 0 1 0 0 2h1.998v2.003a1 1 0 1 0 2 0V5.002h2.004a1 1 0 1 0 0-2z"></path>
          </svg>
        </div>
        <ShareTo username={session?.user.username} />
        <Accessibility />
        <AdvanceSettings />
      </form>
    </fieldset>
  );
};

export default FormCreatePost;
