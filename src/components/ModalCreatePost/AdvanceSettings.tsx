import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Switch,
} from "@headlessui/react";

export default function AdvanceSettings() {
  return (
    <Disclosure as="div" className="pr-2">
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="font-light group-data-[open]:font-medium">
          Advance Settings
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
      <DisclosurePanel as="div" className="space-y-4 pt-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h1 className="flex-1 font-light">
              Hide like and view counts on this post
            </h1>
            <div className="w-max">
              <Switch className="group bg-foreground/10 data-[checked]:bg-foreground/10 data-[focus]:outline-foreground relative flex h-7 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1">
                <span
                  aria-hidden="true"
                  className="bg-foreground/30 group-data-[checked]:bg-foreground pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
          </div>
          <p className="text-foreground/50 pt-2 text-xs">
            Only you will see the total number of likes and views on this post.
            You can change this later by going to the ··· menu at the top of the
            post. To hide like counts on other people&apos;s posts, go to your
            account settings.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <h1 className="flex-1 font-light">Turn off commenting</h1>
            <div className="w-max">
              <Switch className="group bg-foreground/10 data-[checked]:bg-foreground/10 data-[focus]:outline-foreground relative flex h-7 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1">
                <span
                  aria-hidden="true"
                  className="bg-foreground/30 group-data-[checked]:bg-foreground pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
          </div>
          <p className="text-foreground/50 pt-2 text-xs">
            You can change this later by going to the ··· menu at the top of
            your post.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <h1 className="flex-1 font-light">
              Automatically share to Threads
            </h1>
            <div className="w-max">
              <Switch className="group bg-foreground/5 data-[checked]:bg-foreground data-[focus]:outline-foreground relative flex h-7 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1">
                <span
                  aria-hidden="true"
                  className="bg-background pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
            </div>
          </div>
          <p className="text-foreground/50 pt-2 text-xs">
            Always share your posts to Threads. You can change your audience on
            Threads settings Learn more
          </p>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
