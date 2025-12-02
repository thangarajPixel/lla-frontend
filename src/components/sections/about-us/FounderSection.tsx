"use client";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { FounderSectionProps } from "./utils/about-us";

const FounderSection = ({ data }: FounderSectionProps) => {
  return (
    <section className="3xl:max-h-[1665px] w-full bg-[#ECECEC] py-8 xs:py-10 sm:py-12  md:py-14 lg:py-20 xl:py-14  2xl:py-18 3xl:py-26 4xl:py-30 ">
      <ContainerWidget>
        <div className="text-center space-y-1  xs:space-y-2 sm:space-y-3 md:space-y-5 lg:space-y-6 xl:space-y-4  2xl:space-y-4  3xl:space-y-2 4xl:space-y-3">
          <ScrollWidget delay={0.1}>
            <h3 className="font-urbanist font-regular text-black text-left xs:text-left md:text-center text-[32px] xs:text-[34px] sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px] 2xl:text-[64px] 3xl:text-[64px] 4xl:text-[64px]">
              {data.Title}
            </h3>
          </ScrollWidget>
          <ScrollWidget delay={0.1}>
            <p className="font-mulish font-regular text-black text-left xs:text-left md:text-center text-[24px] xs:text-[25px] sm:text-[26px] md:text-[28px] lg:text-[28px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] 4xl:text-[45px] mx-auto max-w-[500px] xs:max-w-[600px] sm:max-w-[650px] md:max-w-[700px] lg:max-w-[850px] xl:max-w-[600px]">
              {data.Heading}
              <span className="text-[#E97451] ml-2">{data.SubHeading}</span>
            </p>
          </ScrollWidget>
        </div>
        <div className="mt-2 xs:mt-6 sm:mt-12 md:mt-10 space-y-3 sm:space-y-10 md:space-y-12 ">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 lg:gap-16 xl:gap-0 2xl:gap-20 3xl:gap-0 items-center ">
            <ScrollWidget delay={0.2} className="order-2 md:order-1">
              <div className="space-y-3 xs:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-4 xl:max-w-[400px] 2xl:max-w-[500px] 3xl:max-w-[520px]">
                <h4 className="font-urbanist  font-normal text-[#E97451] block hidden md:block  text-[24px]  xs:text-[26px] sm:text-[26px] md:text-[28px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px] 3xl:text-[40px] ">
                  {data.Founder_card[0].Heading}
                </h4>
                <p className="font-mulish text-black leading-normal text-[13px] xs:text-[16px] sm:text-[16px] lg:text-[16px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]">
                  {data.Founder_card[0].Description[0].children[0].text}
                </p>
                <p className="font-mulish text-black leading-normal text-[13px] text-[16px] xs:text-[16px]  sm:text-[16px] lg:text-[16px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]">
                  {data.Founder_card[0].Description[1].children[0].text ?? ""}
                </p>
                <OrangeButtonWidget
                  className="h-[50px] w-[178px] text-[18px]"
                  content={data.Founder_card[0].Btn_txt ?? ""}
                />
              </div>
            </ScrollWidget>
            <ScrollWidget delay={0.3} className="order-1 md:order-2">
              <h4 className="mb-3 block md:hidden font-urbanist font-regular text-[#E97451] text-[32px]  xs:text-[32px] sm:text-[32px]">
                {data.Founder_card[0].Heading}
              </h4>
              <div className="flex justify-center md:justify-start w-full">
                <ImageWidget
                  src={getS3Url(data.Founder_card[0].Image.url)}
                  alt="Founder"
                  width={500}
                  height={600}
                  className="object-cover w-[360px] h-[480px] xs:w-[420px] xs:h-[530px] sm:w-[400px] sm:h-[500px] md:w-[340px] md:h-[460px]  lg:w-[361px] lg:h-[484px]  xl:w-[361px] xl:h-[484px]  2xl:w-[420px] 2xl:h-[560px] 3xl:w-[410px] 3xl:h-[549px] 4xl:w-[450px] 4xl:h-[600px] "
                />
              </div>
            </ScrollWidget>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6  xs:gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-25 2xl:gap-30 3xl:gap-30 items-center ">
            <ScrollWidget delay={0.3}>
              <h4 className="mb-3 block md:hidden font-urbanist font-regular text-[#E97451] text-[32px]  xs:text-[32px] sm:text-[32px]">
                {data.Founder_card[1].Heading}
              </h4>
              <div className="flex justify-center md:justify-end w-full">
                <ImageWidget
                  src={getS3Url(data.Founder_card[1].Image.url)}
                  alt="Founder"
                  width={500}
                  height={600}
                  className="object-cover w-[360px] h-[480px] xs:w-[420px] xs:h-[530px]  sm:w-[420px] sm:h-[380px]  md:w-[340px] md:h-[440px]  lg:w-[361px] lg:h-[484px]  xl:w-[361px] xl:h-[484px]  2xl:w-[410px] 2xl:h-[549px]  3xl:w-[410px] 3xl:h-[549px] 4xl:w-[450px] 4xl:h-[590px] "
                />
              </div>
            </ScrollWidget>
            <ScrollWidget delay={0.2}>
              <div className="space-y-2 xs:space-y-4  md:space-y-5 lg:space-y-6 xl:space-y-4 xl:max-w-[400px] 2xl:max-w-[500px]    3xl:max-w-[520px]">
                <h4 className="font-urbanist font-normal text-[#E97451] block hidden md:block text-[24px] xs:text-[26px] sm:text-[26px]  md:text-[28px] lg:text-[28px]  xl:text-[32px] 2xl:text-[36px] 3xl:text-[40px] ">
                  {data.Founder_card[1].Heading}
                </h4>
                <p className="font-mulish text-black leading-normal text-[13px] xs:text-[16px] sm:text-[16px] lg:text-[16px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]">
                  {data.Founder_card[1].Description[0].children[0].text}
                </p>
                <p className="font-mulish text-black leading-normal text-[13px] text-[16px] xs:text-[16px]  sm:text-[16px] lg:text-[16px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px]">
                  {data.Founder_card[1].Description[1].children[0].text ?? ""}
                </p>
                <OrangeButtonWidget
                  className="h-[50px] w-[178px] text-[18px]"
                  content={data.Founder_card[1].Btn_txt}
                />
              </div>
            </ScrollWidget>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};
export default FounderSection;
