"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { decryptCode, notify } from "@/helpers/ConstantHelper";
import { updateAdmission } from "@/store/services/global-services";
import { getAdmissionsById } from "@/app/api/server";

const PaymentSuccessPage = () => {
  const params = useParams();
  const encryptedId = params?.id;

  useEffect(() => {
    if (!encryptedId || Array.isArray(encryptedId)) return;

    const updatePaymentStatus = async () => {
      try {

        const admissionId = decryptCode(encryptedId);

        const admissionResponse = await getAdmissionsById(Number(admissionId));

        const admissionData = admissionResponse?.data as AdmissionFormData;

        if (admissionData?.Payment_Status === "Paid" ) {
          return;
        }

        const paidAmount = admissionData?.Course?.Amount + (admissionData?.Course?.Amount * admissionData?.Course?.Percentage) / 100 ;

        await updateAdmission(admissionData?.documentId, {
          step_3: true,
          Payment_Status: "Paid",
          Paid_Amount: paidAmount
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
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Your payment has been processed successfully
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-transparent"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
