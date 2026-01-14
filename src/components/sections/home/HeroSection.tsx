"use client";

import ContainerWidget from "@/components/widgets/ContainerWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { HeroSectionProps } from "./utils/home";

const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <ParallaxWidget speed={0.5} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ contentVisibility: 'auto' }}
        >
          <source src={getS3Url(data?.Video?.url)} type="video/mp4" />
        </video>
      </ParallaxWidget>
      {/* <div className="absolute inset-0 bg-black/40" /> */}
      <ParallaxWidget
        speed={-1.5}
        className="relative z-10 mix-blend-difference"
      >
        <ScrollWidget>
          <div className="flex items-center justify-center mt-64 md:mt-[300px] xl:mt-[250px] 2xl:mt-[240px] 3xl:mt-[300px]">
            <ContainerWidget>
              <h1 className="font-urbanist font-normal mb-6 text-white text-3xl xss:text-[40px] xss:leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[85px] 3xl:text-[112px] max-w-[850] 3xl:max-w-[1120px] leading-relaxed xl:leading-[1.2] 2xl:leading-[1.15] 3xl:leading-[1.1]">
                {data.Title}
              </h1>
            </ContainerWidget>
          </div>
        </ScrollWidget>
      </ParallaxWidget>
    </section>
  );
};

export default HeroSection;
