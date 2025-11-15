"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";

const HeroSection = () => {
  const contentArray = [
    "Transform your future through learning experiences.",
    "Join our community where knowledge meets opportunity.",
    "Build your career with expert guidance and mentorship.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -70,
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => {
            setCurrentIndex(
              (prevIndex) => (prevIndex + 1) % contentArray.length,
            );
          },
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentText = contentArray[currentIndex];
    if (textRef.current && currentText) {
      gsap.set(textRef.current, { opacity: 0, y: 70 });
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 2.5,
        delay: 0.3,
        ease: "power3.out",
      });
    }
  }, [currentIndex]);

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
          <div className="flex items-center justify-center mt-40 md:mt-[180px] 2xl:mt-[140px] 3xl:mt-[150px]">
            <ContainerWidget>
              <h1
                ref={textRef}
                className="font-urbanist font-normal mb-6 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[85px] 3xl:text-[112px] max-w-[850] 3xl:max-w-[1120px]"
              >
                {contentArray[currentIndex]}
              </h1>
            </ContainerWidget>
          </div>
        </ScrollWidget>
      </ParallaxWidget>
    </section>
  );
};

export default HeroSection;
