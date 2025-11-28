"use client"

import { Fragment, useRef, useState } from "react"
import FormStep1 from "@/components/sections/admission-form/_steps/formStep1"
import FormStep2 from "@/components/sections/admission-form/_steps/formStep2"
import FormStep3 from "@/components/sections/admission-form/_steps/formStep3"
import { StepIndicator } from "./step-indicator"
import { ApplicationFormBg } from "@/helpers/ImageHelper";
import ScrollWidget from "@/components/widgets/ScrollWidget"
import ReviewForm from "@/components/sections/admission-form/preview-form";


export function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

    const handleNextStep = () => {
        // const isValid = await methods.trigger()
        // if (isValid) {
        //     setCurrentStep((prev) => Math.min(prev + 1, 3))
        // }
        setCurrentStep((prev) => Math.min(prev + 1, 3))
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handlePreview = () => {
        setIsReviewOpen(true);
    }


    if (isReviewOpen) {
        return <ReviewForm onClose={() => setIsReviewOpen(false)} />
    }



    return (
        <Fragment>
            <section className="flex">
                {/* Left Sidebar */}
                <div className="hidden lg:flex w-1/4 p-12" style={{ backgroundImage: `url(${ApplicationFormBg.src})`, backgroundSize: "cover", backgroundPosition: "bottom" }}>
                    <h1 className="text-3xl font-light text-white leading-tight">
                        PG Diploma in Documentary & Corporate Filmmaking 2026-2027 - Online Application
                    </h1>
                </div>

                {/* Right Form Content */}
                <div className="w-full lg:w-3/4 bg-white p-8 lg:p-12 lg:pr-40 ">
                    <div className=" mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-4xl text-[#E97451] mb-2 font-urbanist">Application Form</h2>
                            <p className="text-gray-600">
                                Do go ahead and complete the application process as detailed below.
                                Use the unique URL sent to your email if you need to check the mail
                                in inbox/spam folder to complete at a later date.
                            </p>
                        </div>

                        {/* Step Indicator */}
                        <StepIndicator currentStep={currentStep} totalSteps={3} />

                        {/* Form Steps */}
                        <div>
                            {currentStep === 1 && (
                                <ScrollWidget
                                >
                                    <FormStep1 onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
                                </ScrollWidget>
                            )}

                            {currentStep === 2 && (
                                <ScrollWidget animation="slideLeft"
                                >
                                    <FormStep2 onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
                                </ScrollWidget>
                            )}

                            {currentStep === 3 && (
                                <ScrollWidget animation="slideLeft"
                                >
                                    {/* <FormStep3 /> */}
                                    <FormStep3 onPrevStep={handlePrevStep} onPreview={handlePreview} />
                                </ScrollWidget>
                            )}
                        </div>
                    </div>
                </div>
            </section>
             
             <div className="w-full hidden justify-end">
            <button className=" bg-gray-400 px-4 py-2 rounded-md" onClick={() => handlePreview()}>Preview</button>
            </div>


        </Fragment>
    )
}
