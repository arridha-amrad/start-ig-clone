"use client";
import { EmojiIconBig } from "@/icons/EmojiIcon";
import { useState } from "react";

import MyEmoji, { TEmojiProps } from "@/components/MyEmoji";
import useClickOutside from "@/hooks/useClickOutside";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

type Props = { placement?: Placement } & TEmojiProps;

function Emoji({ cursorPosition, inputRef, setText, placement }: Props) {
  const [open, setOpen] = useState(false);
  const clickOutsideRef = useClickOutside(() => setOpen(false), inputRef);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: placement ?? "bottom-start",
    middleware: [offset(5), shift()],
  });

  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([role]);

  return (
    <div ref={clickOutsideRef}>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        type="button"
        className="outline-0"
        onClick={() => setOpen((val) => !val)}
      >
        <EmojiIconBig className="text-foreground/50 size-5" />
      </button>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-[50]"
            {...getFloatingProps()}
          >
            <MyEmoji
              cursorPosition={cursorPosition}
              inputRef={inputRef}
              setText={setText}
              open={open}
            />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default Emoji;
