'use client';

import { format, isValid, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from 'react-hook-form';
import { useController } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
// import type { ReportFiltersType } from '@/types/reports';

type DatePickerFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  defaultValue?: PathValue<T, Path<T>>;
  notRequired?: string;
  placeholder?: string;
  // inDrawer?: boolean;
  // onFilterChange?: (key: keyof any, value: any) => void;
  // isReport?: boolean;
};

const DatePickerField = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  notRequired,
  placeholder,
  // inDrawer = false,
  // onFilterChange,
  // isReport,
  ...props
}: DatePickerFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const getDateValue = (value: unknown): Date | undefined => {
    if (value instanceof Date && isValid(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const parsed = parseISO(value);
      return isValid(parsed) ? parsed : undefined;
    }
    return undefined;
  };

  const selectedDate = getDateValue(field.value);

  const displayValue = selectedDate
    ? format(selectedDate, 'dd-MM-yyyy')
    : placeholder || 'Pick a date';

  const handleSelect = (value: Date | undefined) => {
    // if (value) {
    //   isReport ? field.onChange(value.toISOString()) : field.onChange(value);
    //   if (field.name && onFilterChange) {
    //     const formattedDate = format(new Date(value), 'yyyy-MM-dd');
    //     onFilterChange?.(field.name as any, formattedDate);
    //   }
    //   setOpen(false);
    // }
    if (value) {
      field.onChange(value);
      setOpen(false);
    }
  };

  // ✅ Close calendar on outside click (only in drawer mode)
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative space-y-1">
      {label && (
        <label className={`block text-sm font-medium text-foreground`}>
          {label}
          {notRequired !== 'true' && (
            <span className="text-destructive">*</span>
          )}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            id={name.toString()}
            variant="outline"
            className={cn(
              'flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm justify-start text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
            {...props}
          >
            <CalendarIcon className="mr-2 size-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>
        <PopoverContent forceMount className="z-9999 w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default DatePickerField;
