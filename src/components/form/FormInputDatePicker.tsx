"use client";

import { format, parse } from "date-fns";
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
import ImageWidget from "@/components/widgets/ImageWidget";
import { CalendarIcon } from "@/helpers/ImageHelper";
import { cn } from "@/lib/utils";

const DISPLAY_FORMAT = "dd/MM/yyyy";
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
  } = useController({ name, control });

  const parsedStoredDate: Date | undefined = value
    ? parse(value as string, STORE_FORMAT, new Date())
    : undefined;

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(parsedStoredDate);

  const [inputValue, setInputValue] = useState(formatDisplay(parsedStoredDate));

  const id = `date-${name.replace(/\./g, "/")}`;

  return (
    <div className="w-full space-y-1">
      {label && (
        <Label
          className="block text-base 3xl:text-lg text-black font-mulish"
          htmlFor={id}
        >
          {label}
          {required && <span className="text-chart-1">*</span>}
        </Label>
      )}

      <div className="relative flex gap-2">
        <Input
          type="text"
          id={id}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          className={cn("bg-background pr-0 h-[42px] w-full", className)}
          inputClassName="w-full flex-1"
          maxLength={10}
          onChange={(e) => {
            const input = e.target;
            let value = input.value;
            let cursor = input.selectionStart ?? value.length;

            if (!/^[0-9/]*$/.test(value)) return;

            if (
              value.length > inputValue.length &&
              (cursor === 3 || cursor === 6) &&
              value[cursor - 1] !== "/"
            ) {
              value = value.slice(0, cursor - 1) + "/" + value.slice(cursor - 1);
              cursor += 1;
            }

            if (value.length > 10) return;

            setInputValue(value);

            requestAnimationFrame(() => {
              input.setSelectionRange(cursor, cursor);
            });

            if (value.length === 10) {
              const parsed = parseDisplay(value);

              if (parsed) {
                onChange(format(parsed, STORE_FORMAT));
                setMonth(parsed);
                return;
              }
            }

            onChange("");
            setMonth(undefined);
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
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <ImageWidget
                src={CalendarIcon}
                alt="calendar"
                className="size-6 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0 z-40"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={parsedStoredDate}
              month={month}
              onMonthChange={setMonth}
              disabled={{ after: new Date() }}
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

      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormDatePickerWithInput;
