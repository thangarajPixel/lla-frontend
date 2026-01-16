"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { getEssentialsData } from "@/app/api/server";
import { FormInput } from "@/components/form";
import type { CourseItem } from "@/components/layouts/utils/types";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import { encryptId, filteredPayload } from "@/helpers/ConstantHelper";
import { admissionRequestSchema } from "@/helpers/ValidationHelper";
import CourseApplicationFormModel from "./CourseApplicationFormModel";
import { cn } from "@/lib/utils";

export type RequestFormData = z.infer<typeof admissionRequestSchema>;

const CourseAdmissionFormSection = ({
  selectedCourse,
}: {
  selectedCourse?: CourseItem;
}) => {
  // const [selectedCourse, setSelectedCourse] =
  //   useState<string>();
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const form = useForm<RequestFormData>({
    resolver: zodResolver(admissionRequestSchema),
    mode: "all",
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
      Message: "",
    },
  });

  const onSubmit = async (payload: RequestFormData) => {
    const isAdmissionOpen = await getEssentialsData();

    // const clientIp = await getMyIp();
    const clientIpResponse = await fetch("/api/ip");
    const clientIp = await clientIpResponse.json();

    const filteredData = filteredPayload(payload);

    const admissionPayload = {
      first_name: filteredData?.FirstName,
      mobile_no: filteredData?.Mobile,
      email: filteredData?.Email,
      Message: filteredData?.Message,
      Course: selectedCourse?.documentId,
      AdmissionYear: isAdmissionOpen?.data?.admission_year?.AcademicYear,
      IpAddress: clientIp?.ip,
      step_0: true,
    };

    const requestPayload = {
      FirstName: filteredData?.FirstName,
      Mobile: filteredData?.Mobile,
      Email: filteredData?.Email,
      Message: filteredData?.Message,
      Type: "Request Information",
      Course: selectedCourse?.documentId,
      AdmissionYear: isAdmissionOpen?.data?.admission_year?.AcademicYear,
    };

    try {

      if (isAdmissionOpen?.data?.isAdmission) {
        const isExistingEmailCheck = await clientAxios.post(
          `/admissions/email/check`,
          {
            email: payload.Email,
            courseId: selectedCourse?.id,
          },
        );

        const isExistingEmail = isExistingEmailCheck?.data;

        if (isExistingEmail?.exists) {

          setEmailError(`This email ID is already registered for the ${selectedCourse?.Name}. A continuation link has already been shared via email. Please use that link to continue the registration or enter a new email ID to start a new registration.`),

            toast.error(
              "The email id  has already been used. Kindly check your mail",
              {
                position: "top-right",
              },
            );
          return;
        }

        setEmailError("");

        const res = await clientAxios.post(`/admissions`, {
          data: admissionPayload,
        });
        const encryptedId = encryptId(res?.data?.data?.id);
        router.push(`/admission/${encryptedId}/personal-details`);
      } else {
        await clientAxios.post(`/contacts`, { data: requestPayload });
      }
      form.reset();
      toast.success("Request submitted successfully!");
    } catch (_error) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={cn("fixed bottom-[-2px] left-0 right-0 backdrop-blur-sm shadow-full bg-[#E97451]/80 z-70 h-fit md:h-18 flex items-center p-2 md:pt-6", emailError && "md:h-fit")}>
      <ContainerWidget>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="hidden grid-cols-2 md:flex font-mulish gap-2 md:gap-3 items-stretch md:items-center md:justify-between"
        >
          <h3 className="hidden md:block text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[15px] 3xl:text-[18px] font-semibold mb-2 md:mb-2 text-center md:text-left relative md:bottom-1.5">
            Apply Now
          </h3>

          <FormInput
            name="FirstName"
            placeholder="Name*"
            control={form.control}
            restrictionType="number"
            className="w-full md:flex-1 md:min-w-[120px] space-y-0"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] 3xl:text-[16px] border border-white bg-white/10 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            errorClassName="text-black ml-2"
            pageType="course"
          />

          <FormInput
            name="Mobile"
            placeholder="Mobile No*"
            control={form.control}
            restrictionType="text"
            className="w-full md:flex-1 md:min-w-[120px] space-y-0"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] 3xl:text-[16px] border border-white bg-white/10 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            maxLength={10}
            errorClassName="text-black ml-2"
            pageType="course"
          />

          <FormInput
            name="Email"
            placeholder="Email Address*"
            control={form.control}
            className="w-full md:flex-1 md:min-w-[120px] space-y-0 col-span-2 md:col-span-1"
            inputClassName="w-full md:flex-1 pl-3 md:pl-4 3xl:text-[18px] md:min-w-[120px] h-9 rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] 3xl:text-[16px] border border-white bg-white/10 text-white placeholder:text-[#FFFFFF] focus-visible:border-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            errorClassName="text-black ml-2"
            pageType="course"
          />

          <button
            type="submit"
            className="col-span-2 md:col-span-1 group font-bold cursor-pointer flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-white text-[#E97451] rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] hover:bg-gray-100 transition-colors h-9 w-full md:w-auto relative md:bottom-2.5"
          >
            Submit
            <ArrowRight className="w-[14px] h-[14px] md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        <div className="flex items-center justify-center md:hidden">
          <button
            type="button"
            className="group font-bold cursor-pointer flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-white text-[#E97451] rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] 3xl:text-[16px] hover:bg-gray-100 transition-colors h-9 w-fit relative md:bottom-2.5"
            onClick={() => {
              setIsApplicationOpen(true);
            }}
          >
            Apply Now
            <ArrowRight className="w-[14px] h-[14px] md:w-[15px] md:h-[15px] lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {
          emailError && (
            <span className="text-white text-sm">
              {emailError}
            </span>
          )
        }
      </ContainerWidget>

      {isApplicationOpen && (
        <CourseApplicationFormModel
          isOpen={isApplicationOpen}
          onClose={() => setIsApplicationOpen(false)}
          selectedCourseItem={selectedCourse}
        />
      )}
    </div>
  );
};

export default CourseAdmissionFormSection;
