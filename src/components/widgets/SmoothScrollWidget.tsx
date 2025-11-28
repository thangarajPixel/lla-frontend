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
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const targetId = hash.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            lenis.scrollTo(offsetPosition, {
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
            });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    const handleHashChange = () => {
      handleHashNavigation();
    };

    window.addEventListener("hashchange", handleHashChange);

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
          try {
            ScrollTrigger.refresh();
          } catch (_error) {}
        }
        handleHashNavigation();
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
      window.removeEventListener("hashchange", handleHashChange);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollWidget;
