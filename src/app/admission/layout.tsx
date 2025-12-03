import AdmissionFormLayout from "@/components/sections/admission-form/_components/admission-form-layout";

const AdmissionFormRootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AdmissionFormLayout>{children}</AdmissionFormLayout>;
};

export default AdmissionFormRootLayout;
