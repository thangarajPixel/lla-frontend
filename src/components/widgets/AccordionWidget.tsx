"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import HTMLWidget from "./HTMLWidget";

export type AccordionItemData = {
  value: string;
  title: string | ReactNode;
  content: string | ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
};

export type AccordionWidgetProps = {
  items?: AccordionItemData[];
  children?: ReactNode;
  className?: string;
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  columns?: 1 | 2;
  layout?: "grid" | "flex";
};

const AccordionWidget = ({
  items,
  children,
  className,
  type = "single",
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  columns = 1,
}: AccordionWidgetProps) => {
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(
    defaultValue || (type === "single" ? undefined : [])
  );

  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = (newValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const accordionProps =
    type === "single"
      ? {
          type: "single" as const,
          collapsible,
          value: currentValue as string | undefined,
          onValueChange: handleValueChange as ((value: string) => void) | undefined,
        }
      : {
          type: "multiple" as const,
          value: currentValue as string[] | undefined,
          onValueChange: handleValueChange as
            | ((value: string[]) => void)
            | undefined,
        };

  const accordionContent = items
    ? items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger
            className={cn(
              "text-black transition-colors hover:no-underline data-[state=open]:text-[#E97451] [&>svg]:text-[#E97451] [&>svg]:transition-transform",
              item.triggerClassName,
            )}
          >
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={cn("text-black", item.contentClassName)}>
            <HTMLWidget content={item.content as string} tag="div" />
          </AccordionContent>
        </AccordionItem>
      ))
    : children;

  if (columns === 2 && items) {
    const midPoint = Math.ceil(items.length / 2);
    const leftColumnItems = items.slice(0, midPoint);
    const rightColumnItems = items.slice(midPoint);

    return (
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 md:gap-6", className)}
      >
        <div className="w-full">
          <Accordion {...accordionProps} className="w-full">
            {leftColumnItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger
                  className={cn(
                    "text-black bg-white font-urbanist cursor-pointer 3xl:text-[24px] text-[17px] xss:text-[20px] px-4 py-3 data-[state=closed]:mb-5 transition-all duration-200 hover:no-underline data-[state=open]:text-[#E97451] [&>svg]:text-[#E97451] [&>svg]:transition-transform",
                    item.triggerClassName,
                  )}
                >
                  {item.title}
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    "text-black bg-white text-[16px] mb-5 px-4 pb-3 pt-1",
                    item.contentClassName,
                  )}
                >
                  <HTMLWidget content={item.content as string} tag="div" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="w-full">
          <Accordion {...accordionProps} className="w-full">
            {rightColumnItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger
                  className={cn(
                    "text-black bg-white font-urbanist cursor-pointer xss:text-[20px] 3xl:text-[24px] text-[17px] px-4 py-3 data-[state=closed]:mb-5 transition-all duration-200 hover:no-underline data-[state=open]:text-[#E97451] [&>svg]:text-[#E97451] [&>svg]:transition-transform",
                    item.triggerClassName,
                  )}
                >
                  {item.title}
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    "text-black bg-white text-[16px] mb-5 px-4 pb-3 pt-1",
                    item.contentClassName,
                  )}
                >
                  <HTMLWidget content={item.content as string} tag="div" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }

  return (
    <Accordion
      {...accordionProps}
      className={cn(`font-urbanist`, columns === 1 ? className : undefined)}
    >
      {accordionContent}
    </Accordion>
  );
};

export { AccordionItem, AccordionTrigger, AccordionContent };
export default AccordionWidget;
