"use client";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CheckboxField from "@/components/ui/checkbox";
import ImageWidget from "@/components/widgets/ImageWidget";
import { EditIcon } from "@/helpers/ImageHelper";

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
        <h3 className="font-semibold text-base text-[#ff6d45]">{title}</h3>
        <Image
          src={EditIcon}
          alt="Edit"
          className="size-4 rounded-full"
          onClick={onEdit}
        />
        {/* <button type="button"><EditIcon size={10}/></button> */}
      </section>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between text-gray-700">
      <span className="font-medium w-40">{label}:</span>
      <span>{value ?? "-"}</span>
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
    <div className="flex items-center justify-between text-gray-700">
      <span className="font-medium w-40">{label}</span>
      <div className="flex flex-col gap-4">
        {value?.map((language, index) => (
          <main key={`language-${index + 1}`} className="flex flex-col gap-2">
            <span className="ml-auto">{language.language}</span>
            <section className="flex flex-row items-center justify-between gap-10">
              <span className="text-xs flex items-center justify-center">
                {`${language.read ? "Read" : ""}`}
                <CheckboxField
                  className="ml-2 size-4"
                  checked={language.read}
                />
              </span>
              <span className="text-xs flex items-center justify-center">
                {`${language.write ? "Write" : ""}`}
                <CheckboxField
                  className="ml-2 size-4"
                  checked={language.write}
                />
              </span>
              <span className="text-xs flex items-center justify-center">
                {`${language.speak ? "Speak" : ""}`}
                <CheckboxField
                  className="ml-2 size-4"
                  checked={language.speak}
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
  value?: string | DocumentFile | boolean;
}) {
  return (
    <div className="flex flex-col items-start justify-start text-gray-700">
      <span className="font-medium w-40">{label}:</span>
      {value && (
        <>
          <span className="text-chart-1">{title}</span>
          <section className="flex flex-row items-center justify-between gap-10 mt-2">
            <span className="text-xs flex items-center justify-center">
              <FileIcon className="size-3 text-chart-1" />
              <span className="ml-2 text-chart-1">View Document</span>
            </span>
          </section>
        </>
      )}
    </div>
  );
}

export default function ReviewApplicationClone({
  admissionData,
  onClose,
  handleStepEditChange,
}: {
  admissionData?: AdmissionFormData;
  onClose: () => void;
  handleStepEditChange: (step: number) => void;
}) {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col md:flex-row w-full bg-white">
        {/* LEFT SIDE */}
        <div className="flex lg:ml-48 md:w-2/4 lg:w-1/4 flex-col items-center gap-6 pt-8 mb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-[#ff6d45]">
              Review Application
            </h1>
            <p className="text-sm text-gray-600">
              Kindly verify the details before submitting.
            </p>
          </div>
          <ImageWidget
            src={admissionData?.passport_size_image?.url ?? ""}
            alt="profile"
            className="w-64 h-80 rounded-md shadow-md"
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-full px-6"
              onClick={onClose}
            >
              Back
            </Button>
            <Button className="rounded-full px-6 bg-[#ff7e5c] hover:bg-[#ff6d45] text-white">
              Proceed to Pay
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <Card className="bg-chart-1/20 flex-1 backdrop-blur px-6 py-16 border-none shadow-none rounded-none">
          <CardContent className="space-y-8 text-sm lg:max-w-3/4">
            {/* SECTION */}
            <Section
              title="Personal Details"
              onEdit={() => handleStepEditChange(1)}
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
              <Field label="Address" value={admissionData?.address} />
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
              onEdit={() => handleStepEditChange(1)}
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
                value={admissionData?.Parent_Guardian_Spouse_Details?.address}
              />
            </Section>

            <Section
              title="Education Details"
              onEdit={() => handleStepEditChange(2)}
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

            {/* <h2>Under Graduate</h2> */}
            <Section
              title="Under Graduate"
              onEdit={() => handleStepEditChange(2)}
            >
              <div className="flex flex-row items-center justify-between">
                <section>
                  <span>Degree</span>
                  <p>{admissionData?.Under_Graduate?.degree}</p>
                </section>

                <section>
                  <span>Status</span>
                  <p>{admissionData?.Under_Graduate?.ug_status}</p>
                </section>

                {admissionData?.Under_Graduate?.marksheet?.url && (
                  <section>
                    <span>Document</span>
                    <span className="text-xs flex items-center justify-center">
                      <FileIcon className="size-3 text-chart-1" />
                      <span className="ml-2 text-chart-1">View Document</span>
                    </span>
                  </section>
                )}
              </div>
            </Section>

            {/* <h2>Post Graduate</h2> */}

            <Section
              title="Post Graduate"
              onEdit={() => handleStepEditChange(2)}
            >
              {admissionData?.Post_Graduate?.map((degree, index) => (
                <div
                  key={`post-graduate-${index + 1}`}
                  className="flex flex-row items-center justify-between"
                >
                  <section>
                    <span>Degree</span>
                    <p>{degree?.degree}</p>
                  </section>

                  <section>
                    <span>Status</span>
                    <p>{degree?.pg_status}</p>
                  </section>

                  <section className="invisible">
                    <span>Document</span>
                    <span className="text-xs flex items-center justify-center">
                      <FileIcon className="size-3" />
                      <span className="ml-2">View Document</span>
                    </span>
                  </section>
                </div>
              ))}
            </Section>

            <Section
              title="Work Experience"
              onEdit={() => handleStepEditChange(2)}
            >
              {admissionData?.Work_Experience?.map((experience, index) => (
                <div
                  key={`work-experience-${index + 1}`}
                  className="flex flex-row items-center justify-between"
                >
                  <section>
                    <span>Role/Designation</span>
                    <p>{experience?.designation ?? "-"}</p>
                  </section>

                  <section>
                    <span>Employer</span>
                    <p>{experience?.employer ?? "-"}</p>
                  </section>

                  <section>
                    <span>Duration</span>
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
              onEdit={() => handleStepEditChange(3)}
            >
              <div className="grid grid-cols-2 gap-4">
                {admissionData?.Upload_Your_Portfolio?.images.map(
                  (img, index) => (
                    <ImageWidget
                      alt="Portfolio Image"
                      key={`portfolio-${index + 1}`}
                      src={img.url}
                      className="w-full h-fit object-contain rounded-md shadow-sm"
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
}
