"use client";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { FounderDummy1, FounderDummy2 } from "@/helpers/ImageHelper";
import { FounderSectionProps } from "./utils/about-us";
import { getS3Url } from "@/helpers/ConstantHelper";

const FounderSection = ({ data }: FounderSectionProps) => {
  console.log(data,'data');
  return (
    <section
      className="3xl:max-h-[1665px]
  w-full bg-[#ECECEC]
  py-8
  xs:py-10
  sm:py-12
  md:py-14
  lg:py-20
  xl:py-14
  2xl:py-18
  3xl:py-26
  4xl:py-30
  "
    >
      <ContainerWidget>
        <div
          className="
      text-center
      space-y-1
      xs:space-y-2
      sm:space-y-3
      md:space-y-5
      lg:space-y-6
      xl:space-y-4
      2xl:space-y-12
      3xl:space-y-14
      4xl:space-y-16
      "
        >
          <ScrollWidget delay={0.1}>
            <h3
              className="
          font-urbanist font-regular text-black
          text-left xs:text-left md:text-center
          text-[32px]
          xs:text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-5xl
          xl:text-6xl
          2xl:text-7xl
          3xl:text-[80px]
          4xl:text-[90px]
          "
            >
              {data.Title}
            </h3>
          </ScrollWidget>
          <ScrollWidget delay={0.1}>
            <p
              className="
          font-mulish font-regular text-black
          text-left xs:text-left md:text-center
          text-[24px]
          xs:text-[25px]
          sm:text-[26px]
          md:text-xl
          lg:text-2xl
          xl:text-3xl
          2xl:text-4xl
          3xl:text-[40px]
          4xl:text-[45px]
          mx-auto
          max-w-[500px]
          xs:max-w-[600px]
          sm:max-w-[650px]
          md:max-w-[700px]
          lg:max-w-[850px]
          xl:max-w-[600px]
          "
            >
             {data.Heading}
              <span className="text-[#E97451] ml-2">dolor sit amet,</span>
            </p>
          </ScrollWidget>
        </div>
        <div className="mt-2 xs:mt-6 sm:mt-12 md:mt-10 space-y-10 sm:space-y-10 md:space-y-12 ">
          <div
            className="
        grid grid-cols-1
        md:grid-cols-2
        gap-6 md:gap-14 lg:gap-16 xl:gap-18 2xl:gap-20 3xl:gap-24
        items-center
        "
          >
            <ScrollWidget delay={0.2} className="order-2 md:order-1">
              <div
                className="
            space-y-3
            xs:space-y-4
            md:space-y-5
            lg:space-y-6
            xl:space-y-4
            4xl:max-w-[420px]
            "
              >
                <h4
                  className="font-urbanist font-semibold text-[#E97451] block hidden md:block
              text-xl
              xs:text-2xl
              sm:text-3xl
              md:text-3xl
              lg:text-3xl
              xl:text-4xl
              2xl:text-[38px]
              3xl:text-[42px]
              4xl:text-4xl
              "
                >
                 {data.Founder_card[0].Heading}
                </h4>
                <p
                  className="
              font-mulish text-black leading-relaxed
              text-[13px]
              xs:text-[12px]
              sm:text-[13px]
              lg:text-[14px]
              xl:text-[16px]
              2xl:text-[18px]
              3xl:text-[20px]
              4xl:text-[22px]
              "
                >
                  {data.Founder_card[0].Description[0].children[0].text}
                </p>
                <p
                  className=" font-mulish text-black leading-relaxed text-[13px]
              xs:text-[13px]
              sm:text-[13px]
              lg:text-[14px]
              xl:text-[16px]
              2xl:text-[18px]
              3xl:text-[20px]
              4xl:text-[22px]
              "
                >
                  {data.Founder_card[0].Description[1].children[0].text ?? ""}
                </p>
                <OrangeButtonWidget content={data.Founder_card[0].Btn_txt ?? ""} />
              </div>
            </ScrollWidget>
            <ScrollWidget delay={0.3} className="order-1 md:order-2">
              <h4
                className="mb-3 block md:hidden font-urbanist font-regular text-[#E97451] text-[32px]  xs:text-[32px]
                 sm:text-[32px]l"
              >
                 {data.Founder_card[0].Heading}
              </h4>
              <div
                className="
            flex justify-center md:justify-start w-full
            "
              >
                <ImageWidget
                  src={getS3Url(data.Founder_card[0].Image.url)}
                  alt="Founder"
                  width={500}
                  height={600}
                  className="
              object-cover
              w-[360px] h-[480px]
              xs:w-[420px] xs:h-[530px]
              sm:w-[400px] sm:h-[500px]
              md:w-[340px] md:h-[460px]
              lg:w-[380px] lg:h-[520px]
              xl:w-[400px] xl:h-[500px]
              2xl:w-[420px] 2xl:h-[560px]
              3xl:w-[430px] 3xl:h-[580px]
              4xl:w-[450px] 4xl:h-[600px]
              "
                />
              </div>
            </ScrollWidget>
          </div>
          <div
            className="
        grid grid-cols-1
        md:grid-cols-2
        gap-6
        xs:gap-10
        sm:gap-12
        md:gap-14
        lg:gap-16
        xl:gap-18
        2xl:gap-20
        3xl:gap-24
        items-center
        "
          >
            <ScrollWidget delay={0.3}>
              <h4
                className="mb-3 block md:hidden font-urbanist font-regular text-[#E97451] text-[32px]  xs:text-[32px]
                 sm:text-[32px]l"
              >
                 {data.Founder_card[1].Heading}
              </h4>
              <div className="flex justify-center md:justify-end w-full">
                <ImageWidget
                  src={getS3Url(data.Founder_card[1].Image.url)}
                  alt="Founder"
                  width={500}
                  height={600}
                  className="
              object-cover
               w-[360px] h-[480px]
              xs:w-[420px] xs:h-[530px]
              sm:w-[300px] sm:h-[380px]
              md:w-[340px] md:h-[440px]
              lg:w-[380px] lg:h-[500px]
              xl:w-[400px] xl:h-[530px]
              2xl:w-[420px] 2xl:h-[550px]
              3xl:w-[430px] 3xl:h-[570px]
              4xl:w-[450px] 4xl:h-[590px]
              "
                />
              </div>
            </ScrollWidget>
            <ScrollWidget delay={0.2}>
              <div
                className="
            space-y-2
            xs:space-y-4
            md:space-y-5
            lg:space-y-6
            xl:space-y-4
            md:pl-5
            lg:pl-10
            4xl:max-w-[420px]
            "
              >
                <h4
                  className="block hidden md:block
              font-urbanist font-semibold text-[#E97451]
              text-xl
              xs:text-2xl
              sm:text-3xl
              md:text-3xl
              xl:text-4xl
              3xl:text-[42px]
              4xl:text-[48px]
              "
                >
                   {data.Founder_card[1].Heading}
                </h4>
                <p
                  className="
              font-mulish text-black leading-relaxed
              text-[13px]
              xs:text-[12px]
              sm:text-[13px]
              lg:text-[14px]
              xl:text-[16px]
              2xl:text-[18px]
              3xl:text-[20px]
              4xl:text-[22px]
              "
                >
                  {data.Founder_card[1].Description[0].children[0].text ?? ""}
                </p>
                <p
                  className="
              font-mulish text-black leading-relaxed
              text-[13px]
              xs:text-[13px]
              sm:text-[13px]
              lg:text-[14px]
              xl:text-[16px]
              2xl:text-[18px]
              3xl:text-[20px]
              4xl:text-[22px]
              "
                >
                  {data.Founder_card[1].Description[1].children[0].text ?? ""}
                </p>
                <OrangeButtonWidget content={data.Founder_card[1].Btn_txt} />
              </div>
            </ScrollWidget>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};
export default FounderSection;
