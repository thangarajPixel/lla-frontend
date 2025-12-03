"use client";

import { useEffect, useRef, useState } from "react";
import FormStep1 from "@/components/sections/admission-form/_steps/formStep1";
import FormStep2 from "@/components/sections/admission-form/_steps/formStep2";
import FormStep3 from "@/components/sections/admission-form/_steps/formStep3";
import ReviewForm from "@/components/sections/admission-form/preview-form";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { ApplicationFormBg } from "@/helpers/ImageHelper";
import { StepIndicator } from "./step-indicator";

export function MultiStepForm({
  admissionData,
}: {
  admissionData?: AdmissionFormData;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [initialMount, setInitialMount] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  const handleNextStep = (step: number) => {
    setCurrentStep(step);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePreview = (preview: boolean) => {
    setIsReviewOpen(preview);
  };

  const handleStepEditChange = (step: number) => {
    setCurrentStep(step);
    setIsReviewOpen(false);
  };

  useEffect(() => {
    if (!admissionData || initialMount) return;

    if (admissionData.step_3) {
      setIsReviewOpen(true);
    } else if (admissionData.step_2) {
      setCurrentStep(3);
    } else if (admissionData.step_1) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }

    setInitialMount(true);
  }, [admissionData, initialMount]);

  if (isReviewOpen) {
    return (
      <ReviewForm
        handleStepEditChange={handleStepEditChange}
        admissionData={admissionData}
        onClose={() => setIsReviewOpen(false)}
      />
    );
  }

  return (
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
          {/* Header */}
          <div ref={headerRef} className="mb-8">
            <h2 className="text-4xl text-[#E97451] mb-2 font-light font-urbanist">
              Application Form
            </h2>
            <p className="text-gray-600 text-base">
              Do go ahead and complete the application process as detailed
              below. Use the unique URL sent to your email if you need to check
              the mail in inbox/spam folder to complete at a later date.
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={3} />

          {/* Form Steps */}
          <div>
            {currentStep === 1 && (
              <ScrollWidget>
                <FormStep1
                  admissionData={admissionData}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                />
              </ScrollWidget>
            )}

            {currentStep === 2 && (
              <ScrollWidget animation="slideLeft">
                <FormStep2
                  admissionData={admissionData}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                />
              </ScrollWidget>
            )}

            {currentStep === 3 && (
              <ScrollWidget animation="slideLeft">
                <FormStep3
                  admissionData={admissionData}
                  onPrevStep={handlePrevStep}
                  onPreview={handlePreview}
                />
              </ScrollWidget>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
