"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { control, handleSubmit, reset, register } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Form data:", data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
       <ContainerWidget>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg">
              Let's build this <span className="text-[#FF6B4A]">connection</span>
            </p>
            <p className="text-muted-foreground mt-4">
              Lorem ipsum dolor sit amet consectetur. Pulvinar nunc rhoncus nibh varius
              faucibus nisi vitae et.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                <Phone className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <div>
                <p className="text-foreground font-medium">+91 7598287370</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                <Mail className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <div>
                <p className="text-foreground font-medium">administration@llacademy.org</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                <MapPin className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <div>
                <p className="text-foreground font-medium">Lovedale, Ooty – 643 003</p>
                <p className="text-muted-foreground">Tamil Nadu, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#FF6B4A]/10">
                <Clock className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  Visitors are welcome from 10:00 AM to 4:00 PM, Monday to Friday
                </p>
                <p className="text-muted-foreground">
                  except for public holidays. Please call to fix an appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="firstName"
                control={control}
                placeholder="First Name"
                label="Name"
                className="col-span-1"
              />
              <FormInput
                name="lastName"
                control={control}
                placeholder="Last Name"
                notRequired
                className="col-span-1 mt-6"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="email"
                control={control}
                type="email"
                placeholder="Enter your email"
                label="Email"
              />
              <FormInput
                name="phone"
                control={control}
                type="tel"
                placeholder="Enter your phone number"
                label="Phone Number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground font-mulish mb-1">
                Message<span className="text-chart-1">*</span>
              </label>
              <textarea
                {...register("message")}
                placeholder="Message"
                rows={6}
                className="flex w-full rounded-2xl border border-[#BDBDBD] bg-background px-4 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-chart-1/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
            <OrangeButtonWidget  content="Submit"/>               
          </form>
        </div>
      </div>
      <div className="mt-16">
        <div className="w-full h-[400px] overflow-hidden border border-[#E97451]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.2345678901234!2d76.7345678!3d11.4012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDI0JzA0LjQiTiA3NsKwNDQnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
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
