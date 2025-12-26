"use client";

import { Plus, X } from "lucide-react";
import {
  type Control,
  type UseFormSetValue,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { FormInput } from "@/components/form";
import FormFileUploadButton from "@/components/form/FormFileUploadButton";
import FormRadioGroup from "@/components/form/FormRadioGroup";
import type { EducationDetailsSchema } from "@/components/sections/admission-form/_steps/education-details-form";
import { Button } from "@/components/ui/button";

type EducationDetailsProps = {
  admissionData?: AdmissionFormData;
  control: Control<EducationDetailsSchema>;
  setValue?: UseFormSetValue<EducationDetailsSchema>;
};

export function EducationDetails({
  admissionData,
  control,
  setValue,
}: EducationDetailsProps) {
  const {
    fields: pgDegrees,
    append,
    remove: removePgDegree,
  } = useFieldArray({
    control: control,
    name: "Post_Graduate",
  });

  const postGraduate = useWatch({
    control,
    name: "Post_Graduate",
  });

  const underGraduate = useWatch({
    control,
    name: "Under_Graduate",
  });

  const lastDegree = postGraduate?.[postGraduate.length - 1]?.degree?.trim();
  const lastPgStatus =
    postGraduate?.[postGraduate.length - 1]?.pg_status?.trim();
  const ugStatus = underGraduate?.ug_status?.trim();

  const addDegree = () => {
    append({ degree: "", pg_status: "" });
  };

  return (
    <div className="space-y-2">
      <h2 className="text-2xl 3xl:text-[32px] text-[#E97451] font-urbanist">
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
            admissionData?.Education_Details?.Education_Details_10th_std ?? null
          }
        />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 lg:gap-0 items-start">
          <div>
            <FormInput
              name="Under_Graduate.degree"
              label="Under Graduate"
              placeholder="Enter your graduation degree"
              control={control}
            />

            <div className="lg:h-5" />
          </div>

          <div className="lg:pt-7">
            <FormRadioGroup
              name="Under_Graduate.ug_status"
              control={control}
              options={[
                { value: "Finished", label: "Finished" },
                { value: "In-Progress", label: "In-Progress" },
              ]}
              errorClassName="mt-0 lg:-mt-4"
            />
          </div>

          {ugStatus === "Finished" && (
            <>
              <FormFileUploadButton
                name="Under_Graduate.marksheet"
                control={control}
                placeholder="Upload your MarkSheet"
                notRequired
                defaultValue={admissionData?.Under_Graduate?.marksheet ?? null}
                inputClassName="justify-start pl-4"
                hideDescription
              />

              <p className="text-xs text-muted-foreground lg:ml-2">
                Max. file size not more than 2MB.
              </p>
            </>
          )}
        </div>
      </div>

      {pgDegrees?.map((degree, index) => (
        <div
          key={degree.id ?? index}
          className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-end"
        >
          <FormInput
            name={`Post_Graduate.${index}.degree`}
            label={index > 0 ? `Additional Degree ${index}` : "Post Graduate"}
            placeholder="Enter your post graduation degree"
            control={control}
            notRequired={true}
            onChangeExtra={(value) => {
              if (!value?.trim()) {
                setValue?.(`Post_Graduate.${index}.pg_status`, "", {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }
            }}
            disabled={ugStatus !== "Finished"}
          />

          <FormRadioGroup
            name={`Post_Graduate.${index}.pg_status`}
            control={control}
            options={[
              { value: "Finished", label: "Finished" },
              { value: "In-Progress", label: "In-Progress" },
            ]}
            disabled={
              ugStatus !== "Finished" || !postGraduate?.[index]?.degree?.trim()
            }
            errorClassName="mt-0 lg:-mt-4"
          />
          {index > 0 && (
            <Button
              type="button"
              onClick={() => removePgDegree(index)}
              className="absolute -top-2 right-0 flex items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
            >
              <X className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
            </Button>
          )}
        </div>
      ))}

      {lastDegree !== "" && lastPgStatus === "Finished" && (
        <Button
          type="button"
          onClick={addDegree}
          className="flex md:ml-auto items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
        >
          <Plus className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
          <span className="text-chart-1">Add Any Other Degree</span>
        </Button>
      )}
    </div>
  );
}
