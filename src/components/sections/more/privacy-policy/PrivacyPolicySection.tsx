import { X } from "lucide-react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import { PrivacyPolicyProps } from "./utils/privacy-policy";
import HTMLWidget from "@/components/widgets/HTMLWidget";

const PrivacyPolicySection = ({ data }: PrivacyPolicyProps) => {
  return (
    <section className="relative w-full bg-white py-10 md:py-10">
      <ContainerWidget>
        <div className="max-w-full">
          <h1 className="font-urbanist font-regular text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] 3xl:text-[48px] text-black mb-6">
           {data.Title}
          </h1>
          <div className="mb-10">
            <h2 className="font-mulish font-normal text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] 3xl:text-[32px]  text-black mb-4">
             {data.SubTitle}
            </h2>
             <HTMLWidget
              content={data.Description}
              className="text-[16px] md:text-[14px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-relaxed"
              tag="p"
              />
          </div>
           {data.PrivacyPolicyCard.map((item) => (
           <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
              {item.Title}
            </h2>
          <div className="space-y-4 pl-4">
              <div className="flex gap-3">
            <HTMLWidget
              content={item.Description}
              className="text-[16px] md:text-[14px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-relaxed"
              tag="p"
              />
              </div>
            </div>
          </div>
            ))}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default PrivacyPolicySection;
