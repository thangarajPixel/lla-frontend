"use client";

import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  defaultValue?: PathValue<T, Path<T>>;
  notRequired?: string;
  placeholder?: string;
  dateRange?: boolean;
  index?: number;
  endDate?: (index: number) => void;
  onSelectEndDate?: (index: number, date: string) => void;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  // return date.toLocaleDateString('en-US', {
  //   day: '2-digit',
  //   month: 'long',
  //   year: 'numeric'
  // })
  // return date.toISOString().split("T")[0];

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

function toISO(date?: Date) {
  return date ? date.toISOString().split("T")[0] : "";
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }

  return !Number.isNaN(date.getTime());
}

const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  notRequired,
  placeholder,
  dateRange,
  index,
  endDate,
  onSelectEndDate,
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

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [defaultEndDate, setDefaultEndDate] = useState<string | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  console.log(date, "date");
  console.log(value, "value");
  console.log(month, "month");
  console.log(defaultEndDate, "defaultEndDate");

  const getDateValue = (value: unknown): Date | undefined => {
    if (value instanceof Date && isValid(value)) {
      return value;
    }
    if (typeof value === "string") {
      const parsed = parseISO(value);
      return isValid(parsed) ? parsed : undefined;
    }
    return undefined;
  };

  const selectedDate = getDateValue(field.value);

  // const displayValue = selectedDate
  //   ? format(selectedDate, "dd-MM-yyyy")
  //   : placeholder || "Pick a date";

  const _displayValue = selectedDate
    ? format(selectedDate, "dd-MM-yyyy")
    : // : range?.from && range?.to
      //   ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
      range?.from && range?.to
      ? `${format(range.from, "dd-MM-yyyy")} - ${format(range.to, "dd-MM-yyyy")}`
      : dateRange
        ? `${placeholder} - ${placeholder}`
        : placeholder || "Pick a date";

  const handleSelect = (
    value?: Date | undefined,
    range?: DateRange | undefined,
  ) => {
    const formatDate = (date?: Date) =>
      date ? date.toISOString().split("T")[0] : "";

    if (range) {
      setDefaultEndDate(null);
      setRange(range);
      // const start = range.from?.toLocaleDateString();
      // const end = range.to?.toLocaleDateString();
      const start = formatDate(range.from);
      const end = formatDate(range.to);
      field.onChange(start);
      setDefaultEndDate(end);
      onSelectEndDate?.(index ?? 0, end ?? "");
    }

    if (value) {
      field.onChange(value);
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  React.useEffect(() => {
    if (endDate) {
      const res = endDate(index ?? 0);
      setDefaultEndDate(res ?? null);
    }
  }, [index, endDate]);

  return (
    <div className="relative space-y-1">
      {label && (
        <label
          htmlFor={label}
          className={`block text-sm font-medium text-foreground`}
        >
          {label}
          {notRequired !== "true" && (
            <span className="text-destructive">*</span>
          )}
        </label>
      )}

      <div className="relative border border-[#BDBDBD] rounded-full items-center flex gap-2 peer-focus-within:border-chart-1">
        <Input
          id="date"
          value={value}
          placeholder={placeholder}
          className="w-full"
          // inputClassName="border-none focus-visible:border-chart-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          inputClassName="peer border-none"
          onChange={(e) => {
            const date = new Date(e.target.value);

            setValue(e.target.value);

            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              id={name.toString()}
              // variant="outline"
              className={cn(
                // "flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm justify-start text-left font-normal",
                "flex items-center justify-center hover:bg-transparent size-8 rounded-full bg-background text-base ring-offset-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-normal",
                !field.value && "text-muted-foreground",
              )}
              {...props}
            >
              {/* {`${displayValue}${defaultEndDate ? ` - ${defaultEndDate}` : ""}`} */}
              <CalendarIcon className="ml-auto mr-2 size-4 text-chart-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            forceMount
            className="z-9999 relative right-10 top-2 w-auto p-0"
            align="start"
          >
            {dateRange ? (
              <Calendar
                mode="range"
                selected={range}
                onSelect={(range) => handleSelect(undefined, range)}
                // onSelect={range => {
                //   setRange(range)
                // }}
                initialFocus
              />
            ) : (
              // <Calendar
              //   mode="single"
              //   selected={selectedDate}
              //   onSelect={(value) => handleSelect(value)}
              //   initialFocus
              // />
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  field.onChange(toISO(date));
                  setOpen(false);
                }}
              />
            )}
          </PopoverContent>
        </Popover>
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormDatePicker;
