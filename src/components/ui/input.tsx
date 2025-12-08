import type * as React from "react";

import { cn } from "@/lib/utils";

type InputFieldProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: { message?: string };
  notRequired?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  restrictionType?: string;
};

const Input = ({
  label,
  error,
  notRequired,
  className,
  labelClassName,
  inputClassName,
  errorClassName,
  restrictionType,
  ...props
}: InputFieldProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label
          htmlFor={label}
          className={cn(
            "block text-base 3xl:text-lg text-foreground font-mulish",
            labelClassName,
          )}
        >
          {label}
          {!notRequired && <span className="text-chart-1">*</span>}
        </label>
      )}

      <input
        id={label}
        className={cn(
          "flex h-9 w-full rounded-full border border-[#BDBDBD] bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-chart-1/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-sm placeholder:font-urbanist",
          inputClassName,
        )}
        {...props}
        onKeyDown={(e) => {
          const allowedControlKeys = [
            "Backspace",
            "Tab",
            "ArrowLeft",
            "ArrowRight",
            "Delete",
            "Shift",
          ];

          if (e.ctrlKey || e.metaKey) return;

          if (allowedControlKeys.includes(e.key)) return;

          if (restrictionType === "text") {
            if (!/^[0-9\s-+]$/.test(e.key)) {
              e.preventDefault();
            }
          }

          if (restrictionType === "number") {
            if (!/^[a-zA-Z\s]$/.test(e.key)) {
              e.preventDefault();
            }
          }

          props.onKeyDown?.(e);
        }}
        onPaste={(e) => {
          const pasted = e.clipboardData.getData("text");

          if (restrictionType === "text") {
            if (!/^[0-9]+$/.test(pasted)) {
              e.preventDefault();
            }
          }

          if (restrictionType === "number") {
            if (!/^[a-zA-Z\s]+$/.test(pasted)) {
              e.preventDefault();
            }
          }

          props.onPaste?.(e);
        }}
      />

      {error && (
        <p className={cn("text-sm text-red-500", errorClassName)}>
          {error.message}
        </p>
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
