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
    <section className="mx-auto">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={`step-label-${stepNum}`}
              className={`ml-1 mb-5 text-base font-medium ${
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

      <div className="flex items-center justify-start w-full">
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
                isCircle ? "h-4 w-4 rounded-full" : "h-0.5 3xl:h-1 flex-1",
                isActive ? "bg-green-500" : "bg-primary/30",
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
              className={`mt-5 text-xs sm:text-base max-w-12 sm:max-w-fit ${
                isActive
                  ? "text-[#E97451]"
                  : isCompleted
                    ? "text-black"
                    : "text-gray-500"
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>
    </section>
  );
}
