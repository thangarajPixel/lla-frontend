"use client";

import { Plus, X } from "lucide-react";
import { type Control, useFieldArray } from "react-hook-form";
import { FormInput } from "@/components/form";
import FormFileUploadButton from "@/components/form/FormFileUploadButton";
import FormRadioGroup from "@/components/form/FormRadioGroup";
import { Button } from "@/components/ui/button";
import type { ApplicationFormSchema_Step2 } from "@/helpers/ValidationHelper";

type EducationDetailsProps = {
  admissionData?: AdmissionFormData;
  control: Control<ApplicationFormSchema_Step2>;
};

export function EducationDetails({
  admissionData,
  control,
}: EducationDetailsProps) {
  const {
    fields: pgDegrees,
    append,
    remove: removePgDegree,
  } = useFieldArray({
    control: control,
    name: "Post_Graduate",
  });

  const addDegree = () => {
    append({ degree: "", pg_status: "In-Progress" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-[#E97451] font-urbanist">
        Education Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFileUploadButton
          name="Education_Details.Education_Details_12th_std"
          control={control}
          label="12th std"
          placeholder="Upload your MarkSheet"
          defaultValue={
            admissionData?.Education_Details?.Education_Details_12th_std ?? null
          }
        />

        <FormFileUploadButton
          name="Education_Details.Education_Details_10th_std"
          control={control}
          label="10th std"
          placeholder="Upload your MarkSheet"
          defaultValue={
            admissionData?.Education_Details?.Education_Details_12th_std ?? null
          }
        />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
          <FormInput
            name="Under_Graduate.degree"
            label="Under Graduate"
            placeholder="Enter your graduation  degree"
            control={control}
          />
          <FormRadioGroup
            name="Under_Graduate.ug_status"
            control={control}
            options={[
              { value: "Finished", label: "Finished" },
              { value: "In-Progress", label: "In-Progress" },
            ]}
          />
          <FormFileUploadButton
            name="Under_Graduate.marksheet"
            control={control}
            placeholder="Upload your MarkSheet"
            notRequired={true}
            defaultValue={admissionData?.Under_Graduate?.marksheet ?? null}
          />
        </div>
      </div>

      {pgDegrees?.map((degree, index) => (
        <div
          key={degree.id ?? index}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center space-y-3"
        >
          <FormInput
            name={`Post_Graduate.${index}.degree`}
            label={index > 0 ? `Additional Degree ${index}` : "Post Graduate"}
            placeholder="Enter your post graduation degree"
            control={control}
            notRequired={index > 0}
          />
          <FormRadioGroup
            name={`Post_Graduate.${index}.pg_status`}
            control={control}
            options={[
              { value: "Finished", label: "Finished" },
              { value: "In-Progress", label: "In-Progress" },
            ]}
          />
          {index > 0 && (
            <Button
              type="button"
              onClick={() => removePgDegree(index)}
              className="flex relative bottom-2 items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
            >
              <X className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={addDegree}
        className="flex ml-auto items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
      >
        <Plus className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
        <span className="text-chart-1">Add Any Other Degree</span>
      </Button>
    </div>
  );
}
