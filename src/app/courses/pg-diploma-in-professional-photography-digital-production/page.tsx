import { getCoursePageData } from "@/app/api/server";
import PgDiplomaInProfessionalPhotographyDigitalProductionSection from "@/components/sections/courses/pg-diploma-in-professional-photography-digital-production/PgDiplomaInProfessionalPhotographyDigitalProductionSection";

const PgDiplomaInProfessionalPhotographyDigitalProduction = async () => {
  const [{ data: response }] = await Promise.all([getCoursePageData()]);

  if (response?.Course?.[0])
    return (
      <PgDiplomaInProfessionalPhotographyDigitalProductionSection
        data={response?.Course?.[0]}
      />
    );
};

export default PgDiplomaInProfessionalPhotographyDigitalProduction;
