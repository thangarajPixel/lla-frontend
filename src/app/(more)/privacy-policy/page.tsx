import type { Metadata } from "next";
import { getPrivacyPageData } from "@/app/api/server";
import PrivacyPolicySection from "@/components/sections/more/privacy-policy/PrivacyPolicySection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/privacy-policy");
}

const PrivacyPolicy = async () => {
  const { data: response } = await getPrivacyPageData();
  return <PrivacyPolicySection data={response} />;
};

export default PrivacyPolicy;
