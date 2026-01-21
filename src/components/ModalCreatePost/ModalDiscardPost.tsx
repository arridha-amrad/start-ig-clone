import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  closeAll: VoidFunction;
};

function ModalDiscardPost({ closeAll, open, setOpen }: Props) {
  return (
    <Dialog
      id="alert-dialog-headless-portal-root"
      role="alertdialog"
      onClose={() => {}}
      open={open}
      className="relative z-[999]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="bg-bg-secondary w-full max-w-sm rounded-xl">
          <DialogTitle as="div" className="flex items-center justify-center">
            <div className="w-full space-y-2 py-5 text-center">
              <h1 className="text-xl font-light">Discard post?</h1>
              <p className="text-foreground/70 text-sm">
                If you leave, your edits won&apos;t be saved.
              </p>
            </div>
          </DialogTitle>
          <hr className="border-foreground/10" />
          <div className="flex w-full flex-col">
            <button
              onClick={closeAll}
              className="h-14 text-sm font-semibold text-red-400"
            >
              Discard
            </button>
            <hr className="border-foreground/10" />
            <button onClick={() => setOpen(false)} className="h-14 text-sm">
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ModalDiscardPost;
