import EmojiPicker from "@/components/EmojiPicker";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapePressed from "@/hooks/useEscPress";
import { cn } from "@/utils";
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
import { Loader2, Smile } from "lucide-react";
import mergeRefs from "merge-refs";
import {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { addCommentSchema } from "@/lib/zod/post.schema";
import z from "zod";
import toast from "react-hot-toast";
import { useAddCommentMutation } from "../mutations";

type Props = {
  postId: string;
  ref: React.RefObject<HTMLInputElement | null>;
};

export default function FormComment({ ref, postId }: Props) {
  const { mutateAsync, isPending } = useAddCommentMutation(postId);

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
    const validation = addCommentSchema.safeParse({
      postId,
      body,
    });
    if (!validation.success) {
      const err = validation.error;
      const errBody = z.treeifyError(err).properties?.body?.errors[0];
      if (errBody) {
        toast.error(errBody);
      }
      return;
    }
    try {
      await mutateAsync({ body: validation.data.body, postId });
      setBody("");
      cursorPositionRef.current = 0;
    } catch (err) {}
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
        disabled={isPending}
      />
      <input
        disabled={isPending}
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
        disabled={isPending}
        type="submit"
        className={cn(
          "font-medium text-sm",
          !!body ? "text-blue-500" : "text-foreground/50"
        )}
      >
        {isPending ? (
          <Loader2 className="animate-spin size-5 text-foreground/70" />
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
}

type EmojiProps = {
  disabled: boolean;
  setText: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  cursorPosition: RefObject<number>;
};

function Emoji({ cursorPosition, disabled, inputRef, setText }: EmojiProps) {
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
        disabled={disabled}
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
