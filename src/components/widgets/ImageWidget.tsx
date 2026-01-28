import Image from "next/image";
import type { ImageWidgetProps } from "./utils/widget";

const ImageWidget = ({ src, alt, ...props }: ImageWidgetProps) => {
  return <Image src={src} alt={alt} {...props} sizes="100vw" 
   priority={false}
      quality={100}
      loading='lazy'
  />;
};

export default ImageWidget;
