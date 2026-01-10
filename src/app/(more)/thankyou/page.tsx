"use client";

import { useRouter } from "next/navigation";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";

export default function ThankYouPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gray-200 px-8 py-12 md:py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800">
          Thank You
        </h1>
      </div>

      {/* Content Section */}
      <div className="px-8 py-16 md:py-24">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-sans font-semibold text-gray-700">
            Thank you for getting in touch.
          </h2>

          {/* Divider */}
          <div className="h-px bg-gray-300"></div>

          <p className="text-base md:text-lg text-gray-500 font-sans">
            We will get back to you shortly.
          </p>

          <OrangeButtonWidget
            content="Go Back to Home"
            onClick={handleGoHome}
          />
        </div>
      </div>
    </div>
  );
}
