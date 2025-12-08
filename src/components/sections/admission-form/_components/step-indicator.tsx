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
    <section className="mx-auto">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={`step-label-${stepNum}`}
              className={`ml-1 mb-5 text-sm font-medium ${isActive
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

      <div className="flex items-center justify-between">
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
                  // "w-32 xs:w-48 sm:w-60 md:w-80 min-w-[900px]:w-96 lg:w-64 xl:w-80 2xl:w-[400px] h-0.5",
                  // "w-32 s:w-24 xs:w-48 sm:w-60 lg:w-80 h-0.5 3xl:w-[380px]",
                  "w-32 s:w-24 xs:w-48 sm:w-60 lg:w-80 h-0.5 3xl:w-full flex-1",
                  // "flex flex-1 h-0.5",
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
              className={`ml-3 mt-5 hidden sm:block text-sm font-medium ${isActive
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

      {/* <div className="flex flex-row items-center justify-start">
        <section className="h-4 w-4 bg-red-400"></section>
        <section
          className="h-0.5 w-4 bg-red-400 flex-1"
        >
        </section>
        <section className="h-4 w-4 bg-red-400"></section>
        <section className="h-0.5 bg-red-400 flex-1"></section>
        <section className="h-4 w-4 bg-red-400"></section>
      </div> */}
    </section>

  );
}
