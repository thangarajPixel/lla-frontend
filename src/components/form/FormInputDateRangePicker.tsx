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

const DISPLAY = "dd/MM/yyyy";
const STORE = "yyyy-MM-dd";

function parseDisplay(text: string): Date | null {
  if (typeof text !== "string" || !text) return null;
  const d = parse(text, DISPLAY, new Date());
  return Number.isNaN(d.getTime()) ? null : d;
}

function toDisplay(date: Date | undefined) {
  return date ? format(date, DISPLAY) : "";
}

type Props<T extends FieldValues> = {
  startName: Path<T>;
  endName: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
};

export default function FormDateRangePickerEditable<T extends FieldValues>({
  startName,
  endName,
  control,
  label,
  required,
}: Props<T>) {
  const {
    field: { value: startValue, onChange: setStart },
    fieldState: { error: startError },
  } = useController({ name: startName, control });

  const {
    field: { value: endValue, onChange: setEnd },
    fieldState: { error: endError },
  } = useController({ name: endName, control });

  const parsedStart = startValue
    ? parse(startValue, STORE, new Date())
    : undefined;

  const parsedEnd = endValue ? parse(endValue, STORE, new Date()) : undefined;

  const [inputValue, setInputValue] = useState(() =>
    parsedStart && parsedEnd
      ? `${toDisplay(parsedStart)} - ${toDisplay(parsedEnd)}`
      : "",
  );

  const [range, setRange] = useState({
    from: parsedStart,
    to: parsedEnd,
  });

  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    let value = input.value;
    let cursor = input.selectionStart ?? value.length;

    if (!/^[0-9/\s-]*$/.test(value)) return;

    if (
      value.length > inputValue.length &&
      (cursor === 3 || cursor === 6 || cursor === 16 || cursor === 19) &&
      value[cursor - 1] !== "/"
    ) {
      value = `${value.slice(0, cursor - 1)}/${value.slice(cursor - 1)}`;
      cursor += 1;
    }

    if (value.length === 10 && !value.includes(" - ")) {
      value += " - ";
      cursor = value.length;
    }

    if (value.length > 23) return;

    setInputValue(value);

    requestAnimationFrame(() => {
      input.setSelectionRange(cursor, cursor);
    });

    const [startStr, endStr] = value.split(" - ").map((v) => v.trim());

    const startParsed = parseDisplay(startStr);
    const endParsed = parseDisplay(endStr);

    if (startParsed) {
      setStart(format(startParsed, STORE));
    } else {
      setStart("");
    }

    if (endParsed) {
      setEnd(format(endParsed, STORE));
    } else {
      setEnd("");
    }

    setRange({
      from: startParsed ?? undefined,
      to: endParsed ?? undefined,
    });
  };

  const handleCalendarSelect = (r: { from?: Date; to?: Date } | undefined) => {
    if (!r) return;

    setRange({
      from: r.from ?? undefined,
      to: r.to ?? undefined,
    });

    if (r.from) {
      setStart(format(r.from, STORE));
    }
    if (r.to) {
      setEnd(format(r.to, STORE));

      if (r.from) {
        setInputValue(`${toDisplay(r.from)} - ${toDisplay(r.to)}`);
      }

      setOpen(false);
    }
  };

  return (
    <div className="space-y-2 w-full">
      {label && (
        <Label className="px-1 text-black text-base 3xl:text-lg">
          {label}
          {required && <span className="text-chart-1">*</span>}
        </Label>
      )}

        <Popover open={open} onOpenChange={setOpen}>
          <div className="relative">
            <Input
              value={inputValue}
              placeholder="DD/MM/YYYY - DD/MM/YYYY"
              onChange={handleInputChange}
              className="pr-0"
              maxLength={23}
            />

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
          </div>

          <PopoverContent className="w-auto p-0 z-40">
            <Calendar
              key={
                range?.from
                  ? `from-${range.from.toISOString()}`
                  : range?.to
                    ? `to-${range.to.toISOString()}`
                    : "default"
              }
              mode="range"
              numberOfMonths={2}
              selected={range}
              onSelect={handleCalendarSelect}
              captionLayout="dropdown"
              disabled={{ after: new Date() }}
              defaultMonth={
                range?.from
                  ? range.from
                  : range?.to
                    ? new Date(range.to.getFullYear(), range.to.getMonth() - 1)
                    : new Date()
              }
            />
          </PopoverContent>
        </Popover>

      {(startError || endError) && (
        <p className="text-sm text-red-500 mt-1">
          {startError?.message || endError?.message}
        </p>
      )}
    </div>
  );
}
