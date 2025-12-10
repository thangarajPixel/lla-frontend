import { redirect } from "next/navigation";
import { getAdmissionsById } from "@/app/api/server";
import { decryptCode } from "@/helpers/ConstantHelper";

export default async function AdmissionDetails(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;


  if (!admissionData) {
    return (
      <div className="text-center mt-10">Admission Not Found</div>
    )
  }

  if (admissionData?.step_3) {
    redirect(`/admission/${id}/preview`);
  } else if (admissionData?.step_2) {
    redirect(`/admission/${id}/portfolio`);
  } else if (admissionData?.step_1) {
    redirect(`/admission/${id}/education-details`);
  }

  redirect(`/admission/${id}/personal-details`);
}
