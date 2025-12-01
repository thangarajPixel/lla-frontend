"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RadioGroupProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  options?: { value: string; label: string }[];
  notRequired?: string;
  isLoading?: boolean;
};

const FormRadioGroup = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  notRequired,
  isLoading,
}: RadioGroupProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (value: string) => {
    field.onChange(value);
  };

  return (
    <div className="w-full max-w-md rounded-xl">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-foreground mb-1"
        >
          {label}
          {notRequired !== "true" && (
            <span className="text-destructive">*</span>
          )}
        </label>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          {/* <Recycle className="size-6 animate-spin" /> */}
          Loading...
        </div>
      ) : (
        <div>
          <RadioGroup
            value={field.value}
            onValueChange={handleChange}
            className="flex space-y-2 max-h-[39vh] overflow-y-auto pr-2"
          >
            {options?.map((option) => (
              <div
                key={option.value}
                className="flex h-fit items-center space-x-3 p-2 rounded-lg cursor-pointer"
              >
                <RadioGroupItem
                  id={option.value}
                  value={option.value}
                  className="border-2 border-secondary dark:border-secondary-foreground size-5"
                />
                <label
                  htmlFor={option.value}
                  className="cursor-pointer text-sm font-medium"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>

          {error && (
            <div className="mt-3 rounded-md p-3">
              <p className="text-sm text-red-500">{error.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormRadioGroup;
