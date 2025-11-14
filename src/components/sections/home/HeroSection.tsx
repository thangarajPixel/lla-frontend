"use client";

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
          <div className="flex items-center justify-center mt-[120px]">
            <ContainerWidget>
              <h1 className="font-urbanist font-normal mb-6 text-white text-4xl sm:max-w-[850px] sm:text-[60px] sm:leading-[60px] lg:text-[90px] lg:leading-[90px] 3xl:text-[112px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
              </h1>
            </ContainerWidget>
          </div>
        </ScrollWidget>
      </ParallaxWidget>
    </section>
  );
};

export default HeroSection;
