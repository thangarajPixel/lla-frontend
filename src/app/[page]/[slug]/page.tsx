import { getFacultyBySlug } from "@/app/api/server";
import FacultyViewSection from "@/components/sections/faculty/utils/FacultyViewSection";

const View = async ({
  params,
}: {
  params: Promise<{ page: string; slug: string }>;
}) => {
  const { page, slug } = await params;
  const response = await getFacultyBySlug(page, slug, "1");
  if (!response?.data) return null;
  return <FacultyViewSection data={response?.data} type={page} />;
};

export default View;
