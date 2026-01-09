import type { Metadata } from "next";
import { getFaqPageData } from "@/app/api/server";
import FaqSection from "@/components/sections/more/faq/FaqSection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/faq");
}

const FaqPage = async () => {
  const { data: response } = await getFaqPageData();
  return <FaqSection data={response} />;
};

export default FaqPage;
