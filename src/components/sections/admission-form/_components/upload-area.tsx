"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ImageWidget from "@/components/widgets/ImageWidget";
import { UploadIconImg } from "@/helpers/ImageHelper";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  loading?: boolean;
}

export const UploadArea = ({ onFilesSelected, loading }: UploadAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onFilesSelected(Array.from(files));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      aria-hidden
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border border-[#969696] rounded-xl p-12 flex flex-col items-center gap-4 bg-[#F7F7F7] hover:border-primary/50"
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      ) : (
        <>
          <ImageWidget src={UploadIconImg} alt="Upload" className="h-10 w-10" />

          <p className="text-sm text-muted-foreground">Drag & Drop here</p>

          <p className="text-xs 3xl:text-sm text-muted-foreground">
            Image must be less than 1MB
          </p>

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full px-4 py-2 bg-[#E97451]"
          >
            Select File
          </Button>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}
    </div>
  );
};
