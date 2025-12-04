import { getAdmissionsById } from "@/app/api/server";
import ReviewApplication from "@/components/sections/admission-form/_steps/preview-form";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { decryptCode } from "@/helpers/ConstantHelper";

const Preview = async (props: PageProps) => {
  const params = await props.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;
  return (
    <ScrollWidget>
      <ReviewApplication admissionData={admissionData} admissionId={id} />
    </ScrollWidget>
  );
};

export default Preview;
