import type * as React from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
  type UseControllerProps,
  useController,
} from "react-hook-form";

import { Input } from "@/components/ui/input";

type InputProps<T extends FieldValues> = UseControllerProps<T> & {
  notRequired?: boolean;
  label?: string;
  name?: Path<T>;
  control?: Control<T>;
  defaultValue?: PathValue<T, Path<T>>;
  errorMessage?: { message?: string };
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  restrictionType?: string;
} & React.ComponentProps<"input">;

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  notRequired,
  defaultValue,
  errorMessage,
  restrictionType,
  ...props
}: InputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const safeValue =
    field.value === undefined || field.value === null
      ? props.type === "number"
        ? ""
        : ""
      : field.value;

  return (
    <Input
      label={label}
      error={errorMessage || error}
      notRequired={notRequired}
      {...field}
      {...props}
      value={safeValue}
      restrictionType={restrictionType}
    />
  );
};

export default FormInput;
