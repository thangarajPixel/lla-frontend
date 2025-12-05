import Image from "next/image";
import type { ImageWidgetProps } from "./utils/widget";

const ImageWidget = ({ src, alt, ...props }: ImageWidgetProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      sizes="(max-width: 640px) 100vw, 50vw"
    />
  );
};

export default ImageWidget;
