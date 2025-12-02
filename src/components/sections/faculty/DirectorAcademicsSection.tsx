import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { FacultyFounderSectionProps } from "./utils/faculty";

const DirectorAcademicsSection = ({ data }: FacultyFounderSectionProps) => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20 2xl:py-20">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <h2 className="font-urbanist font-normal text-left md:text-center text-black text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            {data?.Title}
          </h2>
        </ScrollWidget>
        <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 md:gap-10 lg:gap-10 xl:gap-15 2xl:gap-10 3xl:gap-15">
          <ScrollWidget
            delay={0.3}
            className="order-2 md:order-1 w-full lg:w-1/2 space-y-4 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-5"
          >
            <div className="space-y-3 md:space-y-2 lg:space-y-3 xl:space-y-4 w-200 s:w-[290px] xss:w-[350px] xs:w-[410px] md:w-[320px] sm:w-[350px] md:w-[380px] lg:w-[340px] xl:w-[360px] 2xl:w-[400px] 3xl:w-[520px]">
            <h3 className="font-urbanist font-normal text-left  text-[#E97451] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
              {data?.Founder_card[0]?.Heading}
            </h3>
            <p className=" text-left  font-mulish text-black text-[18px] sm:text-[14px] md:text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] 3xl:text-[18px]">
                {data?.Founder_card[0]?.Description[0]?.children[0]?.text}
              </p>
            <p className=" text-left  font-mulish text-black text-[18px] sm:text-[14px] md:text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] 3xl:text-[18px]">
                {data?.Founder_card[0]?.Description[1]?.children[0]?.text}
              </p>
            <p className="text-left  font-mulish text-black text-[18px] sm:text-[14px] md:text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] 3xl:text-[18px]">
                {data?.Founder_card[0]?.Description[2]?.children[0]?.text}
              </p>
               <OrangeButtonWidget content={data.Founder_card[0].Btn_txt ?? ""} />
            </div>
          </ScrollWidget>
          <ScrollWidget delay={0.4} className="order-1 md:order-2">
            <div className="relative h-[484px] w-[361px] s:h-[400px] s:w-[300px] xss:h-[420px] xss:w-[340px] xs:h-[520px] xs:w-[420px] sm:h-[520px] sm:w-[400px] md:h-[484px] md:w-[361px] lg:h-[470px] lg:w-[370px] xl:h-[480px] xl:w-[370px] 2xl:h-[520px] 2xl:w-[400px]  3xl:w-[520px] 3xl:h-[696px] overflow-hidden">
              <ImageWidget
                src={getS3Url(data.Founder_card[0].Image.url)}
                alt={data.Founder_card[0].Image.name}
                fill
                className="object-cover"
              />
            </div>
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default DirectorAcademicsSection;
