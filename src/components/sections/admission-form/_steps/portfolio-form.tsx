"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { useCourseStore } from "@/store/zustand";

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

const MAX_IMAGES = 20;
const MAX_SIZE = 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const PortfolioForm = ({ admissionData, admissionId }: PortfolioFormProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PortfolioSchema>({
    resolver: zodResolver(portfolioSchema),
    mode: "all",
    defaultValues: {
      Upload_Your_Portfolio: { images: [] },
      step_3: admissionData?.step_3 ?? false,
    },
  });

  const { handleSubmit, setValue, getValues, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (!admissionData?.Upload_Your_Portfolio?.images) return;

    const apiImages: UploadedImage[] =
      admissionData.Upload_Your_Portfolio.images.map((img) => ({
        id: String(img.id),
        url: img.url,
        file: null,
      }));

    setImages(apiImages);

    setValue(
      "Upload_Your_Portfolio.images",
      apiImages.map((i) => ({ id: Number(i.id) })),
      { shouldValidate: true },
    );
  }, [admissionData, setValue]);

  useEffect(() => {
    if (admissionData?.Course?.Name) {
      useCourseStore.setState({ courseName: admissionData.Course.Name });
    }
  }, [admissionData]);

  const handleFilesSelected = async (files: File[]) => {
    const totalImages = images.length + files.length;

    if (totalImages > MAX_IMAGES) {
      notify({
        success: false,
        message: `Only ${MAX_IMAGES} images are allowed`,
      });
      return;
    }

    const validFiles = files.filter((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        notify({ success: false, message: `${file.name} is not supported` });
        return false;
      }

      if (file.size > MAX_SIZE) {
        notify({ success: false, message: `${file.name} exceeds 1MB` });
        return false;
      }

      return true;
    });

    if (!validFiles.length) return;

    const currentHf = getValues("Upload_Your_Portfolio.images") ?? [];

    // ✅ temporary values to prevent validation error
    const tempValues = validFiles.map(() => ({ id: crypto.randomUUID() }));

    setValue(
      "Upload_Your_Portfolio.images",
      [...currentHf, ...tempValues.map((value) => ({ id: Number(value.id) }))],
      { shouldDirty: true, shouldValidate: true },
    );

    const formData = new FormData();
    // validFiles.forEach((file) => formData.append("files", file));

    for (const file of validFiles) {
      formData.append("files", file);
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.BASE_URL}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const uploadedIds = data.map((u: UploadRes) => ({ id: u.id }));

      // ✅ replace temp ids with real ids
      setValue("Upload_Your_Portfolio.images", [...currentHf, ...uploadedIds], {
        shouldDirty: true,
        shouldValidate: true,
      });

      setImages((prev) => [
        ...prev,
        ...validFiles.map((file) => ({
          id: crypto.randomUUID(),
          url: URL.createObjectURL(file),
          file,
        })),
      ]);
    } catch (error) {
      console.error(error);
      notify({ success: false, message: "Image upload failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const img = prev[index];
      if (img?.file) URL.revokeObjectURL(img.url);
      return prev.filter((_, i) => i !== index);
    });

    const hfImages = getValues("Upload_Your_Portfolio.images") ?? [];
    setValue(
      "Upload_Your_Portfolio.images",
      hfImages.filter((_, i) => i !== index),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const onSubmit = async (payload: PortfolioSchema) => {
    try {
      await updateAdmission(
        admissionData?.documentId as string,
        {
          ...filteredPayload(payload),
          step_3: true,
          Payment_Status: "Pending",
          EncryptId: admissionId,
        } as PortfolioSchema,
      );

      router.push(`/admission/${admissionId}/preview`);
    } catch (error) {
      notify({ success: false, message: error as string });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background py-8 px-2"
      >
        <h1 className="text-2xl 3xl:text-[32px] text-[#E97451] font-urbanist mb-8">
          Upload Your Portfolio
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div>
            <label
              htmlFor="images"
              className="block text-black text-base 3xl:text-lg mb-4"
            >
              Upload Images<span className="text-destructive">*</span>
            </label>

            <UploadArea
              onFilesSelected={handleFilesSelected}
              loading={loading}
            />

            <p className="text-xs text-muted-foreground mt-2">
              20 of your best images showcasing your work and creativity. Please
              note that the objective is to assess your photography vision. We
              are not looking for technically advanced images. Please include a
              variety of subjects.
            </p>

            {errors.Upload_Your_Portfolio?.images && (
              <p className="text-sm text-destructive mt-2">
                {errors.Upload_Your_Portfolio.images.message}
              </p>
            )}
          </div>

          <ImageGrid images={images} onRemove={handleRemoveImage} />
        </div>

        {admissionData?.Payment_Status !== "Paid" && (
          <div className="flex justify-start gap-3 mt-10 pt-6">
            <ButtonWidget
              type="button"
              onClick={() =>
                router.push(`/admission/${admissionId}/education-details`)
              }
              className={cn(
                "p-5 w-[95px] 3xl:w-[123px] 3xl:h-[50px] text-lg bg-gray-200 border border-gray-300 text-black rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              )}
            >
              <ArrowLeft className="size-5" />
              Back
            </ButtonWidget>

            <OrangeButtonWidget
              content="Review Application"
              className="xss:text-[18px] xss:h-10 3xl:h-12.5 text-[18px] 2xl:text-[18px] 3xl:text-[18px]"
            />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default PortfolioForm;
