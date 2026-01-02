import { StoryAvatar } from "@/components/StoryAvatar";

// const fetchStories = async () => {};

export default function Stories() {
  return (
    <div className="flex items-center gap-x-3 overflow-x-auto">
      {Array.from({ length: 6 }, (_, i) => i).map((index) => (
        <StoryAvatar key={index} />
      ))}
    </div>
  );
}
