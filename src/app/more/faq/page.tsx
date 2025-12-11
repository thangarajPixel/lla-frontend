import type { Metadata } from "next";
import FaqSection from "@/components/sections/more/faq/FaqSection";
import { getFaqPageData } from "@/app/api/server";

export const metadata: Metadata = {
  title: "FAQ - Light & Life Academy",
  description: "Frequently Asked Questions about Light & Life Academy",
};

const FaqPage = async () => {
    const { data: response } = await getFaqPageData();
  return <FaqSection data={response} />;
}

export default FaqPage;
