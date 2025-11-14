"use client";

import ContainerWidget from "@/components/widgets/ContainerWidget";

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
      <div className="relative z-10 flex items-center justify-center h-full">
        <ContainerWidget>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Welcome to Our Institution
            </h1>
          </div>
        </ContainerWidget>
      </div>
    </section>
  );
};

export default HeroSection;
