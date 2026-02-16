import type { Metadata } from "next";
import { getAdmissionsById } from "@/app/api/server";
import PersonalDetailsForm from "@/components/sections/admission-form/_steps/personal-details-form";
import { decryptCode } from "@/helpers/ConstantHelper";
import { getBaseUrl } from "@/helpers/SeoHelper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = await getBaseUrl();

  return {
    title: "Personal Details | Admission | LLA",
    description: "Complete your personal details for admission at Light & Life Academy",
    alternates: {
      canonical: `${baseUrl}/admission/${id}/personal-details`,
    },
  };
}

const PersonalDetails = async (props: PageProps) => {
  const params = await props?.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  if (!admissionData) {
    return <div className="flex items-center justify-center">No Admission Found</div>;
  }

  return <PersonalDetailsForm admissionData={admissionData} admissionId={id} />;
};

export default PersonalDetails;
