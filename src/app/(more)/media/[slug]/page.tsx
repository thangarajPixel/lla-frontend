import { getMediaBySlug } from "@/app/api/server";
import MediaDetailSection from "@/components/sections/more/media/MediaDetailSection";

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
