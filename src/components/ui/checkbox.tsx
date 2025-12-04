"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
  HTMLMotionProps<"button"> & {
    checked?: boolean;
    readOnly?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  };

export const Checkbox = ({
  className,
  onCheckedChange,
  checked,
  defaultChecked,
  readOnly = false,
  ...props
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = React.useState(
    checked ?? defaultChecked ?? false,
  );

  React.useEffect(() => {
    if (checked !== undefined) setIsChecked(checked);
  }, [checked]);

  const handleCheckedChange = React.useCallback(
    (value: boolean) => {
      if (readOnly) return;

      setIsChecked(value);
      onCheckedChange?.(value);
    },
    [onCheckedChange, readOnly],
  );

  return (
    <CheckboxPrimitive.Root
      {...props}
      checked={isChecked}
      disabled={readOnly}
      onCheckedChange={handleCheckedChange}
      asChild
    >
      <motion.button
        data-slot="checkbox"
        className={cn(
          "peer border-input dark:bg-input/30 data-[state=checked]:bg-chart-1 data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-sm border shadow-xs transition-colors duration-500 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className,
          readOnly && "pointer-events-none opacity-90",
        )}
        whileTap={!readOnly ? { scale: 0.95 } : undefined}
        whileHover={!readOnly ? { scale: 1.05 } : undefined}
      >
        <CheckboxPrimitive.Indicator forceMount asChild>
          <motion.svg
            data-slot="checkbox-indicator"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3.5"
            stroke="currentColor"
            className="size-3.5"
            initial="unchecked"
            animate={isChecked ? "checked" : "unchecked"}
            aria-hidden="true"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
              variants={{
                checked: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.2, delay: 0.2 },
                },
                unchecked: {
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
          </motion.svg>
        </CheckboxPrimitive.Indicator>
      </motion.button>
    </CheckboxPrimitive.Root>
  );
};

export const CheckboxField = ({ ...props }: CheckboxProps) => {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={props.id ?? id}
        checked={props.checked}
        readOnly={props.readOnly}
        onCheckedChange={props.onCheckedChange}
        className={props.className}
      />
      <Label className="hidden" htmlFor={id}>
        Animated checkbox
      </Label>
    </div>
  );
};

export default CheckboxField;
