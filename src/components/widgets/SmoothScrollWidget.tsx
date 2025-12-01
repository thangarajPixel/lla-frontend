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
  const rafIdRef = useRef<number | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!gsap || !ScrollTrigger) return;

    window.scrollTo(0, 0);

    const checkIsMobile = () => {
      if (typeof window === "undefined") return false;
      return window.innerWidth <= 768;
    };

    const cleanupSmoothScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };

    const initSmoothScroll = () => {
      if (typeof window === "undefined") return;
      if (!gsap || !ScrollTrigger) return;

      cleanupSmoothScroll();

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

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

      const raf = (time: number) => {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      };

      rafIdRef.current = requestAnimationFrame(raf);

      requestAnimationFrame(() => {
        lenis.scrollTo(0, { immediate: true });
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

      observerRef.current = observer;
    };

    const handleResize = () => {
      const isMobile = checkIsMobile();

      if (isMobile !== isMobileRef.current) {
        isMobileRef.current = isMobile;

        if (isMobile) {
          cleanupSmoothScroll();
          requestAnimationFrame(() => {
            setTimeout(() => {
              if (
                ScrollTrigger &&
                typeof ScrollTrigger.refresh === "function"
              ) {
                try {
                  ScrollTrigger.refresh();
                } catch (_error) {}
              }
            }, 100);
          });
        } else {
          initSmoothScroll();
        }
      }
    };

    isMobileRef.current = checkIsMobile();

    if (isMobileRef.current) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
            try {
              ScrollTrigger.refresh();
            } catch (_error) {}
          }
        }, 100);
      });
    } else {
      initSmoothScroll();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupSmoothScroll();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollWidget;
