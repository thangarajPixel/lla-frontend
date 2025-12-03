"use client";

import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DISPLAY_FORMAT = "dd-MM-yyyy";

const STORE_FORMAT = "yyyy-MM-dd";

function formatDisplay(date: Date | undefined) {
  if (!date) return "";
  return format(date, DISPLAY_FORMAT);
}

function parseDisplay(text: string): Date | null {
  const date = parse(text, DISPLAY_FORMAT, new Date());
  return Number.isNaN(date.getTime()) ? null : date;
}

type FormDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

const FormDatePickerWithInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = DISPLAY_FORMAT,
  disabled = false,
  className,
  required,
}: FormDatePickerProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const parsedStoredDate: Date | undefined = value
    ? parse(value as string, STORE_FORMAT, new Date())
    : undefined;

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(parsedStoredDate);

  const [inputValue, setInputValue] = useState(formatDisplay(parsedStoredDate));

  const id = `date-${name.replace(/\./g, "-")}`;

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label className="px-1 gap-0" htmlFor={id}>
          {label}
          {required && <span className="text-chart-1">*</span>}
        </Label>
      )}

      <div className="relative flex gap-2">
        <Input
          id={id}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          className={`${className} bg-background pr-0 w-full`}
          inputClassName="w-full flex-1"
          onChange={(e) => {
            const text = e.target.value;
            setInputValue(text);

            const parsed = parseDisplay(text);
            if (parsed) {
              onChange(format(parsed, STORE_FORMAT));
              setMonth(parsed);
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
              variant="ghost"
              className="absolute top-1/2 right-3 size-6 -translate-y-1/2"
              disabled={disabled}
            >
              <CalendarIcon className="size-3.5 text-chart-1" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={parsedStoredDate}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (!date) return;

                onChange(format(date, STORE_FORMAT));

                setInputValue(format(date, DISPLAY_FORMAT));

                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormDatePickerWithInput;
