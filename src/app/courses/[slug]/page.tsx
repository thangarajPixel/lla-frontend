import { getCourseBySlug } from "@/app/api/server";
import CourseSection from "@/components/sections/courses/CourseSection";

const CourseBySlug = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const response = await getCourseBySlug(slug);

  if (!response?.data) return null;
  return <CourseSection data={response?.data} />;
};

export default CourseBySlug;
