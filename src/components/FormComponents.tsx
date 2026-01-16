import { useStore } from "@tanstack/react-form";

import { useFieldContext, useFormContext } from "@/hooks/form-context";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button, Field, Input, Label } from "@headlessui/react";
import { cn } from "@/utils";
import { useId, useState } from "react";

export function SubmitButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          className="disabled:bg-bg-secondary bg-skin-primary mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium"
        >
          {label}
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        </Button>
      )}
    </form.Subscribe>
  );
}

function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>;
}) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === "string" ? error : error.message}
          className="text-red-400 font-light text-xs"
        >
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </>
  );
}

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const id = useId();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Field className="relative w-full space-y-1">
      <div className="relative w-full">
        <Label
          htmlFor={id}
          className={cn(
            "text-skin-muted absolute top-1/2 left-4 -translate-y-1/2 text-sm transition-all duration-75 ease-in select-none",
            (!!field.state.value || isFocus) &&
              "top-3.5 left-3 text-xs tracking-wide"
          )}
        >
          {label}
        </Label>
        <Input
          id={id}
          onChange={(e) => field.handleChange(e.target.value)}
          type="text"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={cn(
            "bg-foreground/10 peer ring-skin-primary h-12 w-full rounded-lg px-3",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-foreground/25",
            (!!field.state.value || isFocus) && "pt-3 text-sm font-medium"
          )}
        />
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

export function PasswordField() {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
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
            (!!field.state.value || isFocus) &&
              "top-3.5 left-3 text-xs tracking-wide"
          )}
        >
          Password
        </Label>
        <Input
          id={id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => field.handleChange(e.target.value)}
          type={showPassword ? "text" : "password"}
          className={cn(
            "bg-foreground/10 ring-skin-primary h-12 w-full rounded-lg px-3",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-foreground/25",
            (!!field.state.value || isFocus) && "pt-3 text-sm font-medium"
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
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

export function TextArea({
  label,
  rows = 3,
}: {
  label: string;
  rows?: number;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <label htmlFor={label} className="block font-bold mb-1 text-xl">
        {label}
        <textarea
          value={field.state.value}
          onBlur={field.handleBlur}
          rows={rows}
          onChange={(e) => field.handleChange(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

export function Select({
  label,
  values,
}: {
  label: string;
  values: Array<{ label: string; value: string }>;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <label htmlFor={label} className="block font-bold mb-1 text-xl">
        {label}
      </label>
      <select
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {values.map((value) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </select>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}
