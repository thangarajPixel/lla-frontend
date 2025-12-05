"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import DialogWidget from "@/components/widgets/DialogWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { ArrowRight, Into } from "@/helpers/ImageHelper";
import ButtonWidget from "../../widgets/ButtonWidget";
import ImageWidget from "../../widgets/ImageWidget";
import type { AdmissionButtonProps } from "./types";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import FormInput from "@/components/form/FormInput";
import { filteredPayload } from "@/helpers/ConstantHelper";
import { clientAxios } from "@/helpers/AxiosHelper";

const contactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const AdmissionRequestButton = ({
    className = "",
    iconClassName = "",
}: AdmissionButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const { control, handleSubmit, reset, register, formState: { errors } } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const onSubmit = async (payload: ContactFormData) => {
        const filteredData = filteredPayload(payload);

        const data = {
            ...filteredData,
            Type: "Contact Us",
        };
        try {
            const res = await clientAxios.post(`/contacts`, { data: data });
            const resData = await res?.data;
            toast.success("Message sent successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
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
                    className={`orange-button group rounded-[60px] xss:text-[16px] px-5 h-10 3xl:h-[50px] text-[14px] 2xl:text-[14px] 3xl:text-[18px] ${className}`}
                >
                    Admission Request
                    <ImageWidget
                        src={ArrowRight}
                        alt="Arrow Right"
                        className={`lg:w-[18px] lg:h-[18px] 3xl:w-6 3xl:h-6 transition-transform duration-300 group-hover:translate-x-1 ${iconClassName}`}
                    />
                </ButtonWidget>
            }
            contentClassName="sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] p-4 sm:p-6 lg:p-6"
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
            <section className="p-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <h2 className="mb-4 font-semibold text-base">Request Information Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            name="firstName"
                            control={control}
                            placeholder="First Name"
                            label="First Name"
                        />
                        <FormInput
                            name="lastName"
                            control={control}
                            label="Last Name"
                            placeholder="Last Name"
                            notRequired
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
                        {errors.message && <p className="text-danger text-sm text-red-500">{errors.message.message}</p>}
                    </div>
                    <OrangeButtonWidget content="Submit" />
                </form>
            </section>
        </DialogWidget>
    );
};

export default AdmissionRequestButton;
