"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FacultySection() {
   const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faculty-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate faculty cards with stagger
      gsap.from(".faculty-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const facultyMembers = [
    {
      name: "Dr. John Doe",
      designation: "Head of Photography",
      image: "/mihir-hardikar.png",
      className: "",
      description:
        "Mihir Hardikar is a Food and Beverage photographer based in Mumbai. Mihir has worked with national and international brands such as Domino’s Pizza, Cure.Fit, Mother Dairy, Nestle Bangladesh, Haldirams.",
    },
    {
      name: "Dr. Jane Smith",
      designation: "Head of Photography",
      image: "/mihir-hardikar.png",
      className: "py-40",
      description:
        "Mihir Hardikar is a Food and Beverage photographer based in Mumbai. Mihir has worked with national and international brands such as Domino’s Pizza, Cure.Fit, Mother Dairy, Nestle Bangladesh, Haldirams.",
    },
    {
      name: "Dr. John Doe",
      designation: "Head of Photography",
      image: "/Rectangle 10.png",
      className: "py-30",
      description:
        "Mihir Hardikar is a Food and Beverage photographer based in Mumbai. Mihir has worked with national and international brands such as Domino’s Pizza, Cure.Fit, Mother Dairy, Nestle Bangladesh, Haldirams.",
    },
    {
      name: "Dr. Jane Smith",
      designation: "Head of Photography",
      image: "/mihir-hardikar.png",
      className: "py-15",
      description:
        "Mihir Hardikar is a Food and Beverage photographer based in Mumbai. Mihir has worked with national and international brands such as Domino’s Pizza, Cure.Fit, Mother Dairy, Nestle Bangladesh, Haldirams.",
    },
    {
      name: "Dr. John Doe",
      designation: "Head of Photography",
      image: "/Rectangle 10.png",
      className: "py-25",
      description:
        "Mihir Hardikar is a Food and Beverage photographer based in Mumbai. Mihir has worked with national and international brands such as Domino’s Pizza, Cure.Fit, Mother Dairy, Nestle Bangladesh, Haldirams.",
    },
    {
      name: "Dr. Jane Smith",
      designation: "Head of Photography",
      image: "/mihir-hardikar.png",
      className: "py-10",
      description:
        "Mihir Hardikar is a Food and Beverage photographer based in Mumbai. Mihir has worked with national and international brands such as Domino’s Pizza, Cure.Fit, Mother Dairy, Nestle Bangladesh, Haldirams.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 px-6 md:px-12 lg:px-56 font-urbanist text-start md:text-center"
    >
      <div className="mb-12 faculty-heading">
        <h2 className="text-[28px] md:text-[22px] lg:text-[62px] font-regular font-[400] text-black">
          Faculty
        </h2>
        <h1 className="text-3xl md:text-[30px] lg:text-[32px] lg:px-18 font-regular font-[500] mb-2 text-black leading-tight">
          Lorem ipsum dolor{" "}
          <span className="text-[#E97451]">sit amet, consectetur</span>
        </h1>
        <p className="text-black text-sm md:text-[14.5px]  font-regular font-[400] lg:px-40 mx-auto mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </p>
        <button
          className="flex bg-[#E97451] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#ff984f] transition md:mx-auto md:justify-center justify-start">
          <span className="text-[14px] sm:text-[14px] md:text-[10px] lg:text-[13px] fond-bold font-[600]">Know Your Guides</span>
          <Image
            src="/arrow-right.png"
            alt="arrow_right"
            width={18}
            height={18}
            className="ml-2"
          />
        </button>
      </div>

      {/* ---------- Faculty Cards ---------- */}
      <div className="flex flex-wrap justify-center gap-8" id="default-carousel" data-carousel="slide">
       
        {facultyMembers.map((member, index) => (
          <div
            key={index}
            className={`
              faculty-card max-w-[200px] max-h-[450px] relative w-full h-full group overflow-hidden font-urbanist
              ${member.className}
              ${index >= 4 ? "md:hidden" : ""}
            `}
          >
            {/* Front Image */}
            <div className="relative w-full h-[240px]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-1500 group-hover:scale-0"
              />
            </div>

            <div className="py-4 text-start">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 transition-transform duration-1500 group-hover:scale-0">
                {member.name}
              </h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#E9745133] text-black flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-1500">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover py-4 px-4 max-h-[240px] w-full"
              />
              <h3 className="text-start text-lg font-semibold text-gray-900 px-4">
                {member.name}
              </h3>
              <p className="text-xs text-start text-black leading-snug py-2 px-4">
                {member.description}
              </p>
              <div className="flex items-center gap-2 cursor-pointer py-1 px-4">
                <button className="hidden lg:flex items-center h-[32px] bg-[#E97451] mb-2 text-white text-xs px-4 py-1 rounded-full hover:bg-[#ff984f] transition">
                  <span className="font-bold text-[11px]">Know more</span>
                  <Image
                    src="/arrow-right.png"
                    alt="right"
                    width={18}
                    height={18}
                    className="ml-2"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
