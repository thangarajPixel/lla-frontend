"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageGridProps {
  images: Array<{ id: string; url: string; file: File }>;
  onRemove: (index: number) => void;
}

export const ImageGrid = ({ images, onRemove }: ImageGridProps) => {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-8">
      {images.map((image, index) => (
        <div key={image.id} className="relative group">
          <div className="aspect-square rounded-xl overflow-hidden">
            <Image
              // fill
              height={200}
              width={200}
              src={image.url}
              alt="Portfolio upload"
              className="w-full h-full object-contain"
            />
          </div>
          <Button
            onClick={() => onRemove(index)}
            size="icon"
            className="absolute -top-2 -right-2 size-5 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
