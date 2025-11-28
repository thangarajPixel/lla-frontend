'use client';

import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SelectProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  options: { value: string; label: string; subtitle?: string }[];
  placeholder?: string;
  noDataMessage?: string;
  notRequired?: boolean;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
};

const defaultOptions: { value: string; label: string; subtitle?: string }[] = [];

const FormSelectBox = <T extends FieldValues>({
  name,
  control,
  label,
  options = defaultOptions,
  placeholder = 'Select an option',
  noDataMessage = 'No data found',
  notRequired,
  defaultValue,
  className,
  disabled,
}: SelectProps<T>) => {
  const { field, fieldState: { error } } = useController({ name, control });

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {!notRequired && <span className="text-danger">*</span> }
        </label>
      )}
      <Select
        value={field.value ?? defaultValue}
        onValueChange={field.onChange}
        disabled={options.length === 0 || disabled}
      >
        <SelectTrigger className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
          <SelectValue placeholder={options.length === 0 ? noDataMessage : placeholder} />
        </SelectTrigger>
        {options.length > 0
          ? (
              <SelectContent className="max-h-60 overflow-y-auto">
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      {option.subtitle && (
                        <span className="text-xs text-muted-foreground">{option.subtitle}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            )
          : (
              <SelectContent>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  {noDataMessage}
                </div>
              </SelectContent>
            )}
      </Select>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default FormSelectBox;
