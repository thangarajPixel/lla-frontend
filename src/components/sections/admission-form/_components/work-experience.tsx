"use client";

import { Plus } from "lucide-react";
import { type Control, useFieldArray } from "react-hook-form";
import { FormInput } from "@/components/form-fields";
import FormFileUploadButton from "@/components/form-fields/FormFileUploadButton";
import { FileUploadButton } from "@/components/sections/admission-form/_components/file-upload-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import type { ApplicationFormSchema_Step2 } from "@/validations/multi-step-form";

type WorkExperienceProps = {
  control: Control<ApplicationFormSchema_Step2>;
};

// type WorkExperience = {
//   id: string;
//   designation: string;
//   employer: string;
//   duration: string;
//   referenceLetter: string;
// };

export function WorkExperience({ control }: WorkExperienceProps) {
  // const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([])

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
      reference_letter: undefined,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-[#E97451]">Work Experience</h2>

      <div className="hidden grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Role / Designation</Label>
          <Input
            placeholder="Enter your designation or role in the company"
            className="rounded-full border-border h-11"
          />
          {/* <FormInput name="designation" placeholder="First Name" control={control} /> */}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Employer</Label>
          <Input
            placeholder="Enter your name of the company you worked for"
            className="rounded-full border-border h-11"
          />
        </div>
      </div>

      <div className="hidden grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Duration</Label>
          <Input
            placeholder="Enter duration (e.g., 2 years)"
            className="rounded-full border-border h-11"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Reference Letter</Label>
          <FileUploadButton label="Upload reference letter" variant="light" />
        </div>
      </div>

      {fields?.map((experience, index) => (
        <div key={experience.id} className="space-y-6">
          {index > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-chart-1 font-medium">
                Work Experience - {index}
              </h2>
              <ButtonWidget
                onClick={() => remove(index)}
                className="bg-chart-1 text-white hover:bg-chart-1/80 w-24"
              >
                Remove
              </ButtonWidget>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              {/* <Label className="text-sm font-medium">Role / Designation</Label>
                                <Input
                                    placeholder="Enter your designation or role in the company"
                                    className="rounded-full border-border h-11"
                                /> */}
              <FormInput
                name={`Work_Experience.${index}.designation`}
                label="Role / Designation"
                placeholder="Enter your designation or role in the company"
                control={control}
              />
            </div>

            <div className="space-y-2">
              {/* <Label className="text-sm font-medium">Employer</Label>
                                <Input
                                    placeholder="Enter your name of the company you worked for"
                                    className="rounded-full border-border h-11"
                                /> */}
              <FormInput
                name={`Work_Experience.${index}.employer`}
                label="Employer"
                placeholder="Enter your name of the company you worked for"
                control={control}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              name={`Work_Experience.${index}.duration_start`}
              label="Duration"
              placeholder="Enter duration (e.g., 2 years)"
              control={control}
            />

            <FormFileUploadButton
              name={`Work_Experience.${index}.reference_letter`}
              control={control}
              label="Reference Letter"
              placeholder="Upload your MarkSheet"
              notRequired={false}
            />
          </div>
        </div>
      ))}

      {/* <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleAddExperience}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span className="text-sm font-medium">Add More Work Experience</span>
                </button>
            </div> */}

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
