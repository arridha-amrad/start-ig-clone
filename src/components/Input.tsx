import { cn } from "@/utils";
import { Button, Field, Input, Label } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useId, useState } from "react";

type Props = {
  error?: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextFieldForAuth({ label, onChange, error, ...props }: Props) {
  const id = useId();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Field className="relative w-full space-y-2">
      <div className="relative w-full">
        <Label
          htmlFor={id}
          className={cn(
            "text-skin-muted absolute top-1/2 left-4 -translate-y-1/2 text-sm transition-all duration-75 ease-in select-none",
            (!!props.value || isFocus) && "top-3.5 left-3 text-xs tracking-wide"
          )}
        >
          {label}
        </Label>
        <Input
          {...props}
          id={id}
          onChange={onChange}
          type="text"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={cn(
            "bg-foreground/10 peer ring-skin-primary h-12 w-full rounded-lg px-3",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-foreground/25",
            (!!props.value || isFocus) && "pt-3 text-sm font-medium"
          )}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </Field>
  );
}

export function PasswordFieldForAuth({
  onChange,
  error,
  ...props
}: Omit<Props, "label">) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Field className="relative w-full space-y-2">
      <div className="relative w-full">
        <Label
          htmlFor={id}
          className={cn(
            "text-skin-muted absolute top-1/2 left-4 -translate-y-1/2 text-sm transition-all duration-75 ease-in select-none",
            (!!props.value || isFocus) && "top-3.5 left-3 text-xs tracking-wide"
          )}
        >
          Password
        </Label>
        <Input
          {...props}
          id={id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          className={cn(
            "bg-foreground/10 ring-skin-primary h-12 w-full rounded-lg px-3",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-foreground/25",
            (!!props.value || isFocus) && "pt-3 text-sm font-medium"
          )}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            type="button"
            className="flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye className="size-5 text-foreground/50" />
            ) : (
              <EyeOff className="size-5 text-foreground/50" />
            )}
          </Button>
        </div>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </Field>
  );
}
