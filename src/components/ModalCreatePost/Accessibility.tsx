import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import { useCreatePost } from "./Context";

export default function Accessibility() {
  const { preview } = useCreatePost();
  return (
    <Disclosure as="div" className="pr-2">
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="font-light group-data-[open]:font-medium">
          Accessibility
        </span>
        <svg
          aria-label="Down chevron icon"
          fill="currentColor"
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
          className="rotate-180 group-data-[open]:rotate-0"
        >
          <title>Down chevron icon</title>
          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
        </svg>
      </DisclosureButton>
      <DisclosurePanel as="div" className="pt-4">
        <p className="text-foreground/50 text-xs">
          Alt text describes your photos for people with visual impairments. Alt
          text will be automatically created for your photos or you can choose
          to write your own.
        </p>
        <div className="mt-2 space-y-2">
          {preview.map((url, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-between gap-4"
            >
              <div className="size-[44px] shrink-0">
                <Image
                  src={url}
                  alt="preview image"
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
              <input
                type="text"
                className="w-full text-xs outline-0"
                placeholder="Write alt text..."
              />
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
