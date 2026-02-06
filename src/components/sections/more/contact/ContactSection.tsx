"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormInput from "@/components/form/FormInput";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import { Call, LocationIcon, Sms, StarIcon } from "@/helpers/ImageHelper";
import type { ContactSectionProps } from "./utils/contact";
import { useState } from "react";
import { useCaptchaToken } from "@/components/form/CaptchaToken";

export const contactSchema = z.object({
  FirstName: z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "First name is required")),
  LastName: z.string(),
  Email: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address")
        .refine(
          (email) => {
            // Additional validation: check for common email format issues
            return (
              email.length > 0 &&
              !email.startsWith("@") &&
              !email.endsWith("@") &&
              !email.includes("..") &&
              !email.startsWith(".") &&
              !email.endsWith(".") &&
              email.includes("@") &&
              email.split("@")[1]?.includes(".")
            );
          },
          {
            message: "Enter a valid email address",
          },
        ),
    ),
  Mobile: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, "Phone Number is required")
        .regex(/^[1-9]\d{9}$/, "Enter a valid phone number"),
    ),
  // Message: z
  //   .string()
  //   .transform((val) => val.trim())
  //   .pipe(z.string().min(10, "Message must be at least 10 characters")),
  Message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection({ data }: ContactSectionProps) {
  const [loading, setLoading] = useState(false);
  const { getToken } = useCaptchaToken();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
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

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    const captchaToken = await getToken("contact_us");

    if (!captchaToken) {
      toast.error("Captcha verification failed. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const _response = await clientAxios.post<ContactFormData>("/contacts", {
        data: {
          ...data,
          captchaToken,
        },
      });
      // toast.success(
      //   "Thank you for getting in touch with us. We will get back to you in 5 working days",
      // );
      reset();
      router.push("/thankyou");
    } catch (_error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-10 max-w-7xl mx-auto">
      <ContainerWidget>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10">
          <div className="space-y-5">
            <div>
              <h1 className="font-urbanist text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[60px] 3xl:text-[64px] font-normal text-foreground">
                {data?.Title}
              </h1>
            </div>
            <div className="space-y-7">
              <div className="flex items-center gap-2">
                <div>
                  <ImageWidget
                    src={Call}
                    alt="Contact Phone"
                    className="max-w-[32px] max-h-[32px] text-[#FF6B4A]"
                  />
                </div>
                <div>
                  <a
                    href={`tel:${data?.MobileNo}`}
                    className="text-[16px] 3xl:text-[18px] font-mulish font-normal hover:text-[#FF6B4A] transition-colors"
                  >
                    {data?.MobileNo}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <ImageWidget
                    src={Sms}
                    alt="Contact Email"
                    className="max-w-[32px] max-h-[32px] text-[#FF6B4A]"
                  />
                </div>
                <div>
                  <a
                    href={`mailto:${data?.Email}`}
                    className="text-[16px] 3xl:text-[18px] font-mulish font-normal hover:text-[#FF6B4A] transition-colors"
                  >
                    {data?.Email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <ImageWidget
                    src={LocationIcon ?? null}
                    alt="Contact Location"
                    className="max-w-[32px] max-h-[32px] text-[#FF6B4A]"
                  />
                </div>
                <div>
                  <HTMLWidget
                    content={data.Location ?? null}
                    className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-normal font-mulish"
                    tag="p"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <ImageWidget
                    src={StarIcon}
                    alt="Contact Visitor"
                    className="max-w-[32px] max-h-[32px] text-[#FF6B4A]"
                  />
                </div>
                <div className="max-w-[630px]">
                  <p className="text-[16px] 3xl:text-[18px] font-mulish font-normal">
                    {data?.VisitorDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 md:mt-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  name="FirstName"
                  control={control}
                  placeholder="First Name"
                  label="Name"
                  className="col-span-1"
                />
                <FormInput
                  name="LastName"
                  control={control}
                  label="Last Name"
                  placeholder="Last Name"
                  className="col-span-1"
                  labelClassName="invisible"
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
                  restrictionType="text"
                  placeholder="Enter your phone number"
                  label="Phone Number"
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
              <OrangeButtonWidget
                content={data?.BtnText || "Submit"}
                type="submit"
                apiLoader={loading}
              />
            </form>
          </div>
        </div>
        <div className="mt-16">
          <div className="w-full h-[400px] overflow-hidden border border-[#E97451]">
            <iframe
              src={data?.LocationUrl || ""}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Light & Life Academy Location"
            />
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
}
