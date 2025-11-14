"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CampusSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".campus-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".campus-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".campus-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
        ) .from(
        ".campus-btn",
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen  overflow-hidden bg-white"
    >
      <div className="absolute inset-0">
        <div className="hidden md:block w-[100%] h-[100%]">
          <Image
            src="/campus-header.png"
            alt="Campus"
            fill
            priority
          />
        </div>
        <div className="block md:hidden w-full h-full">
          <Image
            src="/campus-header-mobile.png"
            alt="Campus Mobile"
            fill
            priority
          />
        </div>
      </div>
      <div className="relative z-10  px-6 sm:px-10 md:px-14 lg:px-55 py-16 sm:py-20 md:py-24 lg:py-14">
        <div className="max-w-2xl">
          <h1 className="campus-title text-4xl sm:text-4xl md:text-5xl lg:text-[30px] xl:text-[60px] font-regular text-black leading-tight">
            Campus
          </h1>
          <p className="campus-subtitle text-lg sm:text-xl md:text-2xl lg:text-[30px] font-medium max-w-[600px] text-black lg:leading-[48px] mb-3 md:mb-2">
            Lorem ipsum dolor{" "}
            <span className="text-[#E97451]">sit amet, consectetur</span>
          </p>
          <p className="campus-desc text-sm sm:text-base md:text-[13px] lg:text-[14px] text-black leading-relaxed max-w-[550px] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.
          </p>
            <button className="flex items-center justify-center sm:justify-start bg-[#E97451] text-white text-xs sm:text-sm md:text-base px-6 sm:px-8 md:px-4 py-2 md:py-2 rounded-full hover:bg-[#ff984f] transition w-full sm:w-auto">
              <span className="font-regular text-[13px] sm:text-[15px] md:text-[13px] font-urbanist font-[500]">
                Experience the View
              </span>
              <Image
                src="/arrow-right.png"
                alt="arrow right"
                width={18}
                height={18}
                className="ml-2 md:ml-3 w-[16px] md:w-[20px]"
              />
            </button>
         
        </div>
      </div>
    </section>
  );
}
