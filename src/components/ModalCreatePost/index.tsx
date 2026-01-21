import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PlusSquare, X } from "lucide-react";
import { ReactNode, useState } from "react";
import useMeasure from "react-use-measure";
import { useCreatePost } from "./Context";
import ModalTitle from "./ModalTitle";
import Picker from "./Picker";
import Preview from "./Preview";
import ModalDiscardPost from "./ModalDiscardPost";
import { cn } from "@/utils";

type Props = {
  children: ReactNode;
};

const NewPostModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [openDiscardPost, setOpenDiscardPost] = useState(false);

  const { preview, step, setPreview, setStep, setFiles } = useCreatePost();
  const [ref, { height }] = useMeasure();

  const closeModal = () => {
    setPreview([]);
    setStep("pick");
    setFiles([]);
    setOpenDiscardPost(false);
    setOpen(false);
  };

  const handleOnClose = () => {
    if (step === "pick" || step === "makeCaption") {
      if (preview.length === 0) {
        setOpen(false);
      } else {
        setOpenDiscardPost(true);
      }
    }
    if (step === "isSubmitted") {
      closeModal();
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="flex mt-2 items-center gap-2 text-xl p-1.5 font-medium hover:bg-foreground/10 lg:pr-4 w-max rounded-xl"
      >
        <div className="p-2">
          <PlusSquare className="size-6" />
        </div>
        <span className="hidden lg:block">Create Post</span>
      </Button>

      <Dialog open={open} onClose={handleOnClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-bg-secondary overflow-hidden rounded-xl">
            <ModalTitle />
            <div
              ref={ref}
              className={cn(
                "h-[500px] min-h-[70vh] overflow-hidden transition-all duration-200 ease-linear",
                step === "makeCaption" ? "aspect-auto" : "aspect-square",
              )}
            >
              {step === "isSubmitting" && (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="size-[100px]">
                    <img
                      src="/post-submitting.gif"
                      alt="submitting"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {step === "isSubmitted" && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <div className="size-[100px]">
                    <img
                      src="/post-submitted.gif"
                      alt="submitted"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-light">
                    You post has been shared
                  </h2>
                </div>
              )}

              {step === "pick" ? (
                preview.length === 0 ? (
                  <Picker />
                ) : (
                  <Preview height={height} width={height} />
                )
              ) : null}

              {step === "makeCaption" && (
                <section className="flex h-full gap-2">
                  <Preview height={height} width={height} />
                  <div className="w-sm">{children}</div>
                </section>
              )}
            </div>
          </DialogPanel>
          <div className="fixed top-5 right-5">
            <button
              onClick={handleOnClose}
              className="flex aspect-square w-10 items-center justify-center"
            >
              <X className="aspect-square w-7 stroke-white" />
            </button>
          </div>
        </div>
      </Dialog>
      <ModalDiscardPost
        open={openDiscardPost}
        setOpen={setOpenDiscardPost}
        closeAll={closeModal}
      />
    </>
  );
};

export default NewPostModal;
