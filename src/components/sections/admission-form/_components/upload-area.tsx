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
      onClick={() => inputRef.current?.click()}
      className="h-[188px] md:h-[200px] 3xl:h-[227px] border border-[#969696] rounded-xl p-4 flex flex-col justify-center items-center gap-3 bg-[#F7F7F7] hover:border-primary/50 cursor-pointer"
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      ) : (
        <>
          <ImageWidget src={UploadIconImg} alt="Upload" className="h-[30px] w-[30px]" />

          <p className="text-sm text-muted-foreground">Drag & Drop here</p>

          <p className="text-xs 3xl:text-sm text-muted-foreground font-medium text-nowrap">
            Max file size per image is 1 MB
          </p>

          <Button
            type="button"
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
