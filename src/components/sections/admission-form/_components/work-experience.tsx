"use client";

import { Plus } from "lucide-react";
import { type Control, useFieldArray } from "react-hook-form";
import { FormDatePicker, FormInput } from "@/components/form";
import FormFileUploadButton from "@/components/form/FormFileUploadButton";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import type { ApplicationFormSchema_Step2 } from "@/helpers/ValidationHelper";

type WorkExperienceProps = {
  admissionData?: AdmissionFormData;
  control: Control<ApplicationFormSchema_Step2>;
  onWatchEndDate?: (index: number) => void;
  onSelectEndDate?: (index: number, value: string) => void;
};

export function WorkExperience({
  admissionData,
  control,
  onWatchEndDate,
  onSelectEndDate,
}: WorkExperienceProps) {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "Work_Experience",
  });

  const handleAddExperience = () => {
    append({
      designation: "",
      employer: "",
      duration_start: "",
      duration_end: "",
      reference_letter: 0,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-[#E97451]">Work Experience</h2>

      {fields?.map((experience, index) => (
        <div key={experience.id} className="space-y-6">
          {index > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-chart-1 font-medium">
                Work Experience - {index}
              </h2>
              <ButtonWidget
                onClick={() => remove(index)}
                className="bg-chart-1 text-white hover:bg-chart-1/80 text-xs px-2"
              >
                Remove
              </ButtonWidget>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormInput
                name={`Work_Experience.${index}.designation`}
                label="Role / Designation"
                placeholder="Enter your designation or role in the company"
                control={control}
              />
            </div>

            <div className="space-y-2">
              <FormInput
                name={`Work_Experience.${index}.employer`}
                label="Employer"
                placeholder="Enter your name of the company you worked for"
                control={control}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDatePicker
              name={`Work_Experience.${index}.duration_start`}
              placeholder="DD/MM/YYYY"
              label="Enter Duration"
              control={control}
              dateRange
              index={index}
              endDate={onWatchEndDate}
              onSelectEndDate={onSelectEndDate}
            />

            <FormFileUploadButton
              name={`Work_Experience.${index}.reference_letter`}
              control={control}
              label="Reference Letter"
              placeholder="Upload your reference Letter"
              notRequired={false}
              defaultValue={
                admissionData?.Education_Details?.Education_Details_12th_std ??
                null
              }
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddExperience}
        className="flex ml-auto items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity"
      >
        <Plus className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
        <span className="text-chart-1">Add More Work Experience</span>
      </button>
    </div>
  );
}
