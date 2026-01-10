"use client";

import { useRouter } from "next/navigation";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { Check } from "lucide-react";
import type { ThankYouPage } from "@/app/admission/payment/success/page";

export default function ThankYouPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (

    <main className="min-h-screen flex items-center justify-center p-8 pt-8 pb-16 2xxl:pt-16 py-10">
      <div className="w-full flex flex-col items-center text-center space-y-8">

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">
          Thank You
        </h1>

        <div className="flex justify-center">
          <div className="bg-[#4CAF50] rounded-full p-3 flex items-center justify-center">
            <Check className="size-8 text-white stroke-[3]" />
          </div>
        </div>

        <div className="space-y-4 max-w-195 3xl:max-w-267.5">

          <p className="text-base 3xl:text-lg">Thank you for getting in touch.
            We will get back to you shortly.
          </p>

        </div>

        <div className="space-y-3 text-center">

          <div className="text-sm text-gray-800 space-y-1">

            <p>
              <span className="font-medium text-base">If you’d like to speak to us, please call us:</span>{" "}
              <a
                href="tel:+917598287370"
                className="text-blue-600 text-base hover:underline"
              >
                +91 7598287370
              </a>
            </p>

            <p>
              <span className="font-medium text-base">For any queries related to admissions, please email us:</span>{" "}
              <a
                href="mailto:admissions@llacademy.org"
                className="text-blue-600 hover:underline text-base"
              >
                admissions@llacademy.org
              </a>
            </p>

            <p>
              <span className="font-medium text-base">For any other queries:</span>{" "}
              <a
                href="mailto:admissions@llacademy.org"
                className="text-blue-600 hover:underline text-base"
              >
                administration@llacademy.org
              </a>
            </p>

            <p className="font-bold text-lg">Light and Life Academy Lovedale, Ooty – 643 003 Tamil Nadu India. </p>

          </div>
        </div>

        <OrangeButtonWidget
          content="Go Back to Home"
          onClick={handleGoHome}
        />
      </div>
    </main>
  );
}
