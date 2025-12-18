import { getAdmissionsById } from "@/app/api/server";
import PersonalDetailsForm from "@/components/sections/admission-form/_steps/personal-details-form";
import { decryptCode } from "@/helpers/ConstantHelper";

const PersonalDetails = async (props: PageProps) => {
  const params = await props?.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  return <PersonalDetailsForm admissionData={admissionData} admissionId={id} />;
};

export default PersonalDetails;
