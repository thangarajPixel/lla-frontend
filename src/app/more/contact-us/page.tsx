import { getContactPageData } from "@/app/api/server";
import ContactSection from "@/components/sections/more/contact/ContactSection";

export const metadata = {
  title: "Contact Us | Light & Life Academy",
  description:
    "Get in touch with Light & Life Academy. We're here to help with your queries about our photography courses and admissions.",
};

 const ContactPage = async () => {
   const { data: response } = await getContactPageData();
   console.log("Contact Page Data:", response);
  return <ContactSection data={response} />;
}

export default ContactPage;