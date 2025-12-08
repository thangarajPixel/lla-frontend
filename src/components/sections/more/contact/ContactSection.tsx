"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormInput from "@/components/form/FormInput";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import type { ContactSectionProps } from "./utils/contact";

export const contactSchema = z.object({
  FirstName: z.string().min(1, "First name is required"),
  LastName: z.string().min(0, "Last name is required"),
  Email: z.string().email("Invalid email address"),
  Mobile: z.string().min(10, "Phone number must be at least 10 digits"),
  Message: z.string().min(0, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection({ data }: ContactSectionProps) {
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
      Email: "",
      Mobile: "",
      Message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await clientAxios.post<ContactFormData>("/contacts", {
        data: data,
      });
      toast.success("Contact sent successfully!");
      reset();
    } catch (_error) {
      toast.error("Failed to send message. Please try again.");
    }
  };
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <ContainerWidget>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h1 className="font-urbanist text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[60px] 3xl:text-[64px] font-normal text-foreground mb-4">
                {data?.Title}
              </h1>
              <p className="text-lg" 
               // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized from trusted CMS source
                dangerouslySetInnerHTML={{ __html: data.Heading || "" }}
              >
              </p>
              <p className="text-black mt-4">
                {data?.Description}
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                  <Phone className="w-5 h-5 text-[#FF6B4A]" />
                </div>
                <div>
                  <p className="text-foreground font-medium">{data?.MobileNo}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                  <Mail className="w-5 h-5 text-[#FF6B4A]" />
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    administration@llacademy.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                  <MapPin className="w-5 h-5 text-[#FF6B4A]" />
                </div>
                <div>
                  <p className="text-foreground font-medium">
                   {data?.Location}
                  </p>
                  <p className="text-muted-foreground">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                  <Clock className="w-5 h-5 text-[#FF6B4A]" />
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    {data?.VisitorDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="Last Name"
                  notRequired
                  className="col-span-1 mt-6"
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
              <OrangeButtonWidget content={data?.BtnText || "Submit"} />
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
