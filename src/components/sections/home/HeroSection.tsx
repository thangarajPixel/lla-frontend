"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <ParallaxWidget speed={0.5} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/dummy.mp4" type="video/mp4" />
        </video>
      </ParallaxWidget>
      <div className="absolute inset-0 bg-black/40" />
      <ParallaxWidget
        speed={-1.5}
        className="relative z-10 mix-blend-difference"
      >
        <ScrollWidget>
          <div className="flex items-center justify-center mt-44 md:mt-[200px] xl:mt-[170px] 2xl:mt-[160px] 3xl:mt-[170px]">
            <ContainerWidget>
              <h1
                className="font-urbanist font-normal mb-6 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[85px] 3xl:text-[112px] max-w-[850] 3xl:max-w-[1120px] leading-relaxed xl:leading-[1.2] 2xl:leading-[1.15] 3xl:leading-[1.1]"
              >
               Where Light Inspires the Art of Seeing
              </h1>
            </ContainerWidget>
          </div>
        </ScrollWidget>
      </ParallaxWidget>
    </section>
  );
};

export default HeroSection;
