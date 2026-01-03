import { StoryAvatar } from "@/components/StoryAvatar";

// const fetchStories = async () => {};

export default function Stories() {
  return (
    <div className="w-full overflow-auto">
      <div className="flex items-center gap-x-3 w-max">
        {Array.from({ length: 30 }, (_, i) => i).map((index) => (
          <StoryAvatar key={index} />
        ))}
      </div>
    </div>
  );
}
