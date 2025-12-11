import { getPrivacyPageData } from "@/app/api/server";
import PrivacyPolicySection from "@/components/sections/more/privacy-policy/PrivacyPolicySection";

const PrivacyPolicy = async () => {
  const { data: response } = await getPrivacyPageData();
  return <PrivacyPolicySection data={response} />;
};

export default PrivacyPolicy;
