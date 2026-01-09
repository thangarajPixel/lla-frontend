import type { Metadata } from "next";
import GallerySection from "@/components/sections/gallery/GallerySection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";
import { getGalleryPageData } from "../api/server";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/gallery");
}

const Gallery = async () => {
  const [{ data: response }] = await Promise.all([getGalleryPageData()]);

  if (response) return <GallerySection data={response} />;
};

export default Gallery;
