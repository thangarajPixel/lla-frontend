"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ParallaxWidgetProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  start?: string;
  end?: string;
  scrub?: number;
}

const ParallaxWidget = ({
  children,
  className = "",
  speed = 1,
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
}: ParallaxWidgetProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!elementRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        const progress = self.progress;
        const yPos = (progress - 0.5) * 200 * speed;
        gsap.set(elementRef.current, {
          y: yPos,
          ease: "power2.out",
        });
      },
    });

    return () => {
      if (scrollTrigger) scrollTrigger.kill();
    };
  }, [speed, start, end, scrub]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxWidget;
