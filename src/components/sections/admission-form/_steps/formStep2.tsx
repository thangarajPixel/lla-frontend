"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { EducationDetails } from "@/components/sections/admission-form/_components/education-details";
import { WorkExperience } from "@/components/sections/admission-form/_components/work-experience";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { filteredPayload, notify } from "@/helpers/ConstantHelper";
import {
  type ApplicationFormSchema_Step2,
  applicationFormSchema_Step2,
} from "@/helpers/ValidationHelper";
import { cn } from "@/lib/utils";
import { updateAdmission } from "@/store/services/global-services";

type Step2FormProps = {
  admissionData?: AdmissionFormData;
  onNextStep: (step: number) => void;
  onPrevStep: () => void;
};

const FormStep2 = ({
  admissionData,
  onNextStep,
  onPrevStep,
}: Step2FormProps) => {
  const form_step2 = useForm<ApplicationFormSchema_Step2>({
    resolver: zodResolver(applicationFormSchema_Step2),
    mode: "all",
    defaultValues: {
      Education_Details: {
        Education_Details_10th_std:
          admissionData?.Education_Details?.Education_Details_10th_std.id ?? 0,
        Education_Details_12th_std:
          admissionData?.Education_Details?.Education_Details_12th_std.id ?? 0,
      },
      Under_Graduate: {
        degree: admissionData?.Under_Graduate?.degree ?? "",
        ug_status: admissionData?.Under_Graduate?.ug_status ?? "In-Progress",
        marksheet: admissionData?.Under_Graduate?.marksheet.id ?? 0,
      },
      Post_Graduate:
        admissionData?.Post_Graduate && admissionData.Post_Graduate.length > 0
          ? admissionData.Post_Graduate.map((item) => ({
              degree: item.degree ?? "",
              pg_status: item.pg_status ?? "In-Progress",
              marksheet: item.marksheet?.id ?? 0,
            }))
          : [
              {
                degree: "",
                pg_status: "In-Progress",
                marksheet: 0,
              },
            ],
      Work_Experience:
        admissionData?.Work_Experience &&
        admissionData.Work_Experience.length > 0
          ? admissionData?.Work_Experience?.map((item) => ({
              designation: item.designation ?? "",
              employer: item.employer ?? "",
              duration_start: item.duration_start ?? "",
              duration_end: item.duration_end ?? "",
              reference_letter: item.reference_letter.id ?? 0,
            }))
          : [
              {
                designation: "",
                employer: "",
                duration_start: "2025-12-02",
                duration_end: "2025-12-10",
                reference_letter: 0,
              },
            ],
      step_2: admissionData?.step_2 ?? false,
    },
  });

  const { control, handleSubmit } = form_step2;

  const onSubmit = async (payload: ApplicationFormSchema_Step2) => {
    const filteredData = filteredPayload(payload);

    const data = {
      ...filteredData,
      step_2: true,
    };

    try {
      await updateAdmission(
        admissionData?.documentId as string,
        data as ApplicationFormSchema_Step2,
      );
      onNextStep(3);
    } catch (error) {
      notify({ success: false, message: error as string });
    }
  };

  return (
    <FormProvider {...form_step2}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-12 py-8 px-4 md:px-8 bg-background max-w-4xl mx-auto"
      >
        <EducationDetails admissionData={admissionData} control={control} />
        <WorkExperience admissionData={admissionData} control={control} />

        <div className="flex justify-start gap-3 mt-10 pt-6">
          <ButtonWidget
            type="button"
            onClick={() => {
              onPrevStep();
            }}
            className={cn(
              "px-6 py-2 bg-gray-200 border border-gray-300 text-black rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            )}
          >
            Back
          </ButtonWidget>

          <OrangeButtonWidget
            content="Save & Continue"
            className="px-6 py-2 bg-chart-1 text-white rounded-full hover:bg-red-700 transition-colors"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FormStep2;
