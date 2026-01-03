import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function ModalActionOptions({ open, setOpen, children }: Props) {
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <svg
          aria-label="Options"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Options</title>
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 flex w-screen items-center justify-center p-4 transition duration-300 ease-out data-[closed]:opacity-0"
        transition
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="bg-bg-secondary relative flex w-full max-w-sm flex-col rounded-xl">
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
