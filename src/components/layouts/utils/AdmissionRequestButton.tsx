"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "@/components/form/FormInput";
import {
  type ContactFormData,
  contactSchema,
} from "@/components/sections/more/contact/ContactSection";
import { DialogClose } from "@/components/ui/dialog";
import DialogWidget from "@/components/widgets/DialogWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import { filteredPayload } from "@/helpers/ConstantHelper";
import { ArrowRightWhite, Into } from "@/helpers/ImageHelper";
import ButtonWidget from "../../widgets/ButtonWidget";
import ImageWidget from "../../widgets/ImageWidget";
import type { AdmissionButtonProps } from "./types";

const AdmissionRequestButton = ({
  className = "",
  iconClassName = "",
}: AdmissionButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const isContactUsPage = pathname === "/contact-us";

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      Mobile: "",
      Email: "",
      Message: "",
    },
  });

  const onSubmit = async (payload: ContactFormData) => {
    const filteredData = filteredPayload(payload);

    const data = {
      ...filteredData,
      Type: "Request Information",
    };
    try {
      await clientAxios.post(`/contacts`, { data: data });
      toast.success("Message sent successfully!");
      reset();
      setIsOpen(false);
    } catch (_error) {
      toast.error("Failed to send message. Please try again.",{ position : "top-right"});
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <DialogWidget
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={
        <ButtonWidget
          className={`${
            isContactUsPage
              ? "orange-button-white border-1 border-[#E97451]  leading-[28px]"
              : "orange-button-white border-1 border-[#E97451]  leading-[28px]"
          } group rounded-[60px] xss:text-[16px] px-5 h-10 3xl:w-[230px] 3xl:h-[50px]  text-[14px] 2xl:text-[14px] 3xl:text-[18px] ${className}`}
        >
          Request Info
          <ImageWidget
            src={isContactUsPage ? ArrowRightWhite : ArrowRightWhite}
            alt="Arrow Right"
            className={`lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1 ${iconClassName}`}
          />
        </ButtonWidget>
      }
      contentClassName="sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[700px] xl:max-w-[719px] p-4 sm:p-6 lg:p-6"
      showCancel={false}
      showCloseButton={false}
      customCloseButton={
        <DialogClose asChild>
          <div className="cursor-pointer -mt-[30px] -mr-[30px]">
            <ImageWidget src={Into} alt="Into" className="w-[30px] h-[30px]" />
          </div>
        </DialogClose>
      }
    >
      <section className="p-4 mx-auto">
        <h2 className="mb-4 font-semibold text-xl 3xl:text-2xl">
          Request Information Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="FirstName"
              control={control}
              placeholder="First Name"
              label="First Name"
              restrictionType="number"
            />
            <FormInput
              name="LastName"
              control={control}
              label="Last Name"
              placeholder="Last Name"
              notRequired
              restrictionType="number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="Email"
              control={control}
              type="email"
              placeholder="Enter your email"
              label="Email"
            />
            <FormInput
              name="Mobile"
              control={control}
              type="tel"
              placeholder="Enter your phone number"
              label="Phone Number"
              restrictionType="text"
              maxLength={10}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground font-mulish mb-1"
            >
              Message<span className="text-chart-1">*</span>
            </label>
            <textarea
              {...register("Message")}
              placeholder="Message"
              rows={6}
              className="flex w-full rounded-2xl border border-[#BDBDBD] bg-background px-4 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-chart-1/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            {errors.Message && (
              <p className="text-danger text-sm text-red-500">
                {errors.Message.message}
              </p>
            )}
          </div>
          <OrangeButtonWidget content="Submit" />
        </form>
      </section>
    </DialogWidget>
  );
};

export default AdmissionRequestButton;
