import { getAdmissionsById } from "@/app/api/server";
import PersonalDetailsForm from "@/components/sections/admission-form/_steps/personal-details-form";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { decryptCode } from "@/helpers/ConstantHelper";

const PersonalDetails = async (props: PageProps) => {
  const params = await props.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;

  return (
    <ScrollWidget>
      <PersonalDetailsForm admissionData={admissionData} admissionId={id} />
    </ScrollWidget>
  );
};

export default PersonalDetails;
