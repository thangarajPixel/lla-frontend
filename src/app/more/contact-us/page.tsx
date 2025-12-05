import dynamic from "next/dynamic";

const ContactSection = dynamic(
  () => import("@/components/sections/more/contact/ContactSection"),
  { ssr: true },
);

export const metadata = {
  title: "Contact Us | Light & Life Academy",
  description:
    "Get in touch with Light & Life Academy. We're here to help with your queries about our photography courses and admissions.",
};

export default function ContactPage() {
  return <ContactSection />;
}
