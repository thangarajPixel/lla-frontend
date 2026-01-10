"use client";

import { Plus, X } from "lucide-react";
import { type Control, useFieldArray, useWatch } from "react-hook-form";
import { FormInput } from "@/components/form";
import FormFileUploadButton from "@/components/form/FormFileUploadButton";
import FormDateRangePickerWithInput from "@/components/form/FormInputDateRangePicker";
import type { EducationDetailsSchema } from "@/components/sections/admission-form/_steps/education-details-form";
import { Button } from "@/components/ui/button";

type WorkExperienceProps = {
  admissionData?: AdmissionFormData;
  control: Control<EducationDetailsSchema>;
};

export function WorkExperience({
  admissionData,
  control,
}: WorkExperienceProps) {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "Work_Experience",
  });

  const workExperience = useWatch({
    control,
    name: "Work_Experience",
  });

  const lastExperience =
    workExperience?.[workExperience.length - 1]?.designation?.trim();

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
      <h2 className="text-2xl 3xl:text-[32px] text-[#E97451] font-urbanist">
        Work Experience
      </h2>

      {fields?.map((experience, index) => (
        <div key={experience.id} className="space-y-6">
          {index > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-chart-1 font-medium">
                Work Experience - {index}
              </h2>

              {/* <Button
                type="button"
                onClick={() => remove(index)}
                className="flex relative bottom-2 items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
              >
                <X className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
              </Button> */}
              <div
                aria-hidden
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => remove(index)}
              >
                <button
                  type="button"
                  className=" text-white bg-[#E97451] size-5 rounded-full p-1 text-sm flex items-center justify-center hover:bg-[#E97451] cursor-pointer"
                >
                  X
                </button>
                <span className="hidden">Remove</span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormInput
                name={`Work_Experience.${index}.designation`}
                label="Role / Designation"
                placeholder="Enter your designation in the company"
                control={control}
                notRequired={true}
              />
            </div>

            <div className="space-y-2">
              <FormInput
                name={`Work_Experience.${index}.employer`}
                label="Employer"
                placeholder="Enter your name of the company worked"
                control={control}
                notRequired={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDateRangePickerWithInput
              startName={`Work_Experience.${index}.duration_start`}
              endName={`Work_Experience.${index}.duration_end`}
              control={control}
              label="Enter Duration"
            />

            <FormFileUploadButton
              name={`Work_Experience.${index}.reference_letter`}
              control={control}
              label="Reference Letter"
              placeholder="Upload your reference Letter"
              notRequired={true}
              defaultValue={
                admissionData?.Work_Experience[index]?.reference_letter ?? null
              }
              inputClassName="justify-start pl-3"
            />
          </div>
        </div>
      ))}

      {lastExperience && (
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex ml-auto items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Plus className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
          <span className="text-chart-1">Add More Work Experience</span>
        </button>
      )}
    </div>
  );
}
