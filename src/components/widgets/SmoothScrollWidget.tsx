"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SmoothScrollWidget = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!gsap || !ScrollTrigger) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      if (ScrollTrigger && typeof ScrollTrigger.update === "function") {
        try {
          ScrollTrigger.update();
        } catch (_error) {}
      }
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
          try {
            ScrollTrigger.refresh();
          } catch (_error) {}
        }
      }, 100);
    });

    const observer = new MutationObserver(() => {
      const isScrollLocked =
        document.body.hasAttribute("data-scroll-locked") ||
        document.body.style.overflow === "hidden";

      if (isScrollLocked) lenis.stop();
      else lenis.start();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked", "style"],
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollWidget;
