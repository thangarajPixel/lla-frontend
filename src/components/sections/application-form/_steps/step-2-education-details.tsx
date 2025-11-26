"use client"

import { useFormContext } from "react-hook-form"
import type { FormData } from "@/components/sections/application-form/application-form"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

export function Step2EducationDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Education Details & Work Experience</h3>

      {/* Education */}
      <div>
        <Label htmlFor="education">Educational Background *</Label>
        {/* <Textarea */}
        <textarea
          id="education"
          placeholder="Please describe your educational background, degrees, and relevant coursework"
          {...register("education", {
            required: "Educational background is required",
            minLength: {
              value: 20,
              message: "Please provide more details about your education",
            },
          })}
          className="mt-1 min-h-32"
        />
        {errors.education && <p className="text-red-600 text-sm mt-1">{errors.education.message}</p>}
      </div>

      {/* Work Experience */}
      <div>
        <Label htmlFor="workExperience">Work Experience *</Label>
        {/* <Textarea */}
        <textarea
          id="workExperience"
          placeholder="Please describe your work experience in documentary and/or corporate filmmaking"
          {...register("workExperience", {
            required: "Work experience is required",
            minLength: {
              value: 20,
              message: "Please provide more details about your work experience",
            },
          })}
          className="mt-1 min-h-32"
        />
        {errors.workExperience && <p className="text-red-600 text-sm mt-1">{errors.workExperience.message}</p>}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-sm text-blue-900">
          💡 <strong>Tip:</strong> Highlight any relevant projects, certifications, or achievements in the filmmaking
          industry.
        </p>
      </div>
    </div>
  )
}
