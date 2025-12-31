"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdmissionsById } from "@/app/api/server";
import { decryptCode, notify } from "@/helpers/ConstantHelper";
import { updateAdmission } from "@/store/services/global-services";
import { clientAxios } from "@/helpers/AxiosHelper";
import { ThankYouPage } from "../success/page";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import { X } from "lucide-react";

const PaymentFailedPage = () => {

  const [thankYouContent, setThankYouContent] = useState<ThankYouPage>({
      Title: "",
      Description: "",
      LongDescription: "",
    });

  const params = useParams();
  const encryptedId = params?.id;

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
          const res = await clientAxios.get(`/thank-you-pages`);
          setThankYouContent(res?.data?.data[1]);
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
                <X className="size-8 text-white stroke-[3]" />
              </div>
            </div>
    
            <div className="space-y-4 max-w-195 3xl:max-w-267.5">
              <p className="text-base 3xl:text-lg font-mulish text-black">
                {thankYouContent?.Title}
              </p>
    
              <HTMLWidget
                content={thankYouContent?.Description}
                className="text-base 3xl:text-lg font-mulish"
                tag="p"
              />
    
              <HTMLWidget
                content={thankYouContent?.LongDescription}
                className="font-mulish text-black/50 text-xs 3xl:text-sm italic 3xl:max-w-5xl mx-auto leading-relaxed"
                tag="p"
              />
            </div>

          </div>
        </main>
  );
};

export default PaymentFailedPage;
