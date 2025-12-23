"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { getCourseBySlug } from "@/app/api/server";
import { StepIndicator } from "@/components/sections/admission-form/_components/step-indicator";
import { ApplicationFormBg } from "@/helpers/ImageHelper";
import { useCourseStore } from "@/store/zustand";

const AdmissionFormLayout = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [courseName, setCourseName] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const step = pathName.split("/").pop();
  const selectedCourseName = useCourseStore((state) => state.courseName);

  const searchParams = useSearchParams();
  const course = searchParams.get("course");

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

  useEffect(() => {
    const getCourseName = async () => {
      const res = await getCourseBySlug((course as string) ?? "");
      if (res?.data) {
        setCourseName(res?.data?.courseList?.Name);
      }
    };
    // getCourseName();

    if (course) {
      getCourseName();
    }
  }, [course]);

  if (step === "preview" || step === "success" || step === "failed") {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto mt-2">
      <section className="flex min-h-screen">
        <div
          className="hidden h-screen lg:flex w-[35%] p-12 justify-center"
          style={{
            backgroundImage: `url(${ApplicationFormBg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <h1 className="text-[32px] xl:text-[40px] 3xl:text-[56px] 3xl:mt-10 text-white leading-tight font-urbanist">
            {courseName || selectedCourseName}
          </h1>
        </div>

        <div className="w-full lg:w-[65%] bg-white px-4 sm:px-8 py-12 lg:pr-36 3xl:pr-80 ">
          <div
            ref={scrollContainerRef}
            className=" mx-auto h-[calc(100vh-6rem)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            data-lenis-prevent
          >
            <div ref={headerRef} className="mb-8">
              <h1 className="text-[32px] xl:text-[40px] 3xl:text-[56px] font-urbanist leading-tight lg:hidden mb-6">
                {courseName || selectedCourseName}
              </h1>
              <h2 className="text-2xl 3xl:text-[40px] text-[#E97451] mb-4 font-urbanist">
                Application Form
              </h2>
              <p className="text-black text-base xl:text-sm 3xl:text-lg font-mulish">
                Do go ahead and complete the application process as detailed
                below. Use the unique URL sent to your email if you need to
                check the mail in inbox/spam folder to complete at a later date.
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
