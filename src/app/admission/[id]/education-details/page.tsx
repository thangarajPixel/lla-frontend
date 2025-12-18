import { getAdmissionsById } from "@/app/api/server";
import EducationDetailsForm from "@/components/sections/admission-form/_steps/education-details-form";
import { decryptCode } from "@/helpers/ConstantHelper";

const EducationDetails = async (props: PageProps) => {
  const params = await props?.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  return (
    <EducationDetailsForm
      admissionData={admissionData}
      admissionId={String(id) ?? null}
    />
  );
};

export default EducationDetails;
