import { cn } from "@/utils";
import { Button } from "@headlessui/react";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

export default function Carousel({
  aspectRatio,
  url,
}: {
  aspectRatio: string;
  url: string[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
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

  return (
    <div className="relative w-full group">
      <div
        style={{ aspectRatio }}
        className={cn("overflow-hidden")}
        ref={emblaRef}
      >
        <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
          {url.map((url, i) => (
            <div
              className={cn("w-full overflow-hidden")}
              style={{
                aspectRatio,
                transform: "translate3d(0, 0, 0)",
                flex: "0 0 100%",
                minWidth: 0,
                paddingLeft: "1rem",
              }}
              key={i}
            >
              <img
                src={url}
                alt="post image"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute group-hover:opacity-100 transition-opacity duration-150 ease-in opacity-0 left-4 top-1/2 -translate-y-1/2">
        <Button
          onClick={() => emblaApi?.scrollPrev()}
          className="size-max p-1 rounded-full bg-background/50"
        >
          <ChevronLeft className="w-5 h-5 text-foreground cursor-pointer" />
        </Button>
      </div>
      <div className="absolute group-hover:opacity-100 transition-opacity duration-150 ease-in opacity-0 right-4 top-1/2 -translate-y-1/2">
        <Button
          onClick={() => emblaApi?.scrollNext()}
          className="size-max p-1 rounded-full bg-background/50"
        >
          <ChevronRight className="w-5 h-5 text-foreground cursor-pointer" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1">
        {scrollSnaps.map((_, i) => (
          <div
            key={i}
            className={`${
              i === selectedIndex ? "bg-foreground" : "bg-foreground/50"
            } size-2 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}
