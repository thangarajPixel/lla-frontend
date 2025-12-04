import GallerySection from "@/components/sections/gallery/GallerySection";
import { getGalleryPageData } from "../api/server";

const Gallery = async () => {
  const [{ data: response }] = await Promise.all([getGalleryPageData()]);

  if (response) return <GallerySection data={response} />;
};

export default Gallery;
