import { getAdmissionsById } from "@/app/api/server";
import EducationDetailsForm from "@/components/sections/admission-form/_steps/education-details-form";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { decryptCode } from "@/helpers/ConstantHelper";

const EducationDetails = async (props: PageProps) => {
  const params = await props?.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  return (
    <ScrollWidget>
      <EducationDetailsForm admissionData={admissionData} admissionId={String(id) ?? null} />
    </ScrollWidget>
  );
};

export default EducationDetails;
