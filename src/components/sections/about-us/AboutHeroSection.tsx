import { Fragment } from "react/jsx-runtime";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { AboutHeroSectionProps } from "./utils/about-us";

const AboutHeroSection = ({ data }: AboutHeroSectionProps) => {
  return (
    <Fragment>
      <section 
        className="
          z-40 max-w-[2560px] bg-cover bg-bottom bg-no-repeat 
          min-h-[2150px] 
          md:min-h-[1200px]
          lg:min-h-[1200px]
          xl:min-h-[1100px] 
          2xl:min-h-[1550px]
          3xl:min-h-[1650px]
          bg-white text-white
        "
        style={{
          backgroundImage: `url(${getS3Url(data?.Image?.url)})`,
        }}
      >
        <ContainerWidget>
           <ScrollWidget animation="fadeUp" delay={0.1}>
              <h3  className="text-[32px] sm:text-[34px] md:text-[36px] lg:text-[48px] 
                xl:text-[56px] 2xl:text-[64px] 3xl:text-[64px] 4xl:text-[64px]
                font-regular text-black font-urbanist">
                {data.Title}
              </h3>
            </ScrollWidget>
          <div className="flex flex-col items-start justify-start gap-2 md:gap-2">
            <ScrollWidget animation="slideLeft" delay={0.2}>
              <p  className="font-mulish font-regular text-[24px] md:text-[28px] lg:text-[28px] xl:text-[24px] 
                2xl:text-[30px] 3xl:text-[40px] text-black sm:max-w-[600px] md:max-w-[750px] lg:max-w-[800px] 
                xl:max-w-[550px] 2xl:max-w-[650px] 3xl:max-w-[852px]">
                {data.Heading}
                <span className="text-[#E97451] ml-2">{data.SubHeading}</span>
              </p>
            </ScrollWidget>
             {data.Description?.map((item, index) => (
              <ScrollWidget
                key={index}
                animation="fadeUp"
                delay={0.2 + index * 0.1}
              >
                <p
                  className="text-[16px] sm:text-[16px] lg:text-[16px] font-mulish font-normal
                  xl:text-[16px] 2xl:text-[18px] 3xl:text-[18px] 4xl:text-[18px]
                  font-regular text-black leading-[24px] md:leading-[24px] 
                  lg:leading-[24px] xl:leading-[24px] 2xl:leading-[26px] 3xl:leading-[26px]
                  w-full md:max-w-[650px] xl:max-w-[660px] 2xl:max-w-[850px]
                  3xl:max-w-[854px] 4xl:max-w-[1100px]"
                >
                  {item.children?.[0]?.text}
                </p>
              </ScrollWidget>
            ))}
          </div>
        </ContainerWidget>
      </section>
    </Fragment>
  );
};

export default AboutHeroSection;
