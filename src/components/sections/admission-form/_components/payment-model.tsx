"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type {
  PaymentData,
  PaymentResponse,
} from "@/components/sections/admission-form/_steps/preview-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";

type PaymentPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  gstRate: number;
  total: number;
  paymentDetails?: PaymentResponse | null;
};

const PaymentModel = ({
  isOpen,
  onClose,
  amount,
  gstRate,
  total,
  paymentDetails,
}: PaymentPopupProps) => {
  const handlePayment = async () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentDetails?.checkoutUrl ?? "";

    Object.entries(paymentDetails?.data as PaymentData).forEach(
      ([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      },
    );

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-2xl border-0 bg-white p-0 shadow-xl [&>button]:hidden rounded-none"
      >
        <DialogTitle className="hidden">Proceed to Pay</DialogTitle>
        <div className="relative p-8">
          <div className="mb-6 flex items-start justify-between">
            <h2 className="3xl:text-2xl font-semibold text-black">
              Proceed to Pay
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex 3xl:size-8 items-center justify-center rounded-full bg-[#E87A6C] text-white transition-colors hover:bg-[#d66b5e] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-8 h-px bg-linear-to-r from-[#E87A6C] to-[#F4A79D]" />

          <div className="mb-8">
            <p className="3xl:text-lg text-gray-600">
              Proceed to pay{" "}
              <span className="font-medium text-[#E87A6C]">
                ₹{amount.toLocaleString("en-IN")}
              </span>{" "}
              +{" "}
              <span className="font-medium text-[#E87A6C]">{gstRate}% GST</span>{" "}
              <span className="font-medium text-gray-700">
                (Total:{" "}
                <span className="text-[#E87A6C]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
                )
              </span>{" "}
              to continue.
            </p>
          </div>

          <OrangeButtonWidget
            content="Go to Payment"
            className="3xl:px-4"
            onClick={handlePayment}
            // className="text-lg 2xl:text-lg h-[46px] px-6 py-3"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModel;
