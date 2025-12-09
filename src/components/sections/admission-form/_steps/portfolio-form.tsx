"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";
import { ImageGrid } from "@/components/sections/admission-form/_components/image-grid";
import { UploadArea } from "@/components/sections/admission-form/_components/upload-area";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { filteredPayload, notify } from "@/helpers/ConstantHelper";
import { portfolioSchema } from "@/helpers/ValidationHelper";
import { cn } from "@/lib/utils";
import { updateAdmission } from "@/store/services/global-services";

export type PortfolioSchema = z.infer<typeof portfolioSchema>;

export type UploadedImage = {
  id: string;
  url: string;
  file: File | null;
};

type PortfolioFormProps = {
  admissionData?: AdmissionFormData;
  admissionId?: string;
};

const PortfolioForm = ({ admissionData, admissionId }: PortfolioFormProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const form_step3 = useForm<PortfolioSchema>({
    resolver: zodResolver(portfolioSchema),
    mode: "all",
    defaultValues: {
      Upload_Your_Portfolio: {
        images: [],
      },
      step_3: admissionData?.step_3 ?? false,
    },
  });

  const formRef = useRef(form_step3);
  const router = useRouter();

  const { handleSubmit, formState } = form_step3;
  const { errors } = formState;

  useEffect(() => {
    if (!admissionData?.Upload_Your_Portfolio?.images) return;

    const apiImages = admissionData.Upload_Your_Portfolio.images.map((img) => ({
      id: img.id.toString(),
      url: img.url,
      file: null,
    }));

    setImages(apiImages);

    formRef?.current?.setValue(
      "Upload_Your_Portfolio.images",
      apiImages.map((i) => ({ id: Number(i.id) })),
      { shouldValidate: true },
    );
  }, [admissionData]);

  const handleFilesSelected = async (files: File[]) => {
    const MAX_SIZE = 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (file.size > MAX_SIZE) {
        notify({ success: false, message: `${file.name} exceeds 1MB limit` });
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    const formData = new FormData();

    validFiles.forEach((file) => {
      formData.append("files", file);
    });

    const uploadRes = await axios.post(
      `${process.env.BASE_URL}/upload`,
      formData,
    );

    const uploaded = uploadRes.data;

    const currentHf =
      form_step3.getValues("Upload_Your_Portfolio.images") || [];
    const uploadedIds = uploaded.map((u: UploadRes) => ({ id: u.id }));

    form_step3.setValue(
      "Upload_Your_Portfolio.images",
      [...currentHf, ...uploadedIds],
      { shouldValidate: true, shouldDirty: true },
    );

    const newStateImages = validFiles.map((file) => ({
      id: Math.random().toString(36).slice(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newStateImages]);
  };

  const handleRemoveImage = (index: number) => {
    const img = images[index];
    if (img?.file) URL.revokeObjectURL(img.url);

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    const hfImages = form_step3.getValues("Upload_Your_Portfolio.images") || [];
    const updatedHfImages = hfImages.filter((_, i: number) => i !== index);

    form_step3.setValue("Upload_Your_Portfolio.images", updatedHfImages, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (payload: PortfolioSchema) => {
    const filtered = filteredPayload(payload);

    const data = {
      ...filtered,
      step_3: true,
      Payment_Status: "Paid",
    };

    try {
      await updateAdmission(
        admissionData?.documentId as string,
        data as PortfolioSchema,
      );
      router.push(`/admission/${admissionId}/preview`);
    } catch (error) {
      notify({ success: false, message: error as string });
    }
  };

  return (
    <FormProvider {...form_step3}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-background p-8">
        <div className="mx-auto">
          <h1 className="text-2xl text-[#E97451] font-urbanist mb-8">
            Upload Your Portfolio
          </h1>

          <div className="grid grid-cols-1  sm:grid-cols-2 gap-8 mb-12">
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
                  {errors.Upload_Your_Portfolio.images.message}
                </p>
              )}
            </div>

            <div className="lg:pl-8">
              <ImageGrid
                images={images as UploadedImage[]}
                onRemove={handleRemoveImage}
              />
            </div>
          </div>

          <div className="flex justify-start gap-3 mt-10 pt-6">
            <ButtonWidget
              type="button"
              onClick={() =>
                router.push(`/admission/${admissionId}/education-details`)
              }
              className={cn(
                "px-6 py-2 3xl:px-12 3xl:py-6 3xl:h-12 bg-gray-200 border border-gray-300 text-black rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              )}
            >
              Back
            </ButtonWidget>

            <OrangeButtonWidget
              content="Review Application"
              className="xss:text-[12px] h-9 px-4"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default PortfolioForm;
