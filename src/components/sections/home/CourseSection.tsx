"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CourseSection() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [".course-title", ".course-text"],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "clamp(top 80%)",
            toggleActions: "play none none reverse",
          },
        }
      );
      const course1Img = ".course1-img";
      const course1Content = ".course1-content > *";
      gsap.fromTo(
        course1Img,
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: course1Img,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        course1Content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: course1Img,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      const course2Img = ".course2-img";
      const course2Content = ".course2-content > *";
      gsap.fromTo(
        course2Img,
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: course2Img,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        course2Content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: course2Img,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="px-4 md:px-20 lg:px-55 pb-20 md:pb-70 pt-10 md:py-15  overflow-hidden"
    >
      <div className="text-left mb-8">
        <h2 className="course-title sm:text-[50px] md:text-[62px] font-regular font-urbanist">
          Courses
        </h2>
        <p className="course-text text-base sm:text-lg md:text-[28px] max-w-[500px] text-black lg:leading-[32px] leading-relaxed fond-bold font-[400]">
          Lorem ipsum dolor sit amet, consectetur{" "}
          <span className="text-orange-500">adipisicing elit</span>
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 md:gap-6 relative">
        {/* ---------- COURSE 1 IMAGE ---------- */}
        <div className="course1-img relative bg-white w-full lg:w-[450px] h-[240px] sm:h-[300px] md:h-[329px] lg:h-[300px] shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <Image
            src="/course-1.png"
            alt="PG Diploma in Professional Photography & Digital Production"
            fill
            className="object-cover"
          />
        </div>

        {/* ---------- COURSE 1 CONTENT (overlay) ---------- */}
        <div className="course1-content relative md:absolute md:max-w-[500px] py-6  lg:py-66 md:py-73 md:-ml-[60px] bg-white md:bg-transparent">
          <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-[28px] md:max-w-[250px] lg:max-w-[320px] font-bold font-urbanist mb-3 font-[400]">
            PG Diploma in Professional Photography & Digital Production
          </h3>
          <p className="text-sm sm:text-base md:text-[14px] lg:text-[14px] md:max-w-[310px] lg:max-w-[350px] text-gray-700 lg:leading-[18px] leading-[4px] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna.
          </p>
          <button className="flex items-center justify-center md:justify-start h-[45px] md:h-[35px] lg:h-[40px] sm:h-[50px] bg-[#E97451] text-white text-xs sm:text-sm px-4 sm:px-8 py-3 rounded-full hover:bg-[#ff984f] transition w-full sm:w-auto">
            <span className="text-[14px] sm:text-[14px] md:text-[10px] lg:text-[13px] fond-bold font-[600]">
              Discover Your Frame
            </span>
            <Image
              src="/arrow-right.png"
              alt="right"
              width={18}
              height={18}
              className="ml-2"
            />
          </button>
        </div>
        {/* ---------- COURSE 2 IMAGE ---------- */}
        <div className="course2-img relative bg-white w-full  h-[240px] sm:h-[300px] md:h-[329px]  lg:h-[309px] mt-10 md:mt-28 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <Image
            src="/coures-2.png"
            alt="PG Diploma in Documentary & Corporate Filmmaking"
            fill
            className="object-cover"
          />
        </div>

        {/* ---------- COURSE 2 CONTENT (overlay) ---------- */}
        <div className="course2-content relative md:absolute md:max-w-[770px] lg:pl-104 lg:py-96 md:pl-75 py-6 md:py-100 bg-white md:bg-transparent md:p-0">
          <h3 className="text-2xl sm:text-2xl md:text-3xl lg:lg:text-[28px] font-bold font-urbanist mb-3 font-[400]">
            PG Diploma in Documentary & Corporate Filmmaking
          </h3>
          <p className="text-sm sm:text-base md:text-[14px] text-gray-700 lg:leading-[18px] leading-[4px]  mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna.
          </p>
          <button className="flex items-center justify-center md:justify-start h-[40px] md:h-[35px] lg:h-[40px] sm:h-[45px] bg-[#E97451] text-white text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-full hover:bg-[#ff984f] transition w-full sm:w-auto">
            <span className="text-[14px] sm:text-[12px] md:text-[10px] lg:text-[13px] fond-bold font-[600]">
              Discover Your Frame
            </span>
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
    </section>
  );
}