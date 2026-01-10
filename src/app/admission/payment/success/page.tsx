"use client";

import { Check, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdmissionsById } from "@/app/api/server";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import { decryptCode, notify } from "@/helpers/ConstantHelper";
import { updateAdmission } from "@/store/services/global-services";
import { Spinner } from "@/components/ui/spinner";

export type ThankYouPage = {
  Title: string;
  Description: string;
  LongDescription: string;
};

const PaymentSuccessPage = () => {
  const [admissionId, setAdmissionId] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  const [thankYouContent, setThankYouContent] = useState<ThankYouPage>({
    Title: "",
    Description: "",
    LongDescription: "",
  });
  // const params = useParams();
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("id");
  // const encryptedId = params?.id;

  const handleDownload = async () => {
    if (!admissionId || isDownloading) return;

    try {
      setIsDownloading(true);

      const res = await clientAxios.get(`/admissions/${admissionId}/pdf`, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `admission-${admissionId}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (_error) {
      toast.error("Download Failed", {
        position: "top-right",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (!encryptedId || Array.isArray(encryptedId)) return;

    const updatePaymentStatus = async () => {
      try {
        const admissionId = decryptCode(encryptedId);
        setAdmissionId(admissionId);

        const admissionResponse = await getAdmissionsById(Number(admissionId));

        const admissionData = admissionResponse?.data as AdmissionFormData;
        setCourseName(admissionData?.Course?.Name);

        if (admissionData?.Payment_Status === "Paid") {
          return;
        }

        const paidAmount =
          admissionData?.Course?.Amount +
          (admissionData?.Course?.Amount * admissionData?.Course?.Percentage) /
          100;

        await updateAdmission(admissionData?.documentId, {
          step_3: true,
          Payment_Status: "Paid",
          Paid_Amount: paidAmount,
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
        setThankYouContent(res?.data?.data[0]);
      } catch (error) {
        notify({ success: false, message: String(error) });
      }
    };

    getThankYouContent();
  }, []);

  return (
    <main className="flex items-center justify-center p-8 pt-8 pb-16 2xxl:pt-16 py-10">
      <div className="w-full flex flex-col items-center text-center space-y-8">
        <div className="space-y-2 lg:max-w-2xl 3xl:max-w-3xl">
          <h1 className="text-2xl md:text-3xl 3xl:text-[40px]">
            <span className="text-[#E97451] font-urbanist">{courseName}</span>
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="bg-[#4CAF50] rounded-full p-3 flex items-center justify-center">
            <Check className="size-8 text-white stroke-[3]" />
          </div>
        </div>

        <div className="space-y-4 max-w-195 3xl:max-w-267.5">
          <p className="text-base 3xl:text-lg font-mulish text-black">
            {thankYouContent?.Title.replace("CourseName", courseName)}
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

        {/* Download Button */}
        {
          isDownloading ? (
            <div className="flex items-center justify-center gap-2 orange-button p-3 rounded-full">
              <Spinner />
              <span>Downloading...</span>
            </div>
          ) : (
            <OrangeButtonWidget
              content="Download Submitted Application"
              onClick={handleDownload}
              type="button"
            />
          )
        }

      </div>
    </main>
  );
};

export default PaymentSuccessPage;
