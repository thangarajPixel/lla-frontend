import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { FacultyFounderSectionProps } from "./utils/faculty";
import LinkWidget from "@/components/widgets/LinkWidget";

const DirectorAcademicsSection = ({ data }: FacultyFounderSectionProps) => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20 2xl:py-20">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <h2 className="font-urbanist font-normal text-left md:text-center text-black text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            {data?.Title}
          </h2>
        </ScrollWidget>
        <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 md:gap-20 lg:gap-20 xl:gap-25 2xl:gap-30 3xl:gap-35">
          <ScrollWidget
            delay={0.3}
            className="order-2 md:order-1 w-full md:flex-1"
          >
            <div className="space-y-3 s:space-y-3 m:space-y-3 xss:space-y-4 xs:space-y-4 sm:space-y-4 md:space-y-3 lg:space-y-4 xl:space-y-2 2xl:space-y-3 3xl:space-y-4">
              <h3 className="font-urbanist font-normal text-left text-[#E97451] text-[18px] s:text-[19px] m:text-[20px] xss:text-[21px] xs:text-[22px] sm:text-[23px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] 3xl:text-[34px]">
                {data?.Founder_card[0]?.Heading}
              </h3>
              <p className="text-left font-mulish text-black text-[14px] s:text-[14px] m:text-[14px] xss:text-[15px] xs:text-[15px] sm:text-[15px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[18px] leading-relaxed">
                {data?.Founder_card[0]?.Description[0]?.children[0]?.text}
              </p>
              <p className="text-left font-mulish text-black text-[14px] s:text-[14px] m:text-[14px] xss:text-[15px] xs:text-[15px] sm:text-[15px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[18px] leading-relaxed">
                {data?.Founder_card[0]?.Description[1]?.children[0]?.text}
              </p>
              <p className="text-left font-mulish text-black text-[14px] s:text-[14px] m:text-[14px] xss:text-[15px] xs:text-[15px] sm:text-[15px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[18px] leading-relaxed">
                {data?.Founder_card[0]?.Description[2]?.children[0]?.text}
              </p>
              <div className="pt-2 s:pt-2 m:pt-2 xss:pt-2 xs:pt-2 sm:pt-2 md:pt-3 lg:pt-3 xl:pt-3 2xl:pt-3 3xl:pt-4">
                   <LinkWidget href={`/faculty/${data.Founder_card[0].Slug}`}>
                <OrangeButtonWidget
                  content={data.Founder_card[0].Btn_txt ?? ""}
                />
                </LinkWidget>
              </div>
            </div>
          </ScrollWidget>
          <ScrollWidget delay={0.4} className="order-1 md:order-2">
            <div className="relative h-[484px] w-[361px] s:h-[410px] s:w-[300px] m:h-[430px] m:w-[350px] xss:h-[440px] xss:w-[370px] xs:h-[540px] xs:w-[430px] sm:h-[520px] sm:w-[400px] md:h-[484px] md:w-[361px] lg:h-[470px] lg:w-[370px] xl:h-[480px] xl:w-[370px] 2xl:h-[520px] 2xl:w-[400px]  3xl:w-[520px] 3xl:h-[696px] overflow-hidden">
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
