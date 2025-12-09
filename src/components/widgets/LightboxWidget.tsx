"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import { cn } from "@/lib/utils";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import ImageWidget from "./ImageWidget";

type ImageType = {
  src: StaticImageData | string;
  width?: number;
  height?: number;
  alt?: string;
};

const mapImages = (images: ImageType[]): SlideImage[] => {
  return images.map((image) => ({
    src: typeof image.src === "string" ? image.src : image.src.src,
    width: image.width,
    height: image.height,
    alt: image.alt,
  }));
};

type Props = {
  images: ImageType[];
  className?: string;
  renderImage?: (
    image: ImageType,
    index: number,
    onClick: () => void,
  ) => React.ReactNode;
  children?: (openLightbox: (index: number) => void) => React.ReactNode;
};

export default function LightboxWidget({
  images,
  className,
  renderImage,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const originalOverflowRef = useRef<string | null>(null);

  const handleOpen = (i: number) => {
    if (i >= 0 && i < images.length) {
      setIndex(i);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (open) {
      // Save current body overflow style
      originalOverflowRef.current = window.getComputedStyle(
        document.body,
      ).overflow;
      // Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when lightbox closes
      document.body.style.overflow = originalOverflowRef.current || "";
      originalOverflowRef.current = null;
    }

    // Cleanup: restore body scroll when component unmounts
    return () => {
      if (originalOverflowRef.current !== null) {
        document.body.style.overflow = originalOverflowRef.current;
        originalOverflowRef.current = null;
      }
    };
  }, [open]);

  return (
    <>
      {children ? (
        children(handleOpen)
      ) : renderImage ? (
        images.map((img, i) => (
          // biome-ignore lint/a11y/useSemanticElements: renderImage controls the content, div is needed for layout
          <div
            key={typeof img.src === "string" ? img.src : img.src.src || i}
            role="button"
            tabIndex={0}
            onClick={() => handleOpen(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen(i);
              }
            }}
          >
            {renderImage(img, i, () => handleOpen(i))}
          </div>
        ))
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            // biome-ignore lint/a11y/useSemanticElements: button would break grid layout styling
            <div
              key={typeof img.src === "string" ? img.src : img.src.src || i}
              role="button"
              tabIndex={0}
              onClick={() => handleOpen(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(i);
                }
              }}
              className="cursor-pointer"
            >
              <ImageWidget
                src={img.src}
                alt={img.alt || `Gallery image ${i + 1}`}
                className={cn(
                  `rounded-lg object-cover w-[300px] h-[200px] ${className}`,
                )}
              />
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <Lightbox
          open={open}
          close={handleClose}
          index={index}
          slides={mapImages(images)}
          plugins={[Zoom]}
          zoom={{ maxZoomPixelRatio: 3 }}
        />
      )}
    </>
  );
}
