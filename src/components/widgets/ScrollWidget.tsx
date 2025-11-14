"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollWidgetProps = {
  children: ReactNode;
  className?: string;
  animation?:
    | "fadeIn"
    | "fadeUp"
    | "fadeDown"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "rotate";
  delay?: number;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  once?: boolean;
  markers?: boolean;
};

const ScrollWidget = ({
  children,
  className,
  animation = "fadeUp",
  delay = 0.3,
  duration = 2.5,
  ease = "power3.out",
  start = "top 80%",
  end = "top 20%",
  scrub = false,
  once = true,
  markers = false,
}: ScrollWidgetProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const initialStates: Record<string, gsap.TweenVars> = {
      fadeIn: { opacity: 0 },
      fadeUp: { opacity: 0, y: 80 },
      fadeDown: { opacity: 0, y: -80 },
      slideLeft: { opacity: 0, x: 80 },
      slideRight: { opacity: 0, x: -80 },
      scale: { opacity: 0, scale: 0.8 },
      rotate: { opacity: 0, rotation: -10 },
    };

    gsap.set(element, initialStates[animation] || initialStates.fadeUp);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        once,
        markers,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    const animations: Record<string, gsap.TweenVars> = {
      fadeIn: { opacity: 1, duration, delay, ease },
      fadeUp: { opacity: 1, y: 0, duration, delay, ease },
      fadeDown: { opacity: 1, y: 0, duration, delay, ease },
      slideLeft: { opacity: 1, x: 0, duration, delay, ease },
      slideRight: { opacity: 1, x: 0, duration, delay, ease },
      scale: { opacity: 1, scale: 1, duration, delay, ease },
      rotate: { opacity: 1, rotation: 0, duration, delay, ease },
    };

    tl.to(element, animations[animation] || animations.fadeUp);

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [animation, delay, duration, ease, start, end, scrub, once, markers]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollWidget;
