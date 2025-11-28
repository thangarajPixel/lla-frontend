"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { EducationDetails } from "@/components/sections/admission-form/_components/education-details";
import { WorkExperience } from "@/components/sections/admission-form/_components/work-experience";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import { cn, notify } from "@/lib/utils";
import { updateAdmission } from "@/queries/services/global-services";
import {
  type ApplicationFormSchema_Step2,
  applicationFormSchema_Step2,
} from "@/validations/multi-step-form";

type Step2FormProps = {
  // form: ReturnType<typeof useForm<z.infer<typeof applicationFormSchema_Step2>>>;
  onNextStep: () => void;
  onPrevStep: () => void;
};

const FormStep2 = ({ onNextStep, onPrevStep }: Step2FormProps) => {
  const form_step2 = useForm<ApplicationFormSchema_Step2>({
    resolver: zodResolver(applicationFormSchema_Step2),
    mode: "all",
    defaultValues: {
      Education_Details: {
        Education_Details_12th_std: undefined,
        Education_Details_10th_std: undefined,
      },
      Under_Graduate: {
        degree: "",
        ug_status: "in-progress",
        marksheet: undefined,
      },
      Post_Graduate: [{ degree: "", pg_status: "in-progress" }],
      Work_Experience: [
        {
          designation: "",
          employer: "",
          duration_start: "",
          duration_end: "",
          reference_letter: undefined,
        },
      ],
      step_2: false,
    },
  });

  const { control, handleSubmit } = form_step2;

  const onSubmit = async (payload: ApplicationFormSchema_Step2) => {
    const filteredData = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== undefined && value !== null,
      ),
    );

    const data = {
      ...filteredData,
      // passport_size_image: payload.passport_size_image,
      step_2: true,
    };

    const formId = localStorage.getItem("admissionId");

    try {
      await updateAdmission(
        Number(formId),
        data as ApplicationFormSchema_Step2,
      );
      notify({ success: true, message: "Admission submitted successfully" });
      onNextStep();
      alert("Application submitted successfully!");
    } catch (error) {
      notify({ success: false, message: error });
    }
  };

  return (
    // <main className="min-h-screen bg-background py-8 px-4 md:px-8">
    //   <div className="max-w-4xl mx-auto space-y-12">
    //     <EducationDetails control={form.control} />
    //     <WorkExperience control={form.control} />
    //   </div>
    // </main>

    <FormProvider {...form_step2}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-12 py-8 px-4 md:px-8 bg-background max-w-4xl mx-auto"
      >
        <EducationDetails control={control} />
        <WorkExperience control={control} />

        <div className="flex justify-start gap-3 mt-10 pt-6">
          <ButtonWidget
            type="button"
            onClick={onPrevStep}
            className={cn(
              "px-6 py-2 bg-gray-200 border border-gray-300 text-black rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            )}
          >
            Back
          </ButtonWidget>

          <ButtonWidget
            type="submit"
            // onClick={handleNextStep}
            // disabled={!!errors}
            className="px-6 py-2 bg-chart-1 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Save & Continue
          </ButtonWidget>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormStep2;
