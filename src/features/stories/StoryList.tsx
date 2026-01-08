import { StoryAvatar } from "@/components/StoryAvatar";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Stories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    dragFree: false,
    watchDrag: false,
    align: "start",
  });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="relative w-full group overflow-hidden px-1">
      <div className="flex touch-pan-y touch-pinch-zoom">
        {Array.from({ length: 30 }, (_, i) => i).map((index) => (
          <div key={index} className="min-w-0 flex-[0_0_calc(100%/6)]">
            <StoryAvatar />
          </div>
        ))}
      </div>

      {selectedIndex > 0 && (
        <div className="absolute top-9 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in">
          <button
            onClick={onPrevButtonClick}
            className="flex size-6.25 items-center justify-center rounded-full bg-foreground"
          >
            <ChevronLeftIcon className="size-5 text-background/70" />
          </button>
        </div>
      )}

      {selectedIndex !== scrollSnaps.length - 1 && (
        <div className="absolute top-9 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in">
          <button
            onClick={onNextButtonClick}
            className="flex size-6.25 items-center justify-center rounded-full bg-foreground"
          >
            <ChevronRightIcon className="size-5 text-background/70" />
          </button>
        </div>
      )}
    </div>
  );
}
