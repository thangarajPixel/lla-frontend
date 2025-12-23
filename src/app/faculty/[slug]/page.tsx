import { getFacultyFounderBySlug } from "@/app/api/server";
import FounderViewSection from "@/components/sections/faculty/utils/FounderViewSection";

const FounderDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data: response } = await getFacultyFounderBySlug(slug);
  return <FounderViewSection data={response} />;
};
export default FounderDetail;
