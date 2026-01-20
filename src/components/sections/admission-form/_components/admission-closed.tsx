"use client";

import { useRouter } from "next/navigation";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { getThankyouPageData } from "@/app/api/server";
import HTMLWidget from "@/components/widgets/HTMLWidget";

export default function AdmissionClosedPage() {
  const [thankYouContent, setThankYouContent] = useState<ThankYouPage>({
    Title: "",
    Description: "",
    LongDescription: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getThankyouPageData();
      const data = response?.data?.find(
        (item: ThankYouPage) => item.Type === "AdmissionClosed",
      );
      setThankYouContent(data);
    };
    fetchData();
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8 pt-8 pb-16 2xxl:pt-16 py-10">
      <div className="w-full flex flex-col items-center text-center space-y-8">
        <div className="space-y-2 lg:max-w-2xl 3xl:max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {thankYouContent?.Title}
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="bg-[#4CAF50] rounded-full p-3 flex items-center justify-center">
            <Check className="size-8 text-white stroke-3" />
          </div>
        </div>

        <div className="space-y-4 max-w-195 3xl:max-w-267.5">

          <HTMLWidget
            content={thankYouContent?.Description}
            className="text-base 3xl:text-lg font-mulish"
            tag="p"
          />

          <HTMLWidget
            content={thankYouContent?.LongDescription}
            className="font-mulish text-black/50 text-xs 3xl:text-sm 3xl:max-w-5xl mx-auto leading-loose"
            tag="p"
          />
        </div>

        <OrangeButtonWidget
          content="Go Back to Home"
          onClick={handleGoHome}
        />

      </div>
    </main>
  );
}
