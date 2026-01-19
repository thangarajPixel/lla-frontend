"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { UploadedImage } from "@/components/sections/admission-form/_steps/portfolio-form";
import { Button } from "@/components/ui/button";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageWidget from "@/components/widgets/ImageWidget";

interface ImageGridProps {
  images: UploadedImage[];
  onRemove: (index: number) => void;
}

export const ImageGrid = ({ images, onRemove }: ImageGridProps) => {
  if (images.length === 0) return null;

  return (
    <>
      <div className="hidden grid-cols-2 gap-6">
        {images?.map((image, index) => (
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
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#E97451] text-white shadow-md hover:bg-chart-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div>
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 2,
            // 640: 2,
          }}
        >
          <Masonry gutter="24px">
            {images?.map(
              (image, index) => {
                if (!image?.url) return null;
                const imageAlt =
                  image?.file?.name || `Portfolio ${index + 1}`;
                return (
                  <div
                    key={`portfolio-${image.id || index}`}
                    className="relative w-full -mx-0.5"
                    style={{ padding: "3px" }}
                  >
                    <div className="relative w-full overflow-hidden">
                      <ImageWidget
                        src={image.url ?? null}
                        alt={imageAlt}
                        width={600}
                        height={800}
                        className="object-cover w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>

                    <Button
                      type="button"
                      size="icon"
                      onClick={() => onRemove(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#E97451] text-white shadow-md hover:bg-chart-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              },
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};
