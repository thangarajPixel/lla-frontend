import { getCourseBySlug } from "@/app/api/server";

const CourseBySlug = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const response = await getCourseBySlug(slug);
  console.log(response);
  return <div>CourseBySlug</div>;
};

export default CourseBySlug;
