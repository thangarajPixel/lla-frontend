"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { getCourseBySlug } from "@/app/api/server";
import { StepIndicator } from "@/components/sections/admission-form/_components/step-indicator";
import { ApplicationFormBg } from "@/helpers/ImageHelper";
import { cn } from "@/lib/utils";
import { useCourseStore } from "@/store/zustand";

function AdmissionFormLayoutContent({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [courseName, setCourseName] = useState<string>("");
  const pathName = usePathname();
  const step = pathName.split("/").pop();
  const selectedCourseName = useCourseStore((state) => state.courseName);
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

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
        <aside
          className={cn(
            "hidden lg:flex flex-col justify-start p-12 text-white",
            "lg:w-[35%] 3xl:w-181.25",
            "sticky top-0 h-screen",
            currentStep === 1 && "lg:w-[25%]",
          )}
          style={{
            backgroundImage: `url(${ApplicationFormBg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <h1
            className={cn(
              "text-[32px] md:text-[28px] lg:text-[26px] xl:text-[36px] 2xl:text-[40px] 3xl:text-[56px] 2xl:mt-6 3xl:mt-10 text-white leading-tight font-urbanist mt-5",
            )}
          >
            {selectedCourseName}
          </h1>
        </aside>
        <main
          className={cn(
            "w-full bg-white px-4 sm:px-8 py-6",
            "lg:w-[65%] 3xl:flex-1",
            "lg:pr-24 xl:pr-52 2xl:pr-62 3xl:pr-76",
            currentStep === 1 && "lg:w-[75%] lg:pr-24",
          )}
        >
          <div>
            <div className="mb-8 mt-4 2xl:mt-12">
              <h1 className="text-[32px] md:text-[28px] xl:text-[40px] 3xl:text-[56px] font-urbanist leading-tight lg:hidden mb-6">
                {selectedCourseName}
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
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default function AdmissionFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <AdmissionFormLayoutContent>{children}</AdmissionFormLayoutContent>
    </Suspense>
  );
}
