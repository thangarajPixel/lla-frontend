"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type FileUploadButtonProps = {
  label?: string;
  maxSize?: string;
  variant?: "dark" | "light";
  handleUpload?: (file: File, url: string) => void;
};

export function FileUploadButton({
  label,
  maxSize = "2MB",
  variant,
  handleUpload,
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement("img") as HTMLImageElement;
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // revoke object URL once loaded to free memory
        URL.revokeObjectURL(objectUrl);

        const maxWidth = 36000; // 12 inches @300dpi
        const maxHeight = 24000; // 8 inches @300dpi

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

    // if (!file.type.startsWith("image/")) {
    //     alert("Please upload a valid image.")
    //     return
    // }

    // 1️⃣ Validate file size (< 1MB)
    if (file.size > 3 * 1024 * 1024) {
      alert("File size must be less than 1MB.");
      return;
    }

    // 2️⃣ Validate dimensions (<= 12x8 inches → <= 3600x2400 px)
    const valid = await validateDimensions(file);
    if (!valid) return;

    // 3️⃣ Preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    handleUpload?.(file, url);
  };

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`flex items-center justify-center gap-2 w-full py-3 px-4 cursor-pointer rounded-lg transition-colors ${
          variant === "light"
            ? "border border-border text-muted-foreground hover:bg-muted"
            : "bg-gray-100 border border-[#969696]"
        }`}
      >
        <Upload className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        // accept="image/*"
        onChange={handleFileChange}
      />
      <p className="text-xs text-muted-foreground">
        Max. file size not more than {maxSize}.
      </p>

      {previewUrl && (
        <div className="relative w-[180px] h-[180px]">
          <Image
            src={previewUrl}
            width={100}
            height={100}
            alt="Preview"
            className="h-[180px] w-full object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute top-2 size-6 right-2 text-white bg-red-500 rounded-full p-1 text-sm flex items-center justify-center hover:bg-red-600 cursor-pointer"
            onClick={() => setPreviewUrl(null)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
