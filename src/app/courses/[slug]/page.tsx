import type { Metadata } from "next";
import { Fragment } from "react";
import { getCourseBySlug } from "@/app/api/server";
import CourseSection from "@/components/sections/courses/CourseSection";
import CourseAdmissionFormSection from "@/components/sections/courses/utils/CourseAdmissionFormSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const response = await getCourseBySlug(slug);
  const seoData = response?.data?.SeoViewCard;
  return {
    title: seoData.Title || "Course | LLA",
    description:
      seoData.Description ||
      "Professional Photography Course at Light & Life Academy",
    keywords: seoData.KeyWords || undefined,
  };
}

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
      <CourseAdmissionFormSection selectedCourse={response?.data?.courseList} />
    </Fragment>
  );
};

export default CourseBySlug;
