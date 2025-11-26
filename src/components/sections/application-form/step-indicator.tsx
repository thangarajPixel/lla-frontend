import { cn } from "@/lib/utils"
import { useState } from "react"
import { Fragment } from "react/jsx-runtime"

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    const steps = ["Personal Details", "Education Details & Work Experience", "Upload Your Portfolio"]
    const [step, setStep] = useState<number>(0)
    const total_Steps = 3

    return (
        <Fragment>
            <div className="hidden items-center justify-between">
                {steps.map((step, index) => {
                    const stepNum = index + 1
                    const isActive = stepNum === currentStep
                    const isCompleted = stepNum < currentStep

                    return (
                        <div key={step} className="flex items-center flex-1">
                            <div className="flex items-center flex-1">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${isActive || isCompleted ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {isCompleted ? "✓" : stepNum}
                                </div>
                                <div
                                    className={`ml-3 hidden sm:block text-sm font-medium ${isActive ? "text-red-600" : isCompleted ? "text-gray-900" : "text-gray-500"
                                        }`}
                                >
                                    {step}
                                </div>
                            </div>
                            {stepNum < totalSteps && (
                                <div className={`h-1 flex-1 mx-2 transition-all ${isCompleted ? "bg-red-600" : "bg-gray-200"}`} />
                            )}
                        </div>
                    )
                })}
            </div>


            <div className="flex items-center justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNum = index + 1
                    const isActive = stepNum === currentStep
                    const isCompleted = stepNum < currentStep

                    return (
                        <div
                            key={index}
                            className={`ml-1 mb-5 text-sm font-medium ${isActive ? "text-red-600" : isCompleted ? "text-gray-900" : "text-gray-500"
                                }`}
                        >
                            {`Step ${stepNum}`}
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center justify-center">

                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={cn(
                                "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                                index + 1 <= currentStep ? "bg-green-500" : "bg-primary/30",
                                index + 1 < currentStep && "bg-green-500"
                            )}
                        />
                        {index < total_Steps - 1 && (
                            <div
                                className={cn(
                                    "w-32 md:w-96 h-0.5",
                                    index + 1 < currentStep ? "bg-green-500" : "bg-primary/30"
                                )}
                            />
                        )}
                    </div>
                ))}

            </div>

            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const stepNum = index + 1
                    const isActive = stepNum === currentStep
                    const isCompleted = stepNum < currentStep

                    return (
                        <div
                            key={step}
                            className={`ml-3 mt-5 hidden sm:block text-sm font-medium ${isActive ? "text-red-600" : isCompleted ? "text-gray-900" : "text-gray-500"
                                }`}
                        >
                            {step}
                        </div>
                    )
                })}
            </div>
        </Fragment>

    )
}
