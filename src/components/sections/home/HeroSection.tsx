"use client";

import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/dummy.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      <ScrollWidget className="relative z-10 mix-blend-difference">
        <div className="flex items-center justify-center mt-[120px]">
          <ContainerWidget>
            <h1 className="font-urbanist font-normal mb-6 text-white text-4xl sm:max-w-[850px] sm:text-[60px] sm:leading-[60px] lg:text-[90px] lg:leading-[90px] 3xl:text-[112px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
            </h1>
          </ContainerWidget>
        </div>
      </ScrollWidget>
    </section>
  );
};

export default HeroSection;
