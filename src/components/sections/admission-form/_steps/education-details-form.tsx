"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";
import { EducationDetails } from "@/components/sections/admission-form/_components/education-details";
import { WorkExperience } from "@/components/sections/admission-form/_components/work-experience";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { filteredPayload, notify } from "@/helpers/ConstantHelper";
import { educationDetailsSchema } from "@/helpers/ValidationHelper";
import { cn } from "@/lib/utils";
import { updateAdmission } from "@/store/services/global-services";
import { useEffect } from "react";
import { useCourseStore } from "@/store/zustand";

export type EducationDetailsSchema = z.infer<typeof educationDetailsSchema>;

type EducationDetailsFormProps = {
  admissionData?: AdmissionFormData;
  admissionId?: string | null;
};

const EducationDetailsForm = ({
  admissionData,
  admissionId,
}: EducationDetailsFormProps) => {
  const router = useRouter();

  const form_step2 = useForm<EducationDetailsSchema>({
    resolver: zodResolver(educationDetailsSchema),
    mode: "all",
    defaultValues: {
      Education_Details: {
        Education_Details_10th_std:
          admissionData?.Education_Details?.Education_Details_10th_std?.id ?? 0,
        Education_Details_12th_std:
          admissionData?.Education_Details?.Education_Details_12th_std?.id ?? 0,
      },
      Under_Graduate: {
        degree: admissionData?.Under_Graduate?.degree ?? "",
        ug_status: admissionData?.Under_Graduate?.ug_status ?? "",
        marksheet: admissionData?.Under_Graduate?.marksheet?.id ?? 0,
      },
      Post_Graduate:
        admissionData?.Post_Graduate && admissionData?.Post_Graduate?.length > 0
          ? admissionData?.Post_Graduate?.map((item) => ({
              degree: item?.degree ?? "",
              pg_status: item?.pg_status ?? "",
              marksheet: item?.marksheet?.id ?? 0,
            }))
          : [
              {
                degree: "",
                pg_status: "",
                marksheet: 0,
              },
            ],
      Work_Experience:
        admissionData?.Work_Experience &&
        admissionData?.Work_Experience?.length > 0
          ? admissionData?.Work_Experience?.map((item) => ({
              designation: item?.designation ?? "",
              employer: item?.employer ?? "",
              duration_start: item?.duration_start ?? "",
              duration_end: item?.duration_end ?? "",
              reference_letter: item?.reference_letter?.id ?? 0,
            }))
          : [
              {
                designation: "",
                employer: "",
                duration_start: "",
                duration_end: "",
                reference_letter: 0,
              },
            ],
      step_2: admissionData?.step_2 ?? false,
    },
  });

  const { control, handleSubmit, watch } = form_step2;

  const ugStatus = watch("Under_Graduate.ug_status");
  const pgStatus = watch("Post_Graduate.0.pg_status");
  const watchPostGraduate = watch("Post_Graduate.0.degree");

  useEffect(() => {
      if (admissionData) {
        useCourseStore.setState({ courseName: admissionData?.Course?.Name });
      }
    }, [admissionData]);

  const onSubmit = async (payload: EducationDetailsSchema) => {
    const filteredData = filteredPayload(payload);

    const data = {
      ...filteredData,
      step_2: true,
    };

    try {
      await updateAdmission(
        admissionData?.documentId as string,
        data as EducationDetailsSchema,
      );
      router.push(`/admission/${admissionId}/portfolio`);
    } catch (error) {
      notify({ success: false, message: error as string });
    }
  };

  return (
    <FormProvider {...form_step2}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-12 py-8 bg-background mx-auto"
      >
        <EducationDetails
          admissionData={admissionData}
          control={control}
          ugStatus={ugStatus}
          pgStatus={pgStatus}
          watchPostGraduate={watchPostGraduate}
        />
        <WorkExperience admissionData={admissionData} control={control} />

        <div className="flex justify-start gap-3 mt-10 pt-6">
          <ButtonWidget
            type="button"
            onClick={() => {
              router.push(`/admission/${admissionId}/personal-details`);
            }}
            className={cn(
              "p-6 w-[95px] 3xl:w-[123px] text-lg bg-gray-200 border border-gray-300 text-black rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            )}
          >
            Back
          </ButtonWidget>

          <OrangeButtonWidget
            content="Save & Continue"
            className="text-lg 2xl:text-lg h-[50px] px-6 py-3"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default EducationDetailsForm;
