import type { Metadata } from "next";
import { getAdmissionsById } from "@/app/api/server";
import EducationDetailsForm from "@/components/sections/admission-form/_steps/education-details-form";
import { decryptCode } from "@/helpers/ConstantHelper";
import { redirect } from "next/navigation";
import { getBaseUrl } from "@/helpers/SeoHelper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = await getBaseUrl();

  return {
    title: "Education Details | Admission | LLA",
    description: "Complete your education details for admission at Light & Life Academy",
    alternates: {
      canonical: `${baseUrl}/admission/${id}/education-details`,
    },
  };
}

const EducationDetails = async (props: PageProps) => {
  const params = await props?.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  if (!admissionData) {
    return <div className="flex items-center justify-center">No Admission Found</div>;
  }

  if (admissionData?.step_1) {
    return <EducationDetailsForm admissionData={admissionData} admissionId={String(id) ?? null} />
  } else {
    redirect(`/admission/${id}/personal-details`);
  }
};

export default EducationDetails;
