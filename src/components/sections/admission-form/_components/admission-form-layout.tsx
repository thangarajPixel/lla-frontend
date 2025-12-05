"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { StepIndicator } from "@/components/sections/admission-form/_components/step-indicator";
import { ApplicationFormBg } from "@/helpers/ImageHelper";

const AdmissionFormLayout = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const step = pathName.split("/").pop();

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    requestAnimationFrame(() => {
      el.scrollTop = 0;

      setTimeout(() => {
        el.scrollTop = 0;
      }, 50);
    });
  }, []);

  useEffect(() => {
    if (step === "portfolio") {
      setCurrentStep(3);
    } else if (step === "education-details") {
      setCurrentStep(2);
    } else if (step === "personal-details") {
      setCurrentStep(1);
    }
  }, [step]);

  if (step === "preview") {
    return <>{children}</>;
  }

  return (
    <div className="3xl:w-[68vw] mx-auto max-w-[1920px]">
      <section className="flex">
        <div
          className="hidden h-[650px] lg:flex w-1/4 p-12"
          style={{
            backgroundImage: `url(${ApplicationFormBg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <h1 className="text-3xl font-light text-white leading-tight">
            PG Diploma in Documentary & Corporate Filmmaking 2026-2027 - Online
            Application
          </h1>
        </div>

        <div className="w-full lg:w-3/4 bg-white p-8 lg:p-12 lg:pr-30 ">
          <div
            ref={scrollContainerRef}
            className=" mx-auto h-[550px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            data-lenis-prevent
          >
            <div ref={headerRef} className="mb-8">
              <h1 className="text-2xl font-urbanist leading-tight lg:hidden mb-8">
                PG Diploma in Documentary & Corporate Filmmaking 2026-2027 - Online
                Application
              </h1>
              <h2 className="text-2xl md:text-3xl 3xl:text-4xl text-[#E97451] mb-2 font-urbanist">
                Application Form
              </h2>
              <p className="text-gray-600 text-base 3xl:text-lg">
                Do go ahead and complete the application process as detailed
                below. Use the unique URL sent to your email if you need to check
                the mail in inbox/spam folder to complete at a later date.
              </p>
            </div>

            <StepIndicator currentStep={currentStep} totalSteps={3} />

            <div>{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionFormLayout;
