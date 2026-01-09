import type { Metadata } from "next";
import { getContactPageData } from "@/app/api/server";
import ContactSection from "@/components/sections/more/contact/ContactSection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/contact-us");
}

const ContactPage = async () => {
  const { data: response } = await getContactPageData();
  return <ContactSection data={response} />;
};

export default ContactPage;
