"use client";

import Image from "next/image";

interface ImageWidgetProps {
  src: string | { light: string; dark: string };
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  isScrolled?: boolean;
  priority?: boolean;
}

export default function ImageWidget({
  src,
  alt = "Image",
  width = 47,
  height = 60,
  className = "",
  isScrolled = false,
  priority = false,
}: ImageWidgetProps) {
  // Handle conditional source (light/dark or scrolled)
  const imageSrc =
    typeof src === "string"
      ? src
      : isScrolled
      ? src.dark
      : src.light;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
