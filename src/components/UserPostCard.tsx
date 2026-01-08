import { TUserPost } from "@/features/post/services";
import { Files, Heart } from "lucide-react";

type Props = {
  post: TUserPost;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="relative aspect-3/4 cursor-pointer overflow-hidden">
      <img
        src={post.media[0].url}
        alt="post_image"
        className="h-full w-full object-cover"
      />

      {post.media.length > 1 && (
        <div className="absolute top-2 right-2">
          <Files className="size-5" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <Heart className="aspect-square w-5 text-white md:w-7" />
            <p className="text-sm text-white md:text-base">10</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Heart className="aspect-square w-5 -scale-x-100 text-white md:w-7" />
            <p className="text-sm text-white md:text-base">25</p>
          </div>
        </div>
      </div>
    </div>
  );
}
