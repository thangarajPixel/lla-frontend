"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ParallaxWidgetProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  start?: string;
  end?: string;
  scrub?: number;
};

const ParallaxWidget = ({
  children,
  className = "",
  speed = 1,
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
}: ParallaxWidgetProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!gsap || !ScrollTrigger) return;

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (typeof window === "undefined") return;
    if (!elementRef?.current) return;
    if (!gsap || !ScrollTrigger) return;

    let scrollTrigger: ScrollTrigger | null = null;

    try {
      const endValue = end || "bottom top";
      const startValue = start || "top bottom";

      scrollTrigger = ScrollTrigger.create({
        trigger: elementRef.current,
        start: startValue,
        end: endValue,
        scrub: scrub || 1,
        onUpdate: (self) => {
          if (!self || !elementRef.current) return;
          try {
            const progress = self.progress ?? 0;
            const yPos = (progress - 0.5) * 200 * speed;
            gsap.set(elementRef.current, {
              y: yPos,
              ease: "power2.out",
            });
          } catch (_error) {}
        },
      });

      ScrollTrigger.refresh();
    } catch (_error) {}

    return () => {
      if (scrollTrigger) {
        try {
          scrollTrigger.kill();
        } catch (_error) {}
      }
    };
  }, [isReady, speed, start, end, scrub]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxWidget;
