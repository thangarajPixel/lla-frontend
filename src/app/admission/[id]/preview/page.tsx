import { getAdmissionsById } from "@/app/api/server";
import ReviewApplication from "@/components/sections/admission-form/_steps/preview-form";
import { decryptCode } from "@/helpers/ConstantHelper";
import { redirect } from "next/navigation";

const Preview = async (props: PageProps) => {
  const params = await props.params;
  const { id } = params;
  const { type } = await props.searchParams || { type: "" };
  
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  if (!admissionData) {
    return <div className="min-h-screen flex items-center justify-center">No Admission Found</div>;
  }

  if (admissionData?.step_3 || type === "admin") {
    return <ReviewApplication admissionData={admissionData} admissionId={id} pageType={type} />
  } else if (admissionData?.step_2) {
    redirect(`/admission/${id}/portfolio`);
  } else if (admissionData?.step_1) {
    redirect(`/admission/${id}/education-details`);
  } else {
    redirect(`/admission/${id}/personal-details`);
  }

};

export default Preview;
