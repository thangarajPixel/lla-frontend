"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ImageWidget from "@/components/widgets/ImageWidget";
import { UploadIconImg } from "@/helpers/ImageHelper";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

export const UploadArea = ({ onFilesSelected }: UploadAreaProps) => {
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
      className="border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-4 bg-card hover:border-primary/50"
    >
      <ImageWidget src={UploadIconImg} alt="Upload" className="h-10 w-10" />

      <p className="text-sm text-muted-foreground">Drag & drop images here</p>

      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-full px-8"
      >
        Select Images
      </Button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};
