"use client";
import { useEffect,useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundVideo from "./background-video";
gsap.registerPlugin(ScrollTrigger);
export default function HomeContent() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
     useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 80, 
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", 
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
     <BackgroundVideo />
      <section  ref={sectionRef} className="z-10 text-white  px-6 md:px-12 lg:px-52 pt-[130px]">
        <h1 className="hero-title text-[38px] font-400 sm:text-[48px] md:text-[72px] lg:text-[80px] leading-[45px] sm:leading-[55px] md:leading-[85px] lg:leading-[88px] font-urbanist font-regular mix-blend-difference max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[1100px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
        </h1>
      </section>
      </div>
  );
}
