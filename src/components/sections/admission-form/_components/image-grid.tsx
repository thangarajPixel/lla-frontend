"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { UploadedImage } from "@/components/sections/admission-form/_steps/portfolio-form";
import { Button } from "@/components/ui/button";

interface ImageGridProps {
  images: UploadedImage[];
  onRemove: (index: number) => void;
}

export const ImageGrid = ({ images, onRemove }: ImageGridProps) => {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-6">
      {images.map((image, index) => (
        <div key={image.id} className="relative group">
          <div className=" w-full border overflow-hidden">
            <Image
              src={image.url}
              alt="Portfolio Image"
              width={500}
              height={1000}
              className="object-contain"
            />
          </div>

          <Button
            type="button"
            size="icon"
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-chart-1 text-white shadow-md hover:bg-chart-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
