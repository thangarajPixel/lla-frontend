import { Fragment } from "react/jsx-runtime";
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

  const total_Steps = 3;

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={`step-label-${stepNum}`}
              className={`ml-1 mb-5 text-sm font-medium ${
                isActive
                  ? "text-[#E97451]"
                  : isCompleted
                    ? "text-gray-900"
                    : "text-gray-500"
              }`}
            >
              {`Step ${stepNum}`}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={`step-${index + 1}`} className="flex items-center">
            <div
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                index + 1 <= currentStep ? "bg-green-500" : "bg-primary/30",
                index + 1 < currentStep && "bg-green-500",
              )}
            />
            {index < total_Steps - 1 && (
              <div
                className={cn(
                  "w-32 xs:w-48 sm:w-60 md:w-80 min-w-[900px]:w-96 lg:w-80 h-0.5",
                  index + 1 < currentStep ? "bg-green-500" : "bg-primary/30",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={step}
              className={`ml-3 mt-5 hidden sm:block text-sm font-medium ${
                isActive
                  ? "text-[#E97451]"
                  : isCompleted
                    ? "text-gray-900"
                    : "text-gray-500"
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
