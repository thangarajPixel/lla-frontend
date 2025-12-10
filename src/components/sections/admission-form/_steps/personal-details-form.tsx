"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CheckCircle, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { FormInput, FormSelectBox } from "@/components/form";
import FormCheckBox from "@/components/form/FormCheckBox";
import FormDatePickerWithInput from "@/components/form/FormInputDatePicker";
import { Button } from "@/components/ui/button";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import { encryptId, filteredPayload, notify } from "@/helpers/ConstantHelper";
import { UploadIconImg } from "@/helpers/ImageHelper";
import { personalDetailsSchema } from "@/helpers/ValidationHelper";
import {
  createAdmission,
  updateAdmission,
} from "@/store/services/global-services";
import AddressFields from "../_components/address-fields";

export type PersonalDetailsSchema = z.infer<typeof personalDetailsSchema>;

type PersonalDetailsFormProps = {
  admissionData?: AdmissionFormData;
  admissionId?: string;
  courseId?: string;
};

const PersonalDetailsForm = ({
  admissionData,
  admissionId,
  courseId,
}: PersonalDetailsFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();

  const form_step1 = useForm<PersonalDetailsSchema>({
    resolver: zodResolver(personalDetailsSchema),
    mode: "all",
    defaultValues: {
      Course: admissionData?.Course ?? courseId ?? "",
      name_title: admissionData?.name_title ?? "Mr.",
      first_name: admissionData?.first_name ?? "",
      last_name: admissionData?.last_name ?? "",
      date_of_birth: admissionData?.date_of_birth ?? "",
      mobile_no: admissionData?.mobile_no ?? "",
      email: admissionData?.email ?? "",
      nationality: admissionData?.nationality ?? "",
      Language_Proficiency: admissionData?.Language_Proficiency ?? [
        { language: "", read: false, write: false, speak: false },
      ],
      address: admissionData?.address?.map((block) => ({
        type: "paragraph",
        children: block.children.map((child) => ({
          text: child.text,
          type: child.type,
        })),
      })) ?? [
        {
          type: "paragraph",
          children: [
            {
              text: "",
              type: "text",
            },
          ],
        },
      ],
      city: admissionData?.city ?? "",
      district: admissionData?.district ?? "",
      state: admissionData?.state?.documentId ?? "",
      pincode: admissionData?.pincode ?? "",
      hobbies: admissionData?.hobbies ?? "",
      photography_club: admissionData?.photography_club ?? "",
      blood_group: admissionData?.blood_group ?? "",
      Parent_Guardian_Spouse_Details: {
        title: admissionData?.Parent_Guardian_Spouse_Details?.title ?? "Mr.",
        first_name:
          admissionData?.Parent_Guardian_Spouse_Details?.first_name ?? "",
        last_name:
          admissionData?.Parent_Guardian_Spouse_Details?.last_name ?? "",
        mobile_no:
          admissionData?.Parent_Guardian_Spouse_Details?.mobile_no ?? "",
        email: admissionData?.Parent_Guardian_Spouse_Details?.email ?? "",
        profession:
          admissionData?.Parent_Guardian_Spouse_Details?.profession ?? "",
        nationality:
          admissionData?.Parent_Guardian_Spouse_Details?.nationality ?? "",
        address: admissionData?.Parent_Guardian_Spouse_Details?.address?.map(
          (block) => ({
            type: "paragraph",
            children: block.children.map((child) => ({
              text: child.text,
              type: child.type,
            })),
          }),
        ) ?? [
          {
            type: "paragraph",
            children: [
              {
                text: "",
                type: "text",
              },
            ],
          },
        ],
        city: admissionData?.Parent_Guardian_Spouse_Details?.city ?? "",
        district: admissionData?.Parent_Guardian_Spouse_Details?.district ?? "",
        state:
          admissionData?.Parent_Guardian_Spouse_Details?.state?.documentId ??
          "",
        pincode: admissionData?.Parent_Guardian_Spouse_Details?.pincode ?? "",
      },
      passport_size_image: admissionData?.passport_size_image?.id ?? 0,
      step_1: admissionData?.step_1 ?? false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form_step1;

  const {
    fields: languageFields,
    append,
    remove: removeLanguage,
  } = useFieldArray({
    control: control,
    name: "Language_Proficiency",
  });

  const handleAddLanguage = () => {
    append({ language: "", read: false, write: false, speak: false });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const validateDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement("img") as HTMLImageElement;
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        URL.revokeObjectURL(objectUrl);

        const maxWidth = 3600;
        const maxHeight = 2400;

        if (width > maxWidth || height > maxHeight) {
          alert(
            `Image must be max 12"x8" (3600x2400 pixels). Your image is ${width}x${height}px.`,
          );
          resolve(false);
        } else {
          resolve(true);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(false);
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRemoved(false);

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    if (file.size > 1024 * 1024) {
      alert("File size must be less than 1MB.");
      return;
    }

    const valid = await validateDimensions(file);
    if (!valid) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const res = await axios.post(`${process.env.BASE_URL}/upload`, formData);

    const resData = await res.data;
    notify({ success: true, message: "Image uploaded successfully" });
    form_step1.setValue("passport_size_image", resData[0].id, {
      shouldValidate: true,
    });
  };

  const handleFieldCheck = async (email: string) => {
    const isExistingEmailCheck = await clientAxios.post(
      `/admissions/email/check`,
      {
        email: email,
      },
    );

    const isExistingEmail = isExistingEmailCheck?.data;
    
    if (isExistingEmail?.exists && email !== admissionData?.email) {
      form_step1?.setError("email", { message: "Email already exists" });
      toast.error(`${isExistingEmail.message} & please try with new email`, {
        position: "bottom-right",
      });
      setIsVerified(false);
      return;
    } else {
      form_step1?.clearErrors("email");
      setIsVerified(true);
    }
  };

  const onSubmit = async (payload: PersonalDetailsSchema) => {
    const filteredData = filteredPayload(payload);

    const data = {
      ...filteredData,
      step_1: true,
    };

    try {
      if (admissionData?.id) {
        await updateAdmission(
          admissionData?.documentId,
          data as PersonalDetailsSchema,
        );
        router.push(`/admission/${admissionId}/education-details`);
      } else {
        const res = await createAdmission(data as PersonalDetailsSchema);
        notify({ success: true, message: "Admission submitted successfully" });
        const encryptedId = encryptId(res?.data?.id);
        router.push(`/admission/${encryptedId}/education-details`);
      }
    } catch (error) {
      notify({ success: false, message: error as string });
    }
  };

  return (
    <FormProvider {...form_step1}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="mx-auto">
          <h1 className="text-2xl 3xl:text-[32px] text-[#E97451] mb-8 font-urbanist">
            Personal Details
          </h1>

          <div
            // className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8"
            className="flex flex-col-reverse xs:flex-col lg:grid lg:grid-cols-[1fr_220px] gap-8"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base 3xl:text-lg mb-2 font-mulish"
                >
                  Full Name (As in Certificate)
                  <span className="text-chart-1">*</span>
                </label>
                <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[80px_1fr_1fr] gap-3">
                  <FormSelectBox
                    control={control}
                    name="name_title"
                    options={[
                      { value: "Mr.", label: "Mr" },
                      { value: "Ms.", label: "Ms" },
                      { value: "Mrs.", label: "Mrs" },
                    ]}
                    placeholder="select title"
                    className="w-20"
                  />

                  <FormInput
                    name="first_name"
                    placeholder="First Name"
                    control={control}
                    restrictionType="number"
                  />
                  <FormInput
                    name="last_name"
                    placeholder="Last Name"
                    control={control}
                    className="col-span-2 sm:col-span-1"
                    restrictionType="number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="mobile_no"
                  label="Mobile Number"
                  placeholder="Enter your mobile number"
                  control={control}
                  restrictionType="text"
                  maxLength={10}
                />

                <div>
                  <FormInput
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    control={control}
                    onFieldCheck={handleFieldCheck}
                  />

                  {isVerified && (
                    <div className="flex items-center gap-2 text-green-600 font-medium mt-2">
                      <CheckCircle className="size-4 3xl:size-4" />
                      <span className="text-sm">Email Verified</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormDatePickerWithInput
                  name="date_of_birth"
                  placeholder="DD-MM-YYYY"
                  label="Date of Birth"
                  control={control}
                  required
                />

                <FormInput
                  name="nationality"
                  label="Nationality"
                  placeholder="Enter your nationality"
                  control={control}
                  restrictionType="number"
                />
              </div>

              <div>
                <label
                  htmlFor="Language_Proficiency"
                  className="block text-base 3xl:text-lg text-foreground mb-2"
                >
                  Language & Proficiency<span className="text-chart-1">*</span>
                </label>

                {languageFields.map((lang, index) => (
                  <div
                    key={lang.id ?? index}
                    className="flex flex-col md:flex-row md:items-center gap-4 mb-6"
                  >
                    <div className="w-full md:w-64">
                      <FormInput
                        name={`Language_Proficiency.${index}.language`}
                        placeholder={`Language Known-${index + 1}`}
                        control={control}
                        restrictionType="number"
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

                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={() => removeLanguage(index)}
                          className="flex items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
                        >
                          <X className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <ButtonWidget
                  type="button"
                  onClick={handleAddLanguage}
                  className="flex relative bottom-5 ml-auto items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
                >
                  <Plus className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
                  <span className="text-chart-1 font-normal">Add Language</span>
                </ButtonWidget>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="passport"
                className="block text-base 3xl:text-lg text-foreground mb-2 font-mulish"
              >
                Passport size Image<span className="text-chart-1">*</span>
              </label>

              <div
                aria-hidden
                className="border border-dashed border-border rounded-lg xs:max-w-[180px] flex flex-col items-center justify-center min-h-[227px] xs:min-h-[227px] bg-secondary cursor-pointer hover:bg-accent transition relative overflow-hidden group" // min-h-180px
                onClick={handleClick}
              >
                {(!previewUrl && !admissionData?.passport_size_image) ||
                isRemoved ? (
                  <>
                    <ImageWidget
                      src={UploadIconImg}
                      alt="Upload Icon"
                      className="h-10 w-10 mb-3"
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload your passport
                      <br />
                      size picture here*
                      <br />
                      (No selfies please)
                    </p>
                  </>
                ) : (
                  <>
                    <Image
                      src={
                        previewUrl ??
                        admissionData?.passport_size_image?.url ??
                        ""
                      }
                      width={100}
                      height={100}
                      alt="Preview"
                      className="h-[227px] xs:h-[227px] w-full object-contain rounded-md hover:opacity-80 transition-opacity"
                    />
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRemoved(true);
                        setPreviewUrl(null);
                        form_step1.setValue("passport_size_image", 0, {
                          shouldValidate: true,
                        });
                      }}
                      className="absolute top-2 right-2 hidden group-hover:flex items-center gap-2 text-primary text-sm hover:opacity-80 transition-opacity bg-transparent hover:bg-transparent"
                    >
                      <X className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
                    </Button>
                  </>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* <p className="text-xs text-muted-foreground mt-2">
                The size of the images should not
                <br />
                be more than 12&quot;x8&quot; size.
                <br />
                Max. file size not more than 1MB.
              </p> */}
              <p className="text-xs font-mulish text-muted-foreground mt-2 xs:max-w-[180px]">
                The size of the images should not be more than 12&quot;x8&quot;
                size. Max. file size not more than 1MB.
              </p>

              {errors.passport_size_image && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.passport_size_image.message}
                </p>
              )}
            </div>
          </div>

          <AddressFields control={control} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <FormInput
              name="hobbies"
              label="Hobbies / Talent(s)"
              placeholder="Enter your Hobbies / Talent(s)"
              control={control}
              notRequired={true}
              restrictionType="number"
            />

            <FormInput
              name="photography_club"
              label="Photography Club"
              placeholder="Enter your Photography Club"
              control={control}
              notRequired={true}
              restrictionType="number"
            />

            <FormInput
              name="blood_group"
              label="Blood Group"
              placeholder="Enter your bloodGroup"
              control={control}
              notRequired={true}
              restrictionType="number"
              maxLength={3}
            />
          </div>
        </div>

        <div className="mx-auto mt-12">
          <h1 className="text-2xl 3xl:text-3xl text-[#E97451] mb-8">
            Parent/Guardian/Spouse Details
          </h1>

          <div className="grid grid-cols-1">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base 3xl:text-lg text-foreground mb-2 font-mulish"
                >
                  Full Name (As in Certificate)
                  <span className="text-chart-1">*</span>
                </label>
                <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[80px_1fr_1fr] gap-3">
                  <FormSelectBox
                    control={control}
                    name="Parent_Guardian_Spouse_Details.title"
                    options={[
                      { value: "Mr.", label: "Mr" },
                      { value: "Ms.", label: "Ms" },
                      { value: "Mrs.", label: "Mrs" },
                    ]}
                    placeholder="select title"
                    className="w-20 "
                  />

                  <FormInput
                    name="Parent_Guardian_Spouse_Details.first_name"
                    placeholder="First Name"
                    control={control}
                    restrictionType="number"
                  />
                  <FormInput
                    name="Parent_Guardian_Spouse_Details.last_name"
                    placeholder="Last Name"
                    control={control}
                    className="col-span-2 sm:col-span-1"
                    restrictionType="number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="Parent_Guardian_Spouse_Details.mobile_no"
                  label="Mobile Number"
                  placeholder="Enter your mobile number"
                  control={control}
                  restrictionType="text"
                />
                <FormInput
                  name="Parent_Guardian_Spouse_Details.email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  control={control}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="Parent_Guardian_Spouse_Details.profession"
                  label="Profession"
                  placeholder="Profession/Occupation/Designation"
                  control={control}
                  restrictionType="number"
                />
                <FormInput
                  name="Parent_Guardian_Spouse_Details.nationality"
                  label="Nationality"
                  placeholder="Enter your nationality"
                  control={control}
                  restrictionType="number"
                />
              </div>

              <AddressFields
                control={control}
                name="Parent_Guardian_Spouse_Details"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-3 mt-10 pt-6">
          <OrangeButtonWidget
            content="Save & Continue"
            // className="xss:text-[12px] h-9 px-4"
            className="text-lg 2xl:text-lg h-[50px] px-6 py-3"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default PersonalDetailsForm;
