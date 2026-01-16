import type { Metadata } from "next";
import { getMediaPageData } from "@/app/api/server";
import { generateSeoMetadata } from "@/helpers/SeoHelper";
import MediaSection from "@/components/sections/more/media/MediaSection";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/in-the-media");
}

const Media = async () => {
  const params = { page: 1, per_page: 9 };
  const { data: response } = await getMediaPageData(params);
  if (response) return <MediaSection data={response} />;
};

export default Media;
