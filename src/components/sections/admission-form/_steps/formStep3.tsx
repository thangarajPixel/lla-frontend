"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ImageGrid } from "@/components/sections/admission-form/_components/image-grid";
import { UploadArea } from "@/components/sections/admission-form/_components/upload-area";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import { filteredPayload, notify } from "@/helpers/ConstantHelper";
import {
  type ApplicationFormSchema_Step3,
  applicationFormSchema_Step3,
} from "@/helpers/ValidationHelper";
import { cn } from "@/lib/utils";
import { updateAdmission } from "@/store/services/global-services";

interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

type Step3FormProps = {
  admissionData?: AdmissionFormData;
  onPrevStep: () => void;
  onPreview: (preview: boolean) => void;
};

const FormStep3 = ({
  admissionData,
  onPrevStep,
  onPreview,
}: Step3FormProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const form_step3 = useForm<ApplicationFormSchema_Step3>({
    resolver: zodResolver(applicationFormSchema_Step3),
    mode: "all",
    defaultValues: {
      Upload_Your_Portfolio: {
        images:
          admissionData?.Upload_Your_Portfolio?.images?.map((item) => ({
            id: item.id,
          })) ?? [],
      },
      step_3: admissionData?.step_3 ?? false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form_step3;

  const handleFilesSelected = async (files: File[]) => {
    const MAX_SIZE = 1024 * 1024; // 1MB in bytes

    const validFiles = files.filter((file) => {
      if (file.size > MAX_SIZE) {
        alert(`File ${file.name} exceeds 1MB limit`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    const formData = new FormData();
    // validFiles.forEach((file) => formData.append("files", file));
    for (const file of validFiles) {
      formData.append("files", file);
    }

    const res = await axios.post(`${process.env.BASE_URL}/upload`, formData);

    const uploaded = res.data;

    const currentImages =
      form_step3.getValues("Upload_Your_Portfolio.images") || [];

    const uploadedIds = uploaded.map((item: { id: string }) => ({
      id: item.id,
    }));

    form_step3.setValue(
      "Upload_Your_Portfolio.images",
      [...currentImages, ...uploadedIds],
      { shouldValidate: true, shouldDirty: true },
    );

    const newPreviewImages = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newPreviewImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const img = prev[index];
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((_, i) => i !== index);
    });

    const existing = form_step3.getValues("Upload_Your_Portfolio.images") || [];

    const updated = existing.filter((_, i) => i !== index);

    form_step3.setValue("Upload_Your_Portfolio.images", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (payload: ApplicationFormSchema_Step3) => {
    const filteredData = filteredPayload(payload);

    const data = {
      ...filteredData,
      step_3: true,
    };

    // const formId = localStorage.getItem("admissionId");

    try {
      await updateAdmission(
        admissionData?.documentId as string,
        data as ApplicationFormSchema_Step3,
      );
      onPreview(true);
    } catch (error) {
      notify({ success: false, message: error as string });
    }
  };

  return (
    <FormProvider {...form_step3}>
      <form onSubmit={handleSubmit(onSubmit)} className=" bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-normal text-primary mb-8">
            Upload Your Portfolio
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <label
                htmlFor="portfolio"
                className="block text-foreground text-sm mb-4"
              >
                Upload Images<span className="text-destructive">*</span>
              </label>
              <UploadArea onFilesSelected={handleFilesSelected} />
              <p className="text-xs text-muted-foreground mt-2">
                Max. file size not more than 1MB.
              </p>

              {errors.Upload_Your_Portfolio?.images && (
                <p className="text-xs text-destructive mt-2">
                  {errors.Upload_Your_Portfolio?.images.message}
                </p>
              )}
            </div>

            <div className="lg:pl-8">
              <ImageGrid
                images={images ?? admissionData?.Upload_Your_Portfolio?.images}
                onRemove={handleRemoveImage}
              />
            </div>
          </div>
        </div>

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
            Preview Application
          </ButtonWidget>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormStep3;
