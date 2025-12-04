"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CheckboxField from "@/components/ui/checkbox";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { DocumentIcon, EditIcon } from "@/helpers/ImageHelper";

function Section({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}) {
  return (
    <div className="space-y-3">
      <section className="flex items-center justify-between">
        <h3 className="text-xl text-[#E97451]">{title}</h3>
        <Image
          src={EditIcon}
          width={20}
          height={20}
          alt="Edit"
          className="size-4 rounded-full cursor-pointer"
          onClick={onEdit}
        />
      </section>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  const isDob = label.toLowerCase() === "date of birth";
  const dobValue = value?.split("-").reverse().join("-");
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-black/50 w-40">{label}:</span>
      <span className="text-black">{isDob ? dobValue : (value ?? "-")}</span>
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
    <div className="flex items-center justify-between">
      <span className="text-black/50 text-sm">{label}</span>
      <div className="flex flex-col gap-4">
        {value?.map((language, index) => (
          <main key={`language-${index + 1}`} className="flex flex-col gap-2">
            <span className="ml-auto">{language.language}</span>
            <section className="flex flex-row items-center justify-between gap-10">
              <span className="text-xs flex items-center justify-center">
                <span>Read</span>
                <CheckboxField
                  className="ml-2 size-4 border-gray-500"
                  checked={language.read}
                  readOnly
                />
              </span>
              <span className="text-xs flex items-center justify-center">
                <span>Write</span>
                <CheckboxField
                  className="ml-2 size-4 border-gray-500"
                  checked={language.write}
                  readOnly
                />
              </span>
              <span className="text-xs flex items-center justify-center">
                <span>Speak</span>
                <CheckboxField
                  className="ml-2 size-4 border-gray-500"
                  checked={language.speak}
                  readOnly
                />
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
  return (
    <div className="flex flex-col items-start justify-start text-gray-700">
      <span className="w-40 text-chart-1">{label}:</span>
      {value && (
        <>
          <span className="text-black/50">{title}</span>
          <section className="flex flex-row items-center justify-between gap-10 mt-2">
            <span className="text-xs flex items-center justify-center gap-1">
              <ImageWidget
                src={DocumentIcon}
                alt="Document"
                width={100}
                height={100}
                className="size-4 rounded-full"
              />
              <LinkWidget
                href={value?.url}
                target="_blank"
                className="text-chart-1/80"
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
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col md:flex-row w-full bg-white">
        {/* LEFT SIDE */}
        <div className="flex lg:ml-48 md:w-2/4 lg:w-1/4 flex-col items-center gap-6 pt-8 mb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl lg:text-3xl font-urbanist text-[#E97451]">
              Review Application
            </h1>
            <p className="text-sm">
              Kindly verify the details before submitting.
            </p>
          </div>
          <ImageWidget
            width={200}
            height={200}
            src={admissionData?.passport_size_image?.url ?? ""}
            alt="profile"
            className="w-64 h-80 rounded-md shadow-md"
          />

          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              className="rounded-full h-8 xss:text-[12px] bg-chart-1/10 text-chart-1"
              onClick={() => router.push(`/admission/${admissionId}/portfolio`)}
            >
              <ArrowLeft className="size-4 text-chart-1 font-light" />
              Back to Edit
            </Button>
            <OrangeButtonWidget
              content="Proceed to Pay"
              className="xss:text-[12px] h-8 px-4"
            />
          </div>
        </div>

        <Card className="bg-chart-1/20 flex-1 backdrop-blur px-6 py-16 border-none shadow-none rounded-none">
          <CardContent className="space-y-8 text-sm lg:max-w-3/4">
            <Section
              title="Personal Details"
              onEdit={() =>
                router.push(`/admission/${admissionId}/personal-details`)
              }
            >
              <Field label="First Name" value={admissionData?.first_name} />
              <Field label="Last Name" value={admissionData?.last_name} />
              <Field label="Nationality" value={admissionData?.nationality} />
              <Field label="Email" value={admissionData?.email} />
              <Field label="Mobile No" value={admissionData?.mobile_no} />
              <Field
                label="Date Of Birth"
                value={admissionData?.date_of_birth}
              />
              <Field label="Blood Group" value={admissionData?.blood_group} />
              <Field
                label="Address"
                value={admissionData?.address[0]?.children[0]?.text ?? ""}
              />
              <LanguageField
                label={"Language & Proficiency:"}
                value={
                  (admissionData?.Language_Proficiency as LanguageProficiency[]) ??
                  []
                }
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
              <Field
                label="Address"
                value={
                  admissionData?.Parent_Guardian_Spouse_Details?.address[0]
                    ?.children[0]?.text ?? ""
                }
              />
            </Section>

            <Section
              title="Education Details"
              onEdit={() =>
                router.push(`/admission/${admissionId}/education-details`)
              }
            >
              <div className="flex flex-row items-center justify-between">
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
            >
              <div className="flex flex-row flex-wrap items-center justify-between">
                <section>
                  <span className="text-black/50">Degree</span>
                  <p>{admissionData?.Under_Graduate?.degree}</p>
                </section>

                <section>
                  <span className="text-black/50">Status</span>
                  <p>{admissionData?.Under_Graduate?.ug_status}</p>
                </section>

                {admissionData?.Under_Graduate?.marksheet?.url && (
                  <section>
                    <span className="text-black/50">Document</span>
                    <span className="text-xs flex items-center justify-center gap-1">
                      <ImageWidget
                        src={DocumentIcon}
                        alt="Document"
                        width={100}
                        height={100}
                        className="size-4 rounded-full"
                      />
                      <LinkWidget
                        href={admissionData?.Under_Graduate?.marksheet?.url}
                        target="_blank"
                        className="text-chart-1/80"
                      >
                        View Document
                      </LinkWidget>
                    </span>
                  </section>
                )}
              </div>
            </Section>

            <Section
              title="Post Graduate"
              onEdit={() =>
                router.push(`/admission/${admissionId}/education-details`)
              }
            >
              {admissionData?.Post_Graduate?.map((degree, index) => (
                <div
                  key={`post-graduate-${index + 1}`}
                  className="flex flex-row items-center justify-between"
                >
                  <section>
                    <span className="text-black/50">Degree</span>
                    <p>{degree?.degree}</p>
                  </section>

                  <section>
                    <span className="text-black/50">Status</span>
                    <p>{degree?.pg_status}</p>
                  </section>

                  <section className="invisible">
                    <span className="text-black/50">Document</span>
                    <span className="text-xs flex items-center justify-center">
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
                        className="text-chart-1/80"
                      >
                        View Document
                      </LinkWidget>
                    </span>
                  </section>
                </div>
              ))}
            </Section>

            <Section
              title="Work Experience"
              onEdit={() =>
                router.push(`/admission/${admissionId}/education-details`)
              }
            >
              {admissionData?.Work_Experience?.map((experience, index) => (
                <div
                  key={`work-experience-${index + 1}`}
                  className="flex flex-row items-center justify-between"
                >
                  <section>
                    <span className="text-black/50">Role/Designation</span>
                    <p>{experience?.designation ?? "-"}</p>
                  </section>

                  <section>
                    <span className="text-black/50">Employer</span>
                    <p>{experience?.employer ?? "-"}</p>
                  </section>

                  <section>
                    <span className="text-black/50">Duration</span>
                    <span className="text-xs flex items-center justify-center">
                      <span>
                        {experience?.duration_start} -{" "}
                        {experience?.duration_end}
                      </span>
                    </span>
                  </section>
                </div>
              ))}
            </Section>

            <div className="flex flex-row items-center justify-between">
              <span className="text-chart-1">
                Where did you find out about LLA?
              </span>
              <span>Instagram</span>
            </div>

            <Section
              title="Portfolio Images"
              onEdit={() => router.push(`/admission/${admissionId}/portfolio`)}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
    </div>
  );
};

export default ReviewApplication;
