import { Fragment } from "react";
import { getCourseBySlug } from "@/app/api/server";
import CourseSection from "@/components/sections/courses/CourseSection";
import CourseAdmissionFormSection from "@/components/sections/courses/utils/CourseAdmissionFormSection";

const CourseBySlug = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const response = await getCourseBySlug(slug);

  if (!response?.data) return null;
  return (
    <Fragment>
      <CourseSection data={response?.data} />
      <CourseAdmissionFormSection />
    </Fragment>
  );
};

export default CourseBySlug;
