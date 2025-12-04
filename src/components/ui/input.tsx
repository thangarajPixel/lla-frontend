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
};

const Input = ({
  label,
  error,
  notRequired,
  className,
  labelClassName,
  inputClassName,
  errorClassName,
  ...props
}: InputFieldProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label
          htmlFor={label}
          className={cn(
            "block text-sm font-medium text-foreground font-mulish",
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
          "flex h-9 w-full rounded-full border border-[#BDBDBD] bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-chart-1/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          inputClassName,
        )}
        {...props}
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
