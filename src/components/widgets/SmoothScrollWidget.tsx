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
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!gsap || !ScrollTrigger) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const initialHash = window.location.hash;
    if (initialHash) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      );
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

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
      if (wheelHandlerRef.current) {
        window.removeEventListener("wheel", wheelHandlerRef.current, {
          capture: true,
        } as EventListenerOptions);
        wheelHandlerRef.current = null;
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

      const handleWheel = (e: WheelEvent) => {
        let target = e.target as HTMLElement;

        while (target && target !== document.body) {
          if (target.hasAttribute("data-lenis-prevent")) {
            e.stopPropagation();
            return;
          }

          const styles = window.getComputedStyle(target);
          if (styles.overflowY === "auto" || styles.overflowY === "scroll") {
            const isScrollable = target.scrollHeight > target.clientHeight;
            if (isScrollable) {
              const canScrollUp = target.scrollTop > 0;
              const canScrollDown =
                target.scrollTop < target.scrollHeight - target.clientHeight;

              if (
                (e.deltaY < 0 && canScrollUp) ||
                (e.deltaY > 0 && canScrollDown)
              ) {
                e.stopPropagation();
                return;
              }
            }
          }

          target = target.parentElement as HTMLElement;
        }
      };

      wheelHandlerRef.current = handleWheel;
      window.addEventListener("wheel", handleWheel, {
        passive: false,
        capture: true,
      });

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

      const resetScroll = () => {
        if (window.location.hash) {
          window.history.replaceState(
            window.history.state,
            "",
            window.location.pathname + window.location.search,
          );
        }
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
      };

      requestAnimationFrame(() => {
        resetScroll();
        setTimeout(() => {
          resetScroll();
          if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
            try {
              ScrollTrigger.refresh();
            } catch (_error) {}
          }
        }, 100);
        setTimeout(() => {
          resetScroll();
        }, 300);
        setTimeout(() => {
          resetScroll();
        }, 500);
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
