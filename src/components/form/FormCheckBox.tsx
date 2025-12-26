"use client";

import {
  type Control,
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

type FormCheckBoxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
  className?: string;
};

function FormCheckBox<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  className,
}: FormCheckBoxProps<T>) {
  const { trigger } = useFormContext<T>();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const id = `checkbox-${name.replace(/\./g, "-")}`;

  const languagePath = name.replace(
    /\.(read|write|speak)$/,
    ".language",
  ) as Path<T>;

  return (
    <div className="flex items-start gap-2">
      <Checkbox
        id={id}
        checked={!!value}
        onCheckedChange={(checked) => {
          onChange(!!checked);
          trigger(languagePath);
        }}
        disabled={disabled}
        className={className}
      />

      <div className="flex flex-col leading-none">
        {label && (
          <label
            htmlFor={id}
            className="text-sm text-foreground cursor-pointer"
          >
            {label}
          </label>
        )}

        {error && (
          <span className="text-xs text-red-500 mt-1">{error.message}</span>
        )}
      </div>
    </div>
  );
}

export default FormCheckBox;
