import { getAdmissionsById } from "@/app/api/server";
import PortfolioForm from "@/components/sections/admission-form/_steps/portfolio-form";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { decryptCode } from "@/helpers/ConstantHelper";

const Portfolio = async (props: PageProps) => {
  const params = await props.params;
  const { id } = params;
  const admissionId = params && decryptCode(id);

  const admissionResponse = await getAdmissionsById(Number(admissionId));

  const admissionData = admissionResponse?.data as AdmissionFormData;
  return (
    <ScrollWidget>
      <PortfolioForm admissionData={admissionData} admissionId={id} />
    </ScrollWidget>
  );
};

export default Portfolio;
