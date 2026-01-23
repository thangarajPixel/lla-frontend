import type { Metadata } from "next";
import GallerySection from "@/components/sections/gallery/GallerySection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";
import { getGalleryPageData } from "../api/server";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/gallery");
}

const Gallery = async () => {
  const params = { page: 1, per_page: 30 }
  const [{ data: response }] = await Promise.all([getGalleryPageData(params)]);

  if (!response) return null;

  if (response) return <GallerySection data={response} />;
};

export default Gallery;
