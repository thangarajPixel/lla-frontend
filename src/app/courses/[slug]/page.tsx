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
  try {
    const { slug } = await params;
    const response = await getCourseBySlug(slug);
    const seoData = response?.data?.SeoViewCard;
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");
    
    return {
      title: seoData?.Title || "Course | LLA",
      description:
        seoData?.Description ||
        "Professional Photography Course at Light & Life Academy",
      keywords: seoData?.KeyWords || undefined,
      alternates: {
        canonical: `${baseUrl}/courses/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating course metadata:", error);
    const { slug } = await params;
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");
    return {
      title: "Course | LLA",
      description: "Professional Photography Course at Light & Life Academy",
      alternates: {
        canonical: `${baseUrl}/courses/${slug}`,
      },
    };
  }
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
