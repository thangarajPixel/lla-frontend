import type { Metadata } from "next";
import FaqSection from "@/components/sections/more/faq/FaqSection";

export const metadata: Metadata = {
  title: "FAQ - Light & Life Academy",
  description: "Frequently Asked Questions about Light & Life Academy",
};

export default function FaqPage() {
  return <FaqSection />;
}
