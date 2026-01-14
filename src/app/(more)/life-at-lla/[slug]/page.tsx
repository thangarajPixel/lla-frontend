import type { Metadata } from "next";
import { getLifeById } from "@/app/api/server";
import LifeDetailSection from "@/components/sections/more/life-at-lla/LifeDetailSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { data: response } = await getLifeById(slug);
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");
    console.log('response',response)
    return {
      title: response?.card?.SeoViewCard?.Title || "Life at LLA",
      description: response?.card?.SeoViewCard?.Description || "Life at Light & Life Academy",
      keywords: response?.card?.SeoViewCard?.KeyWords || undefined,
      alternates: {
        canonical: `${baseUrl}/life-at-lla/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating life-at-lla metadata:", error);
    const { slug } = await params;
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");
    return {
      title: "Life at LLA",
      description: "Life at Light & Life Academy",
      alternates: {
        canonical: `${baseUrl}/life-at-lla/${slug}`,
      },
    };
  }
}

const LifeAtLlaDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data: response } = await getLifeById(slug);
  if (!response?.card) return null;
  return <LifeDetailSection data={response} />;
};

export default LifeAtLlaDetail;
