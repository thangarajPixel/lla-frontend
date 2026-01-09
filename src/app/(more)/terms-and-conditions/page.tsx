import type { Metadata } from "next";
import { getTermsPageData } from "@/app/api/server";
import TermsAndConditionsSection from "@/components/sections/more/terms-and-conditions/TermsAndConditionsSection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/terms-and-conditions");
}

const TermsAndConditions = async () => {
  const { data: response } = await getTermsPageData();
  return <TermsAndConditionsSection data={response} />;
};

export default TermsAndConditions;
