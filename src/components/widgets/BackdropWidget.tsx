"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface BackdropWidgetProps {
  className?: string;
  scrollThreshold?: number;
  position?: Position;
}

export default function BackdropWidget({
  className,
  scrollThreshold = 300,
  position = "bottom-right",
}: BackdropWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const positionClasses: Record<Position, string> = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed cursor-pointer  z-50 p-3 rounded-full bg-[#E97451] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl",
        "flex items-center justify-center",
        positionClasses[position],
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
        className,
      )}
      aria-label="Scroll to top"
      type="button"
    >
      <ArrowUp className="w-6 h-6 text-white pointer-events-none" />
    </button>
  );
}
