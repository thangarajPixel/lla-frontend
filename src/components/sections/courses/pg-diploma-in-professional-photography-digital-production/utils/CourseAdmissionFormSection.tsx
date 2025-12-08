"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import { notify } from "@/helpers/ConstantHelper";
import type { CourseFormData } from "./types";
import { clientAxios } from "@/helpers/AxiosHelper";
import { getEssentialsData } from "@/app/api/server";

const CourseAdmissionFormSection = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (formValues: CourseFormData): string | null => {
    if (!formValues.name || formValues.name.trim() === "") {
      return "Name is required";
    }

    if (!formValues.mobile || formValues.mobile.trim() === "") {
      return "Mobile number is required";
    }

    const cleanedMobile = formValues.mobile.replace(/\D/g, "");
    if (cleanedMobile.length !== 10) {
      return "Please enter a valid 10-digit mobile number";
    }

    if (!formValues.emailAddress || formValues.emailAddress.trim() === "") {
      return "Email address is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.emailAddress)) {
      return "Please enter a valid email address";
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues: CourseFormData = {
      name: (formData.get("name") as string) || "",
      mobile: (formData.get("mobile") as string) || "",
      emailAddress: (formData.get("emailAddress") as string) || "",
      message: (formData.get("message") as string) || "",
    };

    const isAdmissionOpen = await getEssentialsData();

    console.log(isAdmissionOpen?.data, "essential data in get in touch");

    const data = {
      first_name: formValues.name,
      mobile_no: formValues.mobile,
      email: formValues.emailAddress,
      // message: formValues.message,
      step_0: true,
    }

    if (isAdmissionOpen?.data?.isAdmission) {
      const res = await clientAxios.post(`/admissions`, { data: data });
      // const res = await createAdmission(data as any);
      const resData = await res?.data;
      console.log(resData, "step1, response")
    } else {
      const res = await clientAxios.post(`/contacts`, { data: data });
      const resData = await res?.data;
      console.log(resData, "step2 res");
    }

    const validationError = validateForm(formValues);
    if (validationError) {
      notify({
        success: false,
        message: validationError,
      });
      return;
    }

    const queryParams = new URLSearchParams({
      name: formValues.name,
      mobile: formValues.mobile,
      email: formValues.emailAddress,
      message: formValues.message || "",
    });

    router.push(`/admission?${queryParams.toString()}`);

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#E97451] z-70 h-auto min-h-[80px] md:h-25 flex items-center py-3 md:py-0">
      <ContainerWidget>
        <h3 className="text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[15px] 3xl:text-[18px] font-semibold mb-2 md:mb-2 text-center md:text-left">
          Get In Touch
        </h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:flex font-mulish gap-2 md:gap-3 items-stretch md:items-center md:justify-between"
        >
          <Input
            type="text"
            name="name"
            placeholder="Name*"
            className="w-full md:flex-1 md:min-w-[120px] space-y-0"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            notRequired={false}
          />
          <Input
            type="tel"
            name="mobile"
            placeholder="Mobile No*"
            className="w-full md:flex-1 md:min-w-[120px] space-y-0"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            notRequired={false}
          />
          <Input
            type="email"
            name="emailAddress"
            placeholder="Email Address*"
            className="w-full md:flex-1 md:min-w-[120px] space-y-0"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            notRequired={false}
          />
          <Input
            type="text"
            name="message"
            placeholder="Message"
            className="w-full md:flex-1 md:min-w-[120px] space-y-0"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            notRequired={true}
          />
          <button
            type="submit"
            className="col-span-2 md:col-span-1 group font-bold cursor-pointer flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-white text-[#E97451] rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] hover:bg-gray-100 transition-colors h-9 w-full md:w-auto"
          >
            Submit
            <ArrowRight className="w-[14px] h-[14px] md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </ContainerWidget>
    </div>
  );
};

export default CourseAdmissionFormSection;
