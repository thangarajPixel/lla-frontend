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

type CourseApplicationProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: CourseCard;
  selectedCourseItem?: CourseItem;
};

const CourseApplicationFormModel = ({
  isOpen,
  onClose,
  selectedCourse,
  selectedCourseItem,
}: CourseApplicationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RequestFormData>({
    resolver: zodResolver(admissionRequestSchema),
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
    const isAdmissionOpen = await getEssentialsData();

    const admissionPayload = {
      first_name: payload.FirstName,
      mobile_no: payload.Mobile,
      email: payload.Email,
      Message: payload.Message,
      Course:
        selectedCourse?.course_list?.documentId ??
        selectedCourseItem?.documentId,
      step_0: true,
    };

    const requestPayload = {
      FirstName: payload.FirstName,
      Mobile: payload.Mobile,
      Email: payload.Email,
      Message: payload.Message,
      Type: "Request Information",
      Course:
        selectedCourse?.course_list?.documentId ??
        selectedCourseItem?.documentId,
    };

    try {
      setIsLoading(true);

      if (isAdmissionOpen?.data?.isAdmission) {
        const isExistingEmailCheck = await clientAxios.post(
          `/admissions/email/check`,
          {
            email: payload.Email,
          },
        );

        const isExistingEmail = isExistingEmailCheck?.data;

        if (isExistingEmail?.exists) {
          setError("Email", {
            message: `This email ID is already registered for the ${selectedCourse?.course_list?.Name ?? selectedCourseItem?.Name}. A continuation link has already been shared via email. Please use that link to continue the registration or enter a new email ID to start a new registration.`,
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
        console.log("res", res);

        const encryptedId = encryptId(res?.data?.data?.id);
        router.push(`/admission/${encryptedId}/personal-details`);
        onClose();
        form.reset();
      } else {
        await clientAxios.post(`/contacts`, { data: requestPayload });
      }
      form.reset();
      toast.success("Request submitted successfully!");
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
        className="border-0 bg-white p-0 shadow-xl [&>button]:hidden rounded-md lg:max-w-[900px] 3xl:max-w-[1370px]"
      >
        <DialogTitle className="hidden">Application Form</DialogTitle>
        <section className="p-4 lg:p-8 3xl:p-10">
          <div className="mb-6 flex items-start justify-between">
            <h2 className="3xl:text-2xl font-semibold text-black">Apply Now</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex absolute -top-2 -right-2 3xl:size-8 items-center justify-center rounded-full bg-[#E87A6C] text-white transition-colors hover:bg-[#d66b5e] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 3xl:gap-10">
              <FormInput
                name="FirstName"
                control={control}
                placeholder="Full Name"
                label="Full Name"
                restrictionType="number"
              />
              {/* <FormInput
                                name="LastName"
                                control={control}
                                label="Last Name"
                                placeholder="Last Name"
                                notRequired
                                restrictionType="number"
                            /> */}

              <FormInput
                name="Mobile"
                control={control}
                type="tel"
                placeholder="Enter your phone number"
                label="Mobile Number"
                restrictionType="text"
                maxLength={10}
              />

              <FormInput
                name="Email"
                control={control}
                type="email"
                placeholder="Enter your email"
                label="Email Address"
                errorClassName="hidden"
              />
            </div>

            {form?.formState?.errors?.Email?.message && (
              <p className="text-red-500">
                {form?.formState?.errors?.Email?.message}
              </p>
            )}

            {/* <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                name="Email"
                                control={control}
                                type="email"
                                placeholder="Enter your email"
                                label="Email"
                            />
                        </div> */}
            {isLoading ? (
              <div className="flex items-center w-fit justify-center gap-2 orange-button p-3 rounded-full">
                <Spinner />
                <span>loading...</span>
              </div>
            ) : (
              <OrangeButtonWidget type="submit" content="Save & Continue" />
            )}
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CourseApplicationFormModel;
