import PersonalDetailsForm from "@/components/sections/admission-form/_steps/personal-details-form";
import { getCourseBySlug } from "../api/server";

const AdmissionFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ course: string }>;
}) => {
  const { course } = await searchParams;

  const response = await getCourseBySlug((course as string) ?? "");

  return (
    <PersonalDetailsForm
      courseId={response?.data?.courseList?.documentId ?? ""}
    />
  );
};

export default AdmissionFormPage;
