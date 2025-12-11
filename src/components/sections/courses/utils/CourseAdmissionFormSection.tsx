"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getEssentialsData } from "@/app/api/server";
import { FormInput } from "@/components/form";
import {
  type ContactFormData,
  contactSchema,
} from "@/components/sections/more/contact/ContactSection";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import { clientAxios } from "@/helpers/AxiosHelper";

const CourseAdmissionFormSection = ({ courseId }: { courseId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "all",
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      Message: "",
    },
  });

  const onSubmit = async (payload: ContactFormData) => {
    const isAdmissionOpen = await getEssentialsData();

    const admissionPayload = {
      first_name: payload.FirstName,
      mobile_no: payload.Mobile,
      email: payload.Email,
      Message: payload.Message,
      Course: courseId,
      step_0: true,
    };

    const requestPayload = {
      FirstName: payload.FirstName,
      Mobile: payload.Mobile,
      Email: payload.Email,
      Message: payload.Message,
      Type: "Request Information",
      Course: courseId,
    };

    try {
      if (isAdmissionOpen?.data?.isAdmission) {
        const isExistingEmailCheck = await clientAxios.post(
          `/admissions/email/check`,
          {
            email: payload.Email,
          },
        );

        const isExistingEmail = isExistingEmailCheck?.data;

        if (isExistingEmail?.exists) {
          toast.error(
            `${isExistingEmail.message} & please try with new email`,
            {
              position: "bottom-right",
            },
          );
          return;
        }

        await clientAxios.post(`/admissions`, { data: admissionPayload });
      } else {
        await clientAxios.post(`/contacts`, { data: requestPayload });
      }
      form.reset();
      toast.success("Request submitted successfully!");
    } catch (_error) {
      toast.error("Failed to send message. Please try again.");
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
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 md:flex font-mulish gap-2 md:gap-3 items-stretch md:items-center md:justify-between"
        >
          <FormInput
            name="FirstName"
            placeholder="Name*"
            control={form.control}
            restrictionType="number"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            errorClassName="text-black"
          />

          <FormInput
            name="Mobile"
            placeholder="Mobile No*"
            control={form.control}
            restrictionType="text"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            maxLength={10}
            errorClassName="text-black"
          />

          <FormInput
            name="Email"
            placeholder="Email Address*"
            control={form.control}
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            errorClassName="text-black"
          />

          <FormInput
            name="Message"
            placeholder="Message"
            control={form.control}
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] border border-white bg-white/20 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            errorClassName="text-black"
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
