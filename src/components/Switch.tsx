import { Switch as SwitchHeadless } from "@headlessui/react";

type Props = {
  isChecked: boolean;
  onChange: VoidFunction;
};

export default function MySwitch({ isChecked, onChange }: Props) {
  return (
    <SwitchHeadless
      checked={isChecked}
      onChange={onChange}
      className="group bg-foreground/10 data-checked:bg-foreground data-focus:outline-foreground relative flex h-7 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-focus:outline-1"
    >
      <span
        aria-hidden="true"
        className="bg-background pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5"
      />
    </SwitchHeadless>
  );
}
