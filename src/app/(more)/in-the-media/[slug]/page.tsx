import type { Metadata } from "next";
import { getMediaBySlug } from "@/app/api/server";
import MediaDetailSection from "@/components/sections/more/media/MediaDetailSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { data: response } = await getMediaBySlug(slug);
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");

    return {
      title: response?.card?.SeoViewCard?.Title || "Media | LLA",
      description: response?.card?.SeoViewCard?.Description || "Light & Life Academy in the Media",
      keywords: response?.card?.SeoViewCard?.KeyWords || undefined,
      alternates: {
        canonical: `${baseUrl}/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating media metadata:", error);
    const { slug } = await params;
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");
    return {
      title: "Media | LLA",
      description: "Light & Life Academy in the Media",
      alternates: {
        canonical: `${baseUrl}/media/${slug}`,
      },
    };
  }
}

const MediaDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data: response } = await getMediaBySlug(slug);
  return <MediaDetailSection data={response} />;
};

export default MediaDetail;
