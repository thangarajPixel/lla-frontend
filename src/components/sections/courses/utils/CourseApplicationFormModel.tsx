"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getEssentialsData } from "@/app/api/server";
import { FormInput } from "@/components/form";
import type { CourseCard, CourseItem } from "@/components/layouts/utils/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import { encryptId } from "@/helpers/ConstantHelper";
import { admissionRequestSchema } from "@/helpers/ValidationHelper";
import type { RequestFormData } from "./CourseAdmissionFormSection";
import { useCourseStore } from "@/store/zustand";
import { useCaptchaToken } from "@/components/form/CaptchaToken";

type CourseApplicationProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: CourseCard;
  selectedCourseItem?: CourseItem;
  hideCloseIcon?: boolean;
};

const CourseApplicationFormModel = ({
  isOpen,
  onClose,
  selectedCourse,
  selectedCourseItem,
  hideCloseIcon = false,
}: CourseApplicationProps) => {

  const essentialData = useCourseStore((state) => state.essentialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getToken } = useCaptchaToken();
  const router = useRouter();

  const form = useForm<RequestFormData>({
    resolver: zodResolver(admissionRequestSchema("course_popup")),
    mode: "all",
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Mobile: "",
    },
  });

  const { control, handleSubmit, setError } = form;

  const onSubmit = async (payload: RequestFormData) => {
    // const isAdmissionOpen = await getEssentialsData();

    setIsLoading(true);
    const captchaToken = await getToken("course_admission");

    if (!captchaToken) {
      toast.error("Captcha verification failed. Please try again.");
      setIsLoading(false);
      return;
    }

    const clientIpResponse = await fetch("/api/ip");
    const clientIp = await clientIpResponse.json();

    const admissionPayload = {
      first_name: payload.FirstName,
      mobile_no: payload.Mobile,
      email: payload.Email,
      Message: payload.Message,
      Course:
        selectedCourse?.course_list?.documentId ??
        selectedCourseItem?.documentId,
      step_0: true,
      Currentstep: "Step1",
      AdmissionYear: essentialData?.admission_year?.AcademicYear,
      IpAddress: clientIp?.ip,
      captchaToken: captchaToken
    };

    const requestPayload = {
      FirstName: payload.FirstName,
      Mobile: payload.Mobile,
      Email: payload.Email,
      Message: payload.Message,
      Type: "Request Information",
      Course: selectedCourse?.course_list?.Name ?? selectedCourseItem?.Name,
      captchaToken: captchaToken
    };

    try {

      if (essentialData?.isAdmission) {
        const isExistingEmailCheck = await clientAxios.post(
          `/admissions/email/check`,
          {
            email: payload.Email,
            // courseId:
            //   selectedCourse?.course_list?.id ??
            //   selectedCourseItem?.id,
            year: essentialData?.admission_year?.AcademicYear,
          },
        );

        const isExistingEmail = isExistingEmailCheck?.data;
        // Track Lead event in Facebook Pixel
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Application Form");
        }
        if (isExistingEmail?.exists) {
          setError("Email", {
            // message: `This email ID is already registered for the ${selectedCourse?.course_list?.Name ?? selectedCourseItem?.Name}. A continuation link has already been shared via email. Please use that link to continue the registration or enter a new email ID to start a new registration.`,
            message: `This email ID is already registered for the ${isExistingEmail?.courseName}. A continuation link has already been shared via email. Please use that link to continue the registration or enter a new email ID to start a new registration.`,
          });
          toast.error(
            "The email id  has already been used. Kindly check your mail",
            {
              position: "top-right",
            },
          );
          return;
        }

        const res = await clientAxios.post(`/admissions`, {
          data: admissionPayload,
        });

        toast.success("Admission submitted successfully!");

        const encryptedId = encryptId(res?.data?.data?.id);
        router.push(`/admission/${encryptedId}/personal-details`);
        onClose();
        form.reset();
      } else {
        await clientAxios.post(`/contacts`, { data: requestPayload });
        toast.success("Request submitted successfully!");
        router.push("/request-thankyou");
      }
      form.reset();
    } catch (_error) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="border-0 bg-white p-0 shadow-xl [&>button]:hidden rounded-md md:max-w-[700px] lg:max-w-[900px] 3xl:max-w-[1370px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden">Application Form</DialogTitle>
        <section className="my-2 p-4 sm:p-6 lg:p-8 3xl:p-10">
          <div className="mb-6 flex items-start justify-between">
            <h2 className="3xl:text-2xl font-semibold text-black">{essentialData?.isAdmission ? "Apply Now" : "Request Info"}</h2>
            {!hideCloseIcon && (
              <button
                type="button"
                onClick={onClose}
                className="flex absolute -top-2 -right-2 3xl:size-8 items-center justify-center rounded-full bg-[#E87A6C] text-white transition-colors hover:bg-[#d66b5e] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 3xl:gap-8">
              <FormInput
                name="FirstName"
                control={control}
                placeholder="Enter your full name"
                label="Full Name"
                restrictionType="number"
              />

              <FormInput
                name="Mobile"
                control={control}
                type="tel"
                placeholder="Enter your mobile number"
                label="Mobile Number"
                restrictionType="text"
                maxLength={10}
              />

              <FormInput
                name="Email"
                control={control}
                type="email"
                placeholder="Enter your email address"
                label="Email Address"
                errorClassName="hidden"
              />
            </div>

            {form?.formState?.errors?.Email?.message && (
              <p className="text-sm text-red-500 relative -top-3">
                {form?.formState?.errors?.Email?.message}
              </p>
            )}

            <OrangeButtonWidget
              content={essentialData?.isAdmission ? "Save & Continue" : "Submit"}
              className=" mt-4 xss:text-[18px] xss:h-10 3xl:h-12.5 text-base 2xl:text-[18px] 3xl:text-[18px] 3xl:w-[226px]"
              apiLoader={isLoading}
              type="submit"
              id="admission_form_popup"
              name="admission-form-popup"
            />
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CourseApplicationFormModel;
