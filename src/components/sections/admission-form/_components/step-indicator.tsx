import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    "Personal Details",
    "Education Details & Work Experience",
    "Upload Your Portfolio",
  ];

  return (
    <section className="mx-auto px-2">
      <div className="flex items-center justify-between md:px-5">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={`step-label-${stepNum}`}
              className={`ml-1 mb-2 text-base xl:text-sm 2xl:text-base font-medium ${
                isActive
                  ? "text-[#E97451]"
                  : isCompleted
                    ? "text-black"
                    : "text-gray-500"
              }`}
            >
              {`Step ${stepNum}`}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-start w-full md:px-10">
        {Array.from({ length: 5 }).map((_, index) => {
          const isCircle = index % 2 === 0;
          const circleNumber = Math.floor(index / 2) + 1;

          let isActive = false;

          if (isCircle) {
            isActive = currentStep >= circleNumber;
          } else {
            isActive = currentStep > circleNumber;
          }

          return (
            <section
              key={`step-indicator-${index + 1}`}
              className={cn(
                isCircle ? "h-4 w-4 rounded-full" : "h-1 flex-1",
                isActive ? "bg-[#02B752]" : "bg-primary/30",
              )}
            />
          );
        })}
      </div>

      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={step}
              className={cn(
                "mt-3 text-sm sm:text-base xl:text-sm 2xl:text-base max-w-40 sm:max-w-48",
                isActive
                  ? "text-[#E97451]"
                  : isCompleted
                    ? "text-black"
                    : "text-gray-500",
                index === 0
                  ? "text-left"
                  : index === steps.length - 1
                    ? "text-right"
                    : "text-center ml-4",
              )}
            >
              {step}
            </div>
          );
        })}
      </div>
    </section>
  );
}
