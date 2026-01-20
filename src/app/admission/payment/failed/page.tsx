"use client";

import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getAdmissionsById, getThankyouPageData } from "@/app/api/server";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import { decryptCode, notify } from "@/helpers/ConstantHelper";
import { updateAdmission } from "@/store/services/global-services";
export const dynamic = "force-dynamic";

function PaymentFailedContent() {
  const [thankYouContent, setThankYouContent] = useState<ThankYouPage>({
    Title: "",
    Description: "",
    LongDescription: "",
  });

  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("id");

  useEffect(() => {
    if (!encryptedId || Array.isArray(encryptedId)) return;

    const updatePaymentStatus = async () => {
      const admissionId = decryptCode(encryptedId);

      const admissionResponse = await getAdmissionsById(Number(admissionId));

      const admissionData = admissionResponse?.data as AdmissionFormData;

      if (admissionData?.Payment_Status === "UnPaid") {
        return;
      }

      try {
        await updateAdmission(admissionData?.documentId, {
          step_3: true,
          step_4: false,
          Payment_Status: "UnPaid",
        } as never);
      } catch (error) {
        notify({ success: false, message: String(error) });
      }
    };

    updatePaymentStatus();
  }, [encryptedId]);

  useEffect(() => {
    const getThankYouContent = async () => {
      try {
        const res = await getThankyouPageData();
        const errorContent = res?.data?.find(
          (item: ThankYouPage) => item.Type === "Error",
        );
        setThankYouContent(errorContent);
      } catch (error) {
        notify({ success: false, message: String(error) });
      }
    };

    getThankYouContent();
  }, []);

  return (
    <main className="flex items-center justify-center p-4 pt-8 pb-16 min-h-[calc(100vh-200px)]">
      <div className="w-full flex flex-col items-center text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-red-500 rounded-full p-3 flex items-center justify-center">
            <X className="size-8 text-white stroke-3" />
          </div>
        </div>

        <div className="flex flex-col space-y-4 max-w-195 3xl:max-w-267.5">
          <p className="text-base md:text-lg font-medium 3xl:text-lg font-mulish text-red-500">
            {thankYouContent?.Title}
          </p>

          <HTMLWidget
            content={thankYouContent?.Description}
            className="text-base 3xl:text-lg font-mulish"
            tag="p"
          />

          <HTMLWidget
            content={thankYouContent?.LongDescription}
            className="font-mulish text-black/50 text-xs 3xl:text-sm 3xl:max-w-5xl mx-auto leading-relaxed"
            tag="p"
          />
        </div>
      </div>
    </main>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[calc(100vh-200px)]">Loading...</div>}>
      <PaymentFailedContent />
    </Suspense>
  );
}
