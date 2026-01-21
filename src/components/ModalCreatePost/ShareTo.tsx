import Avatar from "@/components/Avatar";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Switch,
} from "@headlessui/react";

type Props = {
  username: string;
};

export default function ShareTo({ username }: Props) {
  return (
    <Disclosure as="div" className="pr-2">
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="font-light group-data-[open]:font-medium">
          Share To
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
      <DisclosurePanel
        as="div"
        className="flex items-center justify-between pt-4"
      >
        <div className="flex flex-1 items-center gap-4">
          <Avatar url="/default.jpg" style={{ height: 40, width: 40 }} />
          <div>
            <h1>{username}</h1>
            <p className="text-foreground/50 text-xs">Threads · Public</p>
          </div>
        </div>
        <Switch className="group bg-foreground/10 data-[checked]:bg-foreground/10 data-[focus]:outline-foreground relative flex h-7 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1">
          <span
            aria-hidden="true"
            className="bg-foreground/30 group-data-[checked]:bg-foreground pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
          />
        </Switch>
      </DisclosurePanel>
    </Disclosure>
  );
}
