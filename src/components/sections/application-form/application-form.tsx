"use client"

import { Fragment, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Step1PersonalDetails } from "@/components/sections/application-form/_steps/step-1-personal-details"
import { Step2EducationDetails } from "@/components/sections/application-form/_steps/step-2-education-details"
import { Step3Portfolio } from "@/components/sections/application-form/_steps/step-3-portfolio"
import { StepIndicator } from "./step-indicator"
import { AboutBg, ApplicationFormBg } from "@/helpers/ImageHelper";
import ContainerWidget from "@/components/widgets/ContainerWidget"
import ScrollWidget from "@/components/widgets/ScrollWidget"
import { Calendar } from "@/components/ui/calendar"

export type FormData = {
    // Step 1
    fullName: string
    dateOfBirth: string
    mobileNumber: string
    emailAddress: string
    languageRead: boolean
    languageWrite: boolean
    languageSpeak: boolean
    address: string
    district: string
    state: string
    pincode: string

    // Step 2
    education: string
    workExperience: string

    // Step 3
    portfolio: FileList
}

export function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const methods = useForm<FormData>({
        resolver: undefined,
        mode: "all",
        defaultValues: {
            fullName: "",
            dateOfBirth: "",
            mobileNumber: "",
            emailAddress: "",
            languageRead: false,
            languageWrite: false,
            languageSpeak: false,
            address: "",
            district: "",
            state: "",
            pincode: "",
            education: "",
            workExperience: "",
        },
    })

    const handleNextStep = async () => {
        // const isValid = await methods.trigger()
        // if (isValid) {
        //     setCurrentStep((prev) => Math.min(prev + 1, 3))
        // }
        setCurrentStep((prev) => Math.min(prev + 1, 3))
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data)
        alert("Application submitted successfully!")
    }

    return (
        <Fragment>
            <section className="hidden h-[550px]">
                {/* Left Sidebar */}
                <div className="hidden h-[550px] lg:flex w-1/3 p-12" style={{ backgroundImage: `url(${ApplicationFormBg.src})`, backgroundSize: "cover", backgroundPosition: "bottom" }}>
                    <h1 className="text-3xl font-light text-white leading-tight">
                        PG Diploma in Documentary & Corporate Filmmaking 2026-2027 - Online Application
                    </h1>
                </div>

                {/* Right Form Content */}
                <div className="w-full lg:w-2/3 bg-white p-8 lg:p-12 min-h-0">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Form</h2>
                            <p className="text-gray-600">
                                Do go ahead and complete the application process as detailed below.
                                Use the unique URL sent to your email if you need to check the mail
                                in inbox/spam folder to complete at a later date.
                            </p>
                        </div>

                        {/* Step Indicator */}
                        <StepIndicator currentStep={currentStep} totalSteps={3} />

                        {/* Form Content with Animation */}
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8">
                                <AnimatePresence mode="wait">
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Step1PersonalDetails />
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Step2EducationDetails />
                                        </motion.div>
                                    )}

                                    {currentStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Step3Portfolio />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        disabled={currentStep === 1}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </section>

            <section className="flex">
                {/* Left Sidebar */}
                <div className="hidden lg:flex w-1/4 p-12" style={{ backgroundImage: `url(${ApplicationFormBg.src})`, backgroundSize: "cover", backgroundPosition: "bottom" }}>
                    <h1 className="text-3xl font-light text-white leading-tight">
                        PG Diploma in Documentary & Corporate Filmmaking 2026-2027 - Online Application
                    </h1>
                </div>

                {/* Right Form Content */}
                <div className="w-full lg:w-3/4 bg-white p-8 lg:p-12 ">
                    <div className=" mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Form</h2>
                            <p className="text-gray-600">
                                Do go ahead and complete the application process as detailed below.
                                Use the unique URL sent to your email if you need to check the mail
                                in inbox/spam folder to complete at a later date.
                            </p>
                        </div>

                        {/* Step Indicator */}
                        <StepIndicator currentStep={currentStep} totalSteps={3} />

                        {/* Form Content with Animation */}
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8">
                                <div>
                                    {currentStep === 1 && (
                                        <ScrollWidget
                                        >
                                            <Step1PersonalDetails />
                                        </ScrollWidget>
                                    )}

                                    {currentStep === 2 && (
                                        <ScrollWidget animation="slideLeft"
                                        >
                                            <Step2EducationDetails />
                                        </ScrollWidget>
                                    )}

                                    {currentStep === 3 && (
                                        <ScrollWidget animation="slideLeft"
                                        >
                                            <Step3Portfolio />
                                        </ScrollWidget>
                                    )}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        disabled={currentStep === 1}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </section>

        </Fragment>
    )
}
