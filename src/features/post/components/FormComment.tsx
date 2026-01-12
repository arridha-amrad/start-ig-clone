import { cn } from "@/utils";
import { Smile } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapePressed from "@/hooks/useEscPress";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import EmojiPicker from "@/components/EmojiPicker";
import { useRef } from "react";
import mergeRefs from "merge-refs";

type Props = {
  ref: React.RefObject<HTMLInputElement | null>;
};

export default function FormComment({ ref }: Props) {
  const [body, setBody] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<number>(0);
  const handleCursorPosition = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const position = e.currentTarget.selectionStart;
    cursorPositionRef.current = position ?? 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ body });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-foreground/20 flex items-center gap-3"
    >
      <Emoji
        cursorPosition={cursorPositionRef}
        inputRef={inputRef}
        setText={setBody}
      />
      <input
        ref={mergeRefs(ref, inputRef)}
        type="text"
        placeholder="Add a comment..."
        className="flex-1 text-sm outline-none"
        value={body}
        onChange={handleChange}
        onClick={handleCursorPosition}
        onKeyUp={handleCursorPosition}
      />
      <button
        type="submit"
        className={cn(
          "font-medium text-sm",
          !!body ? "text-blue-500" : "text-foreground/50"
        )}
      >
        Post
      </button>
    </form>
  );
}

type EmojiProps = {
  setText: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  cursorPosition: RefObject<number>;
};

function Emoji({ cursorPosition, inputRef, setText }: EmojiProps) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  useEscapePressed(() => setOpen(false), false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: "top-start",
    middleware: [offset(5), shift()],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
  ]);

  return (
    <div className="flex items-center justify-center" ref={ref}>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        type="button"
        className="outline-0"
        onClick={() => setOpen((val) => !val)}
      >
        <Smile className="size-6" />
      </button>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50"
            {...getFloatingProps()}
          >
            <EmojiPicker
              open={open}
              inputRef={inputRef}
              setText={setText}
              cursorPosition={cursorPosition}
            />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
