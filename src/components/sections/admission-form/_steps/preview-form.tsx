"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CheckboxField from "@/components/ui/checkbox";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { calculateDuration } from "@/helpers/ConstantHelper";
import { DocumentIcon, EditIcon } from "@/helpers/ImageHelper";
import { cn } from "@/lib/utils";
import { useCourseStore } from "@/store/zustand";
import PaymentModel from "../_components/payment-model";
import { updateAdmission } from "@/store/services/global-services";
import { clientAxios } from "@/helpers/AxiosHelper";
import { toast } from "sonner";

export type PaymentData = {
  key: string;
  amount: string;
  productinfo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  txnid: string;
  surl: string;
  furl: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
  hash: string;
  [key: string]: string;
}

type AdmissionInfo = {
  id: number;
  name: string;
  email: string;
}

export type PaymentResponse = {
  success: boolean;
  checkoutUrl: string;
  method: string;
  transactionId: string;
  amount: string;
  data: PaymentData;
  admissionInfo: AdmissionInfo;
}

function Section({
  title,
  children,
  onEdit,
  className,
}: {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  className?: string;
}) {
  return (
    <div className="space-y-3">
      <section className="flex items-center justify-between">
        <h3 className={cn("text-2xl 3xl:text-[32px] text-[#E97451]", className)}>
          {title}
        </h3>
        <Image
          src={EditIcon}
          width={24}
          height={24}
          alt="Edit"
          className="size-4 3xl:size-6 rounded-full cursor-pointer"
          onClick={onEdit}
        />
      </section>
      <div className="space-y-2 3xl:space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  prefix,
}: {
  label?: string;
  value?: string;
  prefix?: string;
}) {
  const isDob = label?.toLowerCase() === "date of birth";
  const dobValue = value?.split("-").reverse().join("-");
  return (
    <div
      className={cn(
        "flex flex-col items-start md:flex-row md:items-center justify-between text-base 3xl:text-2xl font-mulish",
        label === "Address" && "md:items-start",
      )}
    >
      <span className="text-black/50 w-full md:w-40 3xl:w-fit">
        {label ? `${label}` : ""}
      </span>
      <span className={cn("text-black text-left md:text-right md:max-w-3xs")}>
        {isDob ? dobValue : prefix ? `${prefix} ${value}` : (value ?? "-")}
      </span>
    </div>
  );
}

function LanguageField({
  label,
  value,
}: {
  label: string;
  value?: LanguageProficiency[];
}) {
  return (
    <div className="flex flex-col md:flex-row items-start mt-4 justify-between">
      <span className="text-black/50 text-base 3xl:text-2xl mb-3 font-mulish">
        {label}
      </span>
      <div className="flex flex-col gap-4">
        {value?.map((language, index) => (
          <main
            key={`language-${index + 1}`}
            className="flex flex-col gap-2 w-full"
          >
            <span className="md:ml-auto text-lg font-mulish 3xl:text-2xl">
              {language.language}
            </span>
            <section className="flex flex-row items-center justify-between gap-8">
              <span className="text-sm 3xl:text-base gap-2 flex items-center justify-center">
                <CheckboxField
                  className="size-4 border-gray-500"
                  checked={language.read}
                  readOnly
                />
                <span>Read</span>
              </span>
              <span className="text-sn 3xl:text-base flex gap-2 items-center justify-center">
                <CheckboxField
                  className="size-4 border-gray-500"
                  checked={language.write}
                  readOnly
                />
                <span>Write</span>
              </span>
              <span className="text-sm 3xl:text-base flex gap-2 items-center justify-center">
                <CheckboxField
                  className="size-4 border-gray-500"
                  checked={language.speak}
                  readOnly
                />
                <span>Speak</span>
              </span>
            </section>
          </main>
        ))}
      </div>
    </div>
  );
}

function EducationField({
  label,
  title,
  value,
}: {
  label?: string;
  title: string;
  value?: DocumentFile;
}) {
  const handleDownload = async (url: string, fileName: string) => {

    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(blobUrl);
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-start justify-start text-gray-700">
      <span className="w-40 text-base 3xl:text-2xl text-[#E97451]">{label}:</span>
      {value && (
        <>
          <span className="text-black/50 text-base 3xl:text-2xl">{title}</span>
          <section className="flex flex-row items-center justify-between gap-10 mt-2">
            <span className="text-xs flex items-center justify-center gap-1">
              <ImageWidget
                src={DocumentIcon}
                alt="Document"
                width={100}
                height={100}
                className="size-4 3xl:size-6 rounded-full"
              />
              <LinkWidget
                href="#"
                className="text-[#E97451] text-base 3xl:text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  handleDownload(value?.url, value?.name);
                }}
              >
                View Document
              </LinkWidget>
            </span>
          </section>
        </>
      )}
    </div>
  );
}

const ReviewApplication = ({
  admissionData,
  admissionId,
}: {
  admissionData?: AdmissionFormData;
  admissionId?: string;
}) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentResponse | null>(null);
  const router = useRouter();
  const fullAddress = `${admissionData?.address[0].children[0].text}, ${admissionData?.city}, ${admissionData?.district}, ${admissionData?.state.name}, ${admissionData?.pincode}`;
  const parentFullAddress = `${admissionData?.Parent_Guardian_Spouse_Details?.address[0].children[0].text}, ${admissionData?.Parent_Guardian_Spouse_Details?.city}, ${admissionData?.Parent_Guardian_Spouse_Details?.district}, ${admissionData?.Parent_Guardian_Spouse_Details?.state.name}, ${admissionData?.Parent_Guardian_Spouse_Details?.pincode}`;

  useEffect(() => {
    if (admissionData) {
      useCourseStore.setState({ courseName: admissionData?.Course?.Name });
    }
  }, [admissionData]);

  const handleOpenPayment = async (admissionId: string) => {

    const data = {
      step_3: true,
      Payment_Status: "Completed",
    };

    try {
      const res = await clientAxios.put(`/admissions/${admissionId}`, { data });
      setPaymentDetails(res?.data?.checkoutLink);
      setIsPaymentOpen(true)
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className={cn("flex flex-col md:flex-row w-full bg-white", isPaymentOpen && "blur-xl")}>
        {/* LEFT SIDE */}
        <div className="flex lg:ml-36 md:w-2/4 lg:w-1/4 flex-col items-center gap-6 pt-8 mb-8 3xl:py-16 3xl:mt-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl 3xl:text-4xl font-urbanist text-[#E97451]">
              Review Application
            </h1>
            <p className="text-xs 3xl:text-lg">
              Kindly verify the details before submitting.
            </p>
          </div>
          <ImageWidget
            width={200}
            height={200}
            src={admissionData?.passport_size_image?.url ?? ""}
            alt="profile"
            className="w-72 h-80 3xl:w-md 3xl:h-auto rounded-md shadow-md"
          />

          <div className="flex flex-row items-center justify-between gap-1 3xl:w-md">
            <ButtonWidget
              className={cn(
                "group bg-chart-1/10 text-chart-1 hover:bg-chart-1/10 rounded-[60px] px-5 w-2/4 h-10 xss:text-[16px] 3xl:h-[50px] text-xs 2xl:text-[14px] 3xl:text-[18px]",
              )}
              onClick={() => router.push(`/admission/${admissionId}/portfolio`)}
            >
              <ArrowLeft className="size-4 text-chart-1 group-hover:text-chart-1 font-light" />
              Back to Edit
            </ButtonWidget>
            <OrangeButtonWidget
              content="Proceed to Pay"
              className="3xl:px-4 w-2/4"
              onClick={() => handleOpenPayment(admissionData?.documentId as string)}
            />
          </div>
        </div>

        <Card className="bg-chart-1/20 flex-1 backdrop-blur py-16 3xl:py-32 3xl:pl-6 border-none shadow-none rounded-none">
          <CardContent className="space-y-8 text-sm lg:max-w-3/4">
            <Section
              title="Personal Details"
              onEdit={() =>
                router.push(`/admission/${admissionId}/personal-details`)
              }
            >
              <Field
                label="First Name"
                value={admissionData?.first_name}
                prefix={admissionData?.name_title}
              />
              <Field label="Last Name" value={admissionData?.last_name} />
              <Field label="Nationality" value={admissionData?.nationality} />
              <Field label="Email" value={admissionData?.email} />
              <Field label="Mobile No" value={admissionData?.mobile_no} />
              <Field
                label="Date Of Birth"
                value={admissionData?.date_of_birth}
              />
              <Field label="Blood Group" value={admissionData?.blood_group} />
              <Field label="Address" value={fullAddress} />
              <LanguageField
                label={"Language & Proficiency"}
                value={
                  (admissionData?.Language_Proficiency as LanguageProficiency[]) ??
                  []
                }
              />

              <Field label="Hobbies" value={admissionData?.hobbies} />

              <Field
                label="Photography Club"
                value={admissionData?.photography_club}
              />
            </Section>

            <Section
              title="Parent Details"
              onEdit={() =>
                router.push(`/admission/${admissionId}/personal-details`)
              }
            >
              <Field
                label="Name"
                value={`${admissionData?.Parent_Guardian_Spouse_Details?.first_name} ${admissionData?.Parent_Guardian_Spouse_Details?.last_name}`}
                prefix={admissionData?.Parent_Guardian_Spouse_Details?.title}
              />
              <Field
                label="Profession"
                value={
                  admissionData?.Parent_Guardian_Spouse_Details?.profession
                }
              />
              <Field
                label="Email"
                value={admissionData?.Parent_Guardian_Spouse_Details?.email}
              />
              <Field
                label="Contact"
                value={admissionData?.Parent_Guardian_Spouse_Details?.mobile_no}
              />
              <Field label="Address" value={parentFullAddress} />
            </Section>

            <Section
              title="Education Details"
              onEdit={() =>
                router.push(`/admission/${admissionId}/education-details`)
              }
            >
              <div className="flex flex-col md:flex-row space-y-6 items-start justify-between">
                <EducationField
                  label="10th Std"
                  title="Document"
                  value={
                    admissionData?.Education_Details?.Education_Details_10th_std
                  }
                />
                <EducationField
                  label="12th Std"
                  title="Document"
                  value={
                    admissionData?.Education_Details?.Education_Details_12th_std
                  }
                />
              </div>
            </Section>

            <Section
              title="Under Graduate"
              onEdit={() =>
                router.push(`/admission/${admissionId}/education-details`)
              }
              className="text-base 3xl:text-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <section className="md:col-span-2">
                  <span className="text-black/50 text-base 3xl:text-2xl">
                    Degree
                  </span>
                  <p className="text-black text-base 3xl:text-2xl">
                    {admissionData?.Under_Graduate?.degree}
                  </p>
                </section>

                <section className="md:col-span-1">
                  <span className="text-black/50 text-base 3xl:text-2xl">
                    Status
                  </span>
                  <p className="text-black text-base 3xl:text-2xl">
                    {admissionData?.Under_Graduate?.ug_status}
                  </p>
                </section>

                {admissionData?.Under_Graduate?.marksheet?.url && (
                  <section className="flex flex-col justify-start gap-2 items-start md:col-span-1">
                    <span className="text-black/50 text-base 3xl:text-2x">
                      Document
                    </span>
                    <span className="flex items-center justify-center gap-1">
                      <ImageWidget
                        src={DocumentIcon}
                        alt="Document"
                        width={100}
                        height={100}
                        className="size-4 3xl:size-6 rounded-full"
                      />
                      <LinkWidget
                        href={admissionData?.Under_Graduate?.marksheet?.url}
                        target="_blank"
                        className="text-chart-1/80 text-base md:text-xs lg:text-base text-nowrap 3xl:text-lg"
                      >
                        View Document
                      </LinkWidget>
                    </span>
                  </section>
                )}
              </div>
            </Section>

            {admissionData?.Post_Graduate[0]?.degree && (
              <Section
                title="Post Graduate"
                onEdit={() =>
                  router.push(`/admission/${admissionId}/education-details`)
                }
                className="text-base 3xl:text-2xl"
              >
                {admissionData?.Post_Graduate?.map((degree, index) => (
                  <div
                    key={`post-graduate-${index + 1}`}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    <section className="md:col-span-2">
                      <span className="text-black/50 text-base 3xl:text-2xl">
                        Degree
                      </span>
                      <p className="text-black text-base 3xl:text-2xl">
                        {degree?.degree}
                      </p>
                    </section>

                    <section className="md:col-span-1">
                      <span className="text-black/50 text-base 3xl:text-2xl">
                        Status
                      </span>
                      <p className="text-black text-base 3xl:text-2xl">
                        {degree?.pg_status}
                      </p>
                    </section>

                    <section className="hidden md:invisible md:flex flex-col justify-start gap-2 items-start md:col-span-1">
                      <span className="text-black/50 text-base 3xl:text-2xl">
                        Document
                      </span>
                      <span className="flex items-center justify-center gap-1">
                        <ImageWidget
                          src={DocumentIcon}
                          alt="Document"
                          width={100}
                          height={100}
                          className="size-4 rounded-full"
                        />
                        <LinkWidget
                          href={degree?.marksheet?.url ?? ""}
                          target="_blank"
                          className="text-chart-1/80 text-xs"
                        >
                          View Document
                        </LinkWidget>
                      </span>
                    </section>
                  </div>
                ))}
              </Section>
            )}

            {admissionData?.Work_Experience[0]?.designation && (
              <Section
                title="Work Experience"
                onEdit={() =>
                  router.push(`/admission/${admissionId}/education-details`)
                }
              >
                {admissionData?.Work_Experience?.map((experience) => (
                  <div
                    key={experience?.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-2"
                  >
                    <section className="md:col-span-2">
                      <span className="text-black/50 text-base 3xl:text-2xl">
                        Role/Designation
                      </span>
                      <p className="text-black text-lg  3xl:text-2xl">
                        {experience?.designation ?? "-"}
                      </p>
                    </section>

                    <section className="md:col-span-2">
                      <span className="text-black/50 text-base 3xl:text-2xl">
                        Employer
                      </span>
                      <p className="text-black text-lg  3xl:text-2xl">
                        {experience?.employer ?? "-"}
                      </p>
                    </section>

                    <section className="md:col-span-1">
                      <span className="text-black/50 text-base 3xl:text-2xl">
                        Duration
                      </span>
                      <span className="text-black text-base font-medium md:text-sm flex flex-wrap 3xl:text-[22px]">
                        {calculateDuration(
                          experience?.duration_start ?? "",
                          experience?.duration_end ?? "",
                        )}
                      </span>
                    </section>
                  </div>
                ))}
              </Section>
            )}

            {admissionData?.Message && (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-base md:text-sm 3xl:text-2xl">
                <span className="text-[#E97451] text-base 3xl:text-2xl">
                  Where did you find out about LLA?
                </span>
                <span>{admissionData?.Message}</span>
              </div>
            )}

            <Section
              title="Portfolio Images"
              onEdit={() => router.push(`/admission/${admissionId}/portfolio`)}
            >
              <div className="grid grid-cols-2 gap-4">
                {admissionData?.Upload_Your_Portfolio?.images.map(
                  (img, index) => (
                    <ImageWidget
                      width={200}
                      height={200}
                      alt="Portfolio Image"
                      key={`portfolio-${index + 1}`}
                      src={img.url}
                      className="w-full h-48 object-contain"
                    />
                  ),
                )}
              </div>
            </Section>
          </CardContent>
        </Card>
      </div>

      {
        isPaymentOpen && (
          <PaymentModel isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} amount={admissionData?.Course?.Amount  ?? 0} gstRate={admissionData?.Course?.GstPercentage  ?? 18} total={admissionData?.Course?.TotalAmount  ?? 0} paymentDetails={paymentDetails ?? null}/>
        )
      }
    </div>
  );
};

export default ReviewApplication;
