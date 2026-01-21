"use client";

import { cn } from "@/lib/utils";
import { Steps, useCreatePost } from "./Context";

const ModalTitle = () => {
  const { step, setStep, preview, newPostFormRef } = useCreatePost();
  const s = ["pick", "makeCaption", "isSubmitting", "isSubmitted"];
  const currS = s.findIndex((st) => st === step);
  return (
    <div
      className={cn(
        "border-foreground/20 bg-background flex h-[50px] w-full items-center justify-center border-b px-4",
        preview.length > 0 && "justify-between",
      )}
    >
      <button
        onClick={() => setStep(s[currS - 1] as Steps)}
        className={cn(
          "text-skin-inverted invisible font-semibold",
          step === "makeCaption" && "visible",
        )}
      >
        <svg
          aria-label="Back"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Back</title>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="2.909"
            x2="22.001"
            y1="12.004"
            y2="12.004"
          ></line>
          <polyline
            fill="none"
            points="9.276 4.726 2.001 12.004 9.276 19.274"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></polyline>
        </svg>
      </button>

      <h1 className="text-sm font-semibold">Create new post</h1>

      <div className="w-max">
        {step === "pick" && (
          <button
            onClick={() => setStep(s[currS + 1] as Steps)}
            className={cn(
              "text-skin-primary text-sm font-medium",
              preview.length === 0 && "invisible",
            )}
          >
            Next
          </button>
        )}

        {step === "makeCaption" && (
          <button
            onClick={() => {
              newPostFormRef?.current?.requestSubmit();
              setStep(s[currS + 1] as Steps);
            }}
            className={cn(
              "text-skin-primary text-sm font-medium",
              preview.length === 0 && "invisible",
            )}
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalTitle;
