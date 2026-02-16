import type { Metadata } from "next";
import { getAdmissionsById } from "@/app/api/server";
import PortfolioForm from "@/components/sections/admission-form/_steps/portfolio-form";
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
    title: "Portfolio | Admission | LLA",
    description: "Upload your portfolio for admission at Light & Life Academy",
    alternates: {
      canonical: `${baseUrl}/admission/${id}/portfolio`,
    },
  };
}

const Portfolio = async (props: PageProps) => {
  const params = await props.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  if (!admissionData) {
    return <div className="flex items-center justify-center">No Admission Found</div>;
  }

  if (admissionData?.step_2) {
    return <PortfolioForm admissionData={admissionData} admissionId={id} />
  } else if (admissionData?.step_1) {
    redirect(`/admission/${id}/education-details`);
  } else {
    redirect(`/admission/${id}/personal-details`);
  }

};

export default Portfolio;
