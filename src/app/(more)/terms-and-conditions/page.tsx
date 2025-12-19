import { getTermsPageData } from "@/app/api/server";
import TermsAndConditionsSection from "@/components/sections/more/terms-and-conditions/TermsAndConditionsSection";

const TermsAndConditions = async () => {
  const { data: response } = await getTermsPageData();
  return <TermsAndConditionsSection data={response} />;
};

export default TermsAndConditions;
