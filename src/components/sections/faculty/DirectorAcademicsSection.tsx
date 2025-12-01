import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { FounderDummy1 } from "@/helpers/ImageHelper";
import { FacultyFounderSectionProps } from "./utils/faculty";

const DirectorAcademicsSection = ({ data }: FacultyFounderSectionProps) => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20 2xl:py-20">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <h2 className="font-urbanist font-normal text-center text-black text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] mb-8 sm:mb-10 md:mb-12 lg:mb-16">
           {data?.Title}
          </h2>
        </ScrollWidget>
        <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 md:gap-2 lg:gap-10 xl:gap-15 2xl:gap-15 3xl:gap-15">
          <ScrollWidget delay={0.3} className="order-2 md:order-1 w-full lg:w-1/2 space-y-4 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-5">
            <h3 className="font-urbanist font-normal text-[#E97451] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
              {data?.Founder_card[0]?.Heading}
            </h3>
            <div className="space-y-3 md:space-y-2 lg:space-y-3 xl:space-y-4 md:w-[300px] lg:w-[420px] xl:w-[420px] 2xl:w-[500px]  3xl:w-[520px]">
              <p className="font-mulish font-regular font-normal text-black text-[14px] sm:text-[15px] md:text-[14px] lg:text-[15px] xl:text-[15px] 2xl:text-[18px] leading-[22px] md:leading-[20px] 2xl:leading-[26px]">
                {data?.Founder_card[0]?.Description[0]?.children[0]?.text}
              </p>
              
              <p className="font-mulish font-regular font-normal  text-black text-[14px] sm:text-[15px] md:text-[14px] lg:text-[15px] xl:text-[15px] 2xl:text-[18px] leading-[22px] md:leading-[20px]  2xl:leading-[26px]">
                {data?.Founder_card[0]?.Description[1]?.children[0]?.text}
              </p>
              
              <p className="font-mulish font-regular font-normal text-black text-[14px] sm:text-[15px] md:text-[14px] lg:text-[15px] xl:text-[15px] 2xl:text-[18px] leading-[22px] md:leading-[20px] 2xl:leading-[26px]">
                {data?.Founder_card[0]?.Description[2]?.children[0]?.text}
              </p>
            </div>
             <OrangeButtonWidget content={data.Founder_card[0].Btn_txt ?? ""} />
          </ScrollWidget>
          <ScrollWidget delay={0.4} className="order-1 md:order-2">
            <div className="relative h-[484px] w-[361px] sm:h-[484px] sm:w-[400px] md:h-[500px] md:w-[361px] lg:h-[520px] lg:w-[400px] xl:h-[520px] xl:w-[400px] 2xl:h-[500px] 2xl:w-[680px]  3xl:w-[520px] 3xl:h-[696px] overflow-hidden">
              <ImageWidget
                src={ getS3Url(data.Founder_card[0].Image.url)}
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
