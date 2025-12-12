import { getFacultyBySlug } from "@/app/api/server";
import FacultyViewSection from "@/components/sections/faculty/utils/FacultyViewSection";

const View = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const response = await getFacultyBySlug(slug, "1");

  if (!response?.data) return null;
  return <FacultyViewSection data={response?.data} />;
};

export default View;
