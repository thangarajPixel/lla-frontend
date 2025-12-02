"use client";
import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import { MultiStepForm } from "@/components/sections/admission-form/admission-form";
import { useGetAdmissionById } from "@/store/hooks/global-hooks";
import { decryptCode } from "@/helpers/ConstantHelper";

const ApplicationFormPage = () => {
  const pathName = usePathname();
  const params = pathName.split("/")[2];

  const admissionId = params && decryptCode(params);

  const { data } = useGetAdmissionById(Number(admissionId));

  const admissionData = data?.data as AdmissionFormData;

  return (
    <Fragment>
      <MultiStepForm admissionData={admissionData} />
    </Fragment>
  );
};

export default ApplicationFormPage;
