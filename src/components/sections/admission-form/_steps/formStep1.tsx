"use client"

import { Fragment, useRef, useState } from "react"
import { Upload, Plus, X } from "lucide-react"
import { Control, FormProvider, useFieldArray, useForm } from "react-hook-form"
import { applicationFormSchema_Step1, ApplicationFormSchema_Step1 } from "@/validations/multile-step-form"
import Image from "next/image";
import { FormDatePicker, FormInput, FormSelectBox } from "@/components/form-fields";
import z from "zod";
import AddressFields from "../_components/address-fields";
import FormCheckBox from "@/components/form-fields/FormCheckBox";
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonWidget from "@/components/widgets/ButtonWidget"
import axios from "axios"
import { useGetStateLists } from "@/queries/hooks/global-hooks"
import { createAdmission } from "@/queries/services/global-services"
import { notify } from "@/lib/utils"

type Step1FormProps = {
  // form?: ReturnType<typeof useForm<z.infer<typeof applicationFormSchema_Step1>>>;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const FormStep1 = ({ onNextStep, onPrevStep }: Step1FormProps) => {

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form_step1 = useForm<ApplicationFormSchema_Step1>({
    resolver: zodResolver(applicationFormSchema_Step1),
    mode: "all",
    defaultValues: {
      name_title: "Mr.",
      first_name: "",
      last_name: "",
      date_of_birth: null,
      mobile_no: "",
      email: "",
      nationality: "",
      Language_Proficiency: [
        { language: "", read: false, write: false, speak: false },
      ],
      address: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
      hobbies: "",
      photography_club: "",
      blood_group: "",
      Parent_Guardian_Spouse_Details: {
        title: "Mr.",
        first_name: "",
        last_name: "",
        mobile_no: "",
        email: "",
        nationality: "",
        address: "",
        city: "",
        district: "",
        state: undefined,
        pincode: "",
      },
      passport_size_image: undefined,
      step_1: false
    },
  });

  const { control, register, handleSubmit, formState: { errors } } = form_step1;

  const {
    fields: languageFields,
    append,
    remove: removeLanguage
  } = useFieldArray({
    control: control,
    name: 'Language_Proficiency',
  });

  const handleAddLanguage = () => {
    append({ language: "", read: false, write: false, speak: false });
  }


  const handleClick = () => {
    fileInputRef.current?.click()
  }



  const validateDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement('img') as HTMLImageElement
      const objectUrl = URL.createObjectURL(file)
      img.src = objectUrl

      img.onload = () => {
        const width = img.width
        const height = img.height

        // revoke object URL once loaded to free memory
        URL.revokeObjectURL(objectUrl)

        const maxWidth = 36000  // 12 inches @300dpi
        const maxHeight = 24000 // 8 inches @300dpi

        if (width > maxWidth || height > maxHeight) {
          alert(`Image must be max 12"x8" (3600x2400 pixels). Your image is ${width}x${height}px.`)
          resolve(false)
        } else {
          resolve(true)
        }
      }

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        resolve(false)
      }
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.")
      return
    }

    const formData = new FormData();
    formData.append('files', file);


    // 1️⃣ Validate file size (< 1MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 1MB.")
      return
    }

    // 2️⃣ Validate dimensions (<= 12x8 inches → <= 3600x2400 px)
    const valid = await validateDimensions(file)
    if (!valid) return

    // 3️⃣ Preview
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    const res = await axios.post('https://dev-admin.lightandlifeacademy.in/api/upload', formData);

    const resData = await res.data;
    notify({ success: true, message: "Image uploaded successfully" });
    // notify({ success: true, message: "Saved successfully" });
    form_step1.setValue('passport_size_image', resData[0].id, { shouldValidate: true })
  }

  const onSubmit = async (payload: ApplicationFormSchema_Step1) => {

    const filteredData = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) =>
        value !== undefined && value !== null && value !== '',
      ),
    );

    const data = {
      ...filteredData,
      // passport_size_image: payload.passport_size_image,
      step_1: true,
    }

    try {
      const res = await createAdmission(data as ApplicationFormSchema_Step1);
      localStorage.setItem('admissionId', res.data.id);
      notify({ success: true, message: "Admission submitted successfully" });
      onNextStep();
      alert("Application submitted successfully!")
    } catch (error) {
      notify({ success: false, message: error });
    }
  }

  return (
    <FormProvider {...form_step1}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {/* Personal Details */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl text-[#E97451] mb-8">Personal Details</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name (As in Certificate)<span className="text-chart-1">*</span>
                </label>
                <div className="grid grid-cols-[80px_1fr_1fr] gap-3">

                  <FormSelectBox
                    control={control}
                    name="name_title"
                    options={[{ value: "Mr.", label: "Mr" }, { value: "Ms.", label: "Ms" }]}
                    placeholder="select title"
                    className="w-20"
                  />

                  <FormInput name="first_name" placeholder="First Name" control={control} />
                  <FormInput name="last_name" placeholder="Last Name" control={control} />
                </div>
              </div>

              {/* Date of Birth & Nationality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormDatePicker name="date_of_birth" placeholder="DD/MM/YYYY" label="Date of Birth" control={control} notRequired="false" />

                <FormInput name="nationality" label="Nationality" placeholder="Enter your nationality" control={control} />
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="mobile_no" label="Mobile Number" placeholder="Enter your mobile number" control={control} />

                <FormInput name="email" label="Email Address" placeholder="Enter your email address" control={control} />
              </div>

              {/* Language & Proficiency */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Language & Proficiency<span className="text-primary">*</span>
                </label>

                {languageFields.map((lang, index) => (
                  <div key={lang.id ?? index} className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="w-full md:w-64">
                      <FormInput
                        name={`Language_Proficiency.${index}.language`}
                        placeholder={`Language Known-${index + 1}`}
                        control={control}
                      />
                    </div>
                    <div className="flex items-center gap-6">
                      <FormCheckBox
                        name={`Language_Proficiency.${index}.read`}
                        control={control}
                        label="Read"
                      />

                      <FormCheckBox
                        name={`Language_Proficiency.${index}.write`}
                        control={control}
                        label="Write"
                      />

                      <FormCheckBox
                        name={`Language_Proficiency.${index}.speak`}
                        control={control}
                        label="Speak"
                      />

                      {
                        index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="flex ml-auto items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity"
                          >
                            <X className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
                          </button>
                        )
                      }
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="flex relative bottom-5 ml-auto items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity"
                >
                  <Plus className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
                  <span className="text-chart-1">Add Language</span>
                </button>
              </div>
            </div>

            {/* Passport Size Image Upload */}
            <div className="lg:pt-7 mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Passport size Image<span className="text-primary">*</span>
              </label>

              {/* Upload Box */}
              <div
                className="border border-dashed border-border rounded-lg max-w-[180px] flex flex-col items-center justify-center min-h-[180px] bg-secondary cursor-pointer hover:bg-accent transition relative overflow-hidden"
                onClick={handleClick}
              >
                {!previewUrl ? (
                  <>
                    <Upload className="h-10 w-10 text-primary mb-3" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload your passport
                      <br />
                      size picture here*
                      <br />
                      (No selfies please)
                    </p>
                  </>
                ) : (
                  <Image
                    src={previewUrl}
                    width={100}
                    height={100}
                    alt="Preview"
                    className="h-[180px] w-full object-cover rounded-md"
                  />
                )}
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              // {...register("passportImage", {
              //   required: "Passport image is required",
              //   validate: {
              //     // Max size: 1MB
              //     fileSize: (files) =>
              //       files?.[0]?.size <= 1024 * 1024 ||
              //       "File size should not exceed 1MB",
              //   },
              // })}
              />

              <p className="text-xs text-muted-foreground mt-2">
                The size of the images should not
                <br />
                be more than 12&quot;x8&quot; size.
                <br />
                Max. file size not more than 1MB.
              </p>
            </div>
          </div>

          {/* Address */}
          <AddressFields control={control} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

            <FormInput name="hobbies" label="Hobbies / Talent(s)" placeholder="Enter your Hobbies / Talent(s)" control={control} />

            <FormInput name="photography_club" label="Photography Club" placeholder="Enter your Photography Club" control={control} />

            <FormInput name="blood_group" label="Blood Group" placeholder="Enter your bloodGroup" control={control} />
          </div>
        </div>

        {/* Parent/Guardian Details */}
        <div className="max-w-5xl mx-auto mt-12">
          <h1 className="text-2xl md:text-3xl text-[#E97451] mb-8">Parent/Guardian/Souse Details</h1>

          <div className="grid grid-cols-1">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name (As in Certificate)<span className="text-chart-1">*</span>
                </label>
                <div className="grid grid-cols-[80px_1fr_1fr] gap-3">

                  <FormSelectBox
                    control={control}
                    name="Parent_Guardian_Spouse_Details.title"
                    defaultValue="mr"
                    options={[{ value: "Mr.", label: "Mr" }, { value: "Ms.", label: "Ms" }]}
                    placeholder="select title"
                    className="w-20 "
                  />

                  <FormInput name="Parent_Guardian_Spouse_Details.first_name" placeholder="First Name" control={control} />
                  <FormInput name="Parent_Guardian_Spouse_Details.last_name" placeholder="Last Name" control={control} />
                </div>
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="Parent_Guardian_Spouse_Details.mobile_no" label="Mobile Number" placeholder="Enter your mobile number" control={control} />
                <FormInput name="Parent_Guardian_Spouse_Details.email" label="Email Address" placeholder="Enter your email address" control={control} />
              </div>

              {/* Date of Birth & Nationality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="Parent_Guardian_Spouse_Details.profession" label="Profession" placeholder="Profession/Occupation/Designation" control={control} />
                <FormInput name="Parent_Guardian_Spouse_Details.nationality" label="Nationality" placeholder="Enter your nationality" control={control} />
              </div>

              {/* Address */}
              <AddressFields control={control} name="Parent_Guardian_Spouse_Details" />

            </div>
          </div>

        </div>

        <div className="flex justify-start gap-3 mt-10 pt-6">
          <ButtonWidget
            type="submit"
            // onClick={handleNextStep}
            // disabled={errors && Object.keys(errors).length > 0}
            className="px-6 py-2 bg-chart-1 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Save & Continue
          </ButtonWidget>

        </div>

      </form>
    </FormProvider>
  )
}

export default FormStep1;