import type { Metadata } from "next";
import { getFaqPageData } from "@/app/api/server";
import FaqSection from "@/components/sections/more/faq/FaqSection";

export const metadata: Metadata = {
  title: "FAQ - Light & Life Academy",
  description: "Frequently Asked Questions about Light & Life Academy",
};

const FaqPage = async () => {
  const { data: response } = await getFaqPageData();
  return <FaqSection data={response} />;
};

export default FaqPage;
