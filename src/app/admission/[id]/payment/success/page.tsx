"use client";

import { CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdmissionsById } from "@/app/api/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clientAxios } from "@/helpers/AxiosHelper";
import { decryptCode, notify } from "@/helpers/ConstantHelper";
import { updateAdmission } from "@/store/services/global-services";

const PaymentSuccessPage = () => {
  const [admissionId, setAdmissionId] = useState<string | null>(null);
  const params = useParams();
  const encryptedId = params?.id;

  const handleDownload = async () => {
    try {
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
        position: "bottom-right",
      });
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

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-linear-to-br from-background to-muted">
      <Card className="w-full max-w-lg 3xl:max-w-5xl shadow-lg">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-50 p-3">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Payment Successfull
            </h1>
            <p className="text-muted-foreground">
              Thank you so much for your application.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full bg-transparent"
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
