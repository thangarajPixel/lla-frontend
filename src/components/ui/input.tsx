// import type * as React from "react";

// import { cn } from "@/lib/utils";

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// export { Input };


import * as React from 'react';

import { cn } from '@/lib/utils';

type InputFieldProps = React.ComponentProps<'input'> & {
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
    <div className={cn('space-y-1', className)}>
      {label && (
        <label htmlFor={label} className={cn('block text-sm font-medium text-foreground', labelClassName)}>
          {label}
          {!notRequired && <span className="text-chart-1">*</span>}
        </label>
      )}
      <input
        id={label}
        className={cn(
          // 'flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'flex h-10 w-full rounded-full border border-[#BDBDBD] bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-chart-1 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          inputClassName,
        )}
        {...props}
      />
      {error && (
        <p className={cn('text-sm text-red-500', errorClassName)}>
          {error.message}
        </p>
      )}
    </div>
  );
};

Input.displayName = 'Input';

export { Input };
