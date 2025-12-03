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

const DISPLAY = "dd-MM-yyyy";
const STORE = "yyyy-MM-dd";

function parseDisplay(text: string): Date | null {
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
  // Hook form fields
  const {
    field: { value: startValue, onChange: setStart },
  } = useController({ name: startName, control });

  const {
    field: { value: endValue, onChange: setEnd },
  } = useController({ name: endName, control });

  const parsedStart = startValue
    ? parse(startValue, STORE, new Date())
    : undefined;

  const parsedEnd = endValue ? parse(endValue, STORE, new Date()) : undefined;

  const [inputValue, setInputValue] = useState(() =>
    parsedStart && parsedEnd
      ? `${toDisplay(parsedStart)} to ${toDisplay(parsedEnd)}`
      : "",
  );

  const [range, setRange] = useState({
    from: parsedStart,
    to: parsedEnd,
  });

  const [open, setOpen] = useState(false);

  const handleInputChange = (text: string) => {
    setInputValue(text);

    const [startStr, endStr] = text.split("to").map((x) => x.trim());

    const startParsed = parseDisplay(startStr);
    const endParsed = parseDisplay(endStr);

    if (startParsed) {
      setStart(format(startParsed, STORE));
    }
    if (endParsed) {
      setEnd(format(endParsed, STORE));
    }

    setRange({
      from: startParsed ?? undefined,
      to: endParsed ?? undefined,
    });
  };

  const handleCalendarSelect = (r: any) => {
    setRange(r);

    if (r?.from) {
      setStart(format(r.from, STORE));
    }
    if (r?.to) {
      setEnd(format(r.to, STORE));

      setInputValue(`${toDisplay(r.from!)} to ${toDisplay(r.to)}`);

      setOpen(false);
    }
  };

  return (
    <div className="space-y-2 w-full">
      {label && (
        <Label>
          {label}
          {required && <span className="text-chart-1">*</span>}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative">
          <Input
            value={inputValue}
            placeholder="DD-MM-YYYY to DD-MM-YYYY"
            onChange={(e) => handleInputChange(e.target.value)}
            className="pr-0"
          />

          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <CalendarIcon className="h-4 w-4 text-chart-1" />
            </Button>
          </PopoverTrigger>
        </div>

        <PopoverContent className="w-auto p-0">
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
    </div>
  );
}
