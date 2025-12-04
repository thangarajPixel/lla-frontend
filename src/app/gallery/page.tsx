import GallerySection from "@/components/sections/gallery/GallerySection";
import { getGalleryPageData } from "../api/server";

const Gallery = async () => {
  const [{ data: response }] = await Promise.all([getGalleryPageData()]);

  console.log(response);
  return <GallerySection />;
};

export default Gallery;
