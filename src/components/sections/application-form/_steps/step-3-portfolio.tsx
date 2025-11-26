"use client"

import type React from "react"

import { useFormContext } from "react-hook-form"
import type { FormData } from "@/components/sections/application-form/application-form"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function Step3Portfolio() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()
  const [fileName, setFileName] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Upload Your Portfolio</h3>

      {/* Portfolio Upload */}
      <div>
        <Label className="mb-3 block font-semibold">
          Passport Size Image <span className="text-red-600">*</span>
        </Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-600 transition-colors">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path
                d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-8l6-6m-6 6v14m0 0l-6-6m6 6l6 6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <label className="cursor-pointer">
            <span className="block text-sm font-semibold text-gray-700 mb-1">Upload your passport size photo</span>
            <span className="block text-xs text-gray-500 mb-4">PNG, JPG up to 5MB</span>
            <input
              type="file"
              {...register("portfolio", {
                required: "Portfolio file is required",
                validate: {
                  fileSize: (files) => {
                    if (!files?.length) return true
                    return files[0].size <= 5000000 || "File size must be less than 5MB"
                  },
                  fileType: (files) => {
                    if (!files?.length) return true
                    return ["image/png", "image/jpeg"].includes(files[0].type) || "Only PNG and JPG files are allowed"
                  },
                },
              })}
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg"
              className="hidden"
            />
            <button
              type="button"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
            >
              Choose File
            </button>
          </label>
          {fileName && <p className="mt-2 text-sm text-green-600">✓ {fileName}</p>}
        </div>
        {errors.portfolio && <p className="text-red-600 text-sm mt-2">{errors.portfolio.message}</p>}
      </div>

      {/* Portfolio Details */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <p className="text-sm text-amber-900 mb-2">
          <strong>Requirements:</strong>
        </p>
        <ul className="text-sm text-amber-900 space-y-1 ml-4 list-disc">
          <li>Recent passport-sized photograph (35x45mm)</li>
          <li>Clear, well-lit image</li>
          <li>White or light background preferred</li>
          <li>File size: Maximum 5MB</li>
        </ul>
      </div>

      {/* Summary Note */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <p className="text-sm text-green-900">
          ✓ You are almost done! Review all the information and submit your application.
        </p>
      </div>
    </div>
  )
}
