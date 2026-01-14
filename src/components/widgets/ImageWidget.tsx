import Image from "next/image";
import type { ImageWidgetProps } from "./utils/widget";

const ImageWidget = ({ 
  src, 
  alt, 
  priority = false,
  quality = 85,
  loading = "lazy",
  ...props 
}: ImageWidgetProps) => {
  return (
    <Image 
      src={src} 
      alt={alt} 
      priority={priority}
      quality={quality}
      loading={loading}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      {...props} 
    />
  );
};

export default ImageWidget;
