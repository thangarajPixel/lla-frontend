"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ImageGrid } from "@/components/sections/admission-form/_components/image-grid";
import { UploadArea } from "@/components/sections/admission-form/_components/upload-area";
import { toast } from "@/components/sections/admission-form/_components/use-toast";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import { cn } from "@/lib/utils";
import {
  type ApplicationFormSchema_Step3,
  applicationFormSchema_Step3,
} from "@/validations/multi-step-form";

interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

type Step3FormProps = {
  onPrevStep: () => void;
  onPreview: () => void;
};

const FormStep3 = ({ onPrevStep, onPreview }: Step3FormProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const form_step3 = useForm<ApplicationFormSchema_Step3>({
    resolver: zodResolver(applicationFormSchema_Step3),
    mode: "all",
    defaultValues: {
      portfolio: undefined,
    },
  });

  const { handleSubmit } = form_step3;

  const handleFilesSelected = (files: File[]) => {
    const MAX_SIZE = 3 * 1024 * 1024; // 1MB in bytes

    const validFiles = files.filter((file) => {
      if (file.size > MAX_SIZE) {
        alert(`File ${file.name} exceeds 1MB limit`);
        toast({
          title: "File too large",
          description: `${file.name} exceeds 1MB limit`,
          //   variant: "destructive",
        });
        return false;
      }
      return true;
    });

    const newImages = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const onSubmit = async (payload: ApplicationFormSchema_Step3) => {
    console.log("Server response:", payload);
    onPreview();
    alert("Application submitted successfully!");
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
            </div>

            <div className="lg:pl-8">
              <ImageGrid images={images} onRemove={handleRemoveImage} />
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
