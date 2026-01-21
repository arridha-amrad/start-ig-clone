"use client";

import EmblaCarousel from "@/components/EmblaCarousel";
import { useCreatePost } from "./Context";

type Props = {
  height: number;
  width: number;
};

const Preview = ({ height, width }: Props) => {
  const { preview } = useCreatePost();
  return (
    <div className="relative" style={{ width, height }}>
      <EmblaCarousel contentPerSlide={1} urls={preview} />
    </div>
  );
};

export default Preview;
