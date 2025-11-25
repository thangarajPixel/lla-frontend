import { Fragment } from "react/jsx-runtime";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { AboutBg } from "@/helpers/ImageHelper";
import { AboutHeroSectionProps } from "./utils/about-us";
import { getS3Url } from "@/helpers/ConstantHelper";

const AboutHeroSection = ({ data }: AboutHeroSectionProps) => {
  return (
    <Fragment>
      <section
        className="
          w-full bg-white py-2 
          h-auto 
          sm:min-h-[300px]
          md:min-h-[380px]
          lg:min-h-[450px]
          xl:min-h-[500px]
          2xl:min-h-[580px]
          3xl:min-h-[600px]
          4xl:min-h-[2228px]
        "
      >
        <ContainerWidget>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-4">
            <ScrollWidget animation="fadeUp" delay={0.1}>
              <h3
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                xl:text-7xl 2xl:text-[70px] 3xl:text-[80px] 4xl:text-[95px]
                font-normal text-black font-urbanist"
              >
                {data.Title}
              </h3>
            </ScrollWidget>
            <ScrollWidget animation="slideLeft" delay={0.2}>
              <p
                className="
                font-area-variable font-semibold 
                text-base md:text-lg lg:text-xl xl:text-2xl 
                2xl:text-3xl 3xl:text-[40px] 4xl:text-[48px] 
                text-black 
                sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] 
                xl:max-w-[550px] 2xl:max-w-[650px] 3xl:max-w-[700px] 4xl:max-w-[900px]
              "
              >
                {data.Heading}
                <span className="text-[#E97451] ml-2">{data.SubHeading}</span>
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.3}>
              <p
                className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              "
              >
                {data.Description[0].children[0].text}
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.4}>
              <p
                className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              "
              >
                {data.Description[1].children[0].text}
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.2}>
              <p
                className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              "
              >
                {data.Description[2].children[0].text}
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.3}>
              <p
                className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              "
              >
                {data.Description[3].children[0].text}
              </p>
            </ScrollWidget>
          </div>
        </ContainerWidget>
      </section>
      <section
        className="
          z-50 max-w-[2560px] bg-cover bg-bottom bg-no-repeat 
          min-h-[510px] 
          lg:min-h-[580px]
          xl:min-h-[700px] 
          2xl:min-h-[800px]
          3xl:min-h-[1004px]
          4xl:min-h-[1204px]
          bg-white text-white
        "
        style={{
          backgroundImage: `url(${getS3Url(data?.Image?.url) || AboutBg.src})`,
        }}
      >
        <ContainerWidget>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-4">
            <ScrollWidget animation="fadeUp" delay={0.4}>
              <p
                className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              "
              >
                {data.Description[4].children[0].text}
              </p>
            </ScrollWidget>
          </div>
        </ContainerWidget>
      </section>
    </Fragment>
  );
};

export default AboutHeroSection;
