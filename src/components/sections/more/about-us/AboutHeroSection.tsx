"use client";

import { Fragment } from "react/jsx-runtime";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { AboutHeroSectionProps } from "./utils/about-us";

const AboutHeroSection = ({ data }: AboutHeroSectionProps) => {
  return (
    <Fragment>
      <section className="relative z-10 max-w-[2560px] text-white bg-white py-6 md:py-6 overflow-hidden">
        <ParallaxWidget
          speed={1.5}
          start="top bottom"
          end="bottom center"
          className="absolute inset-0 md:hidden z-0"
        >
          <div className="absolute inset-0 w-full h-full">
            <ImageWidget
              src={getS3Url(data?.Mobile_image?.url)}
              alt={data?.Mobile_image?.name || "About Us Mobile"}
              fill
              className="object-cover object-bottom"
            />
          </div>
        </ParallaxWidget>

        <ParallaxWidget
          speed={1.5}
          start="top bottom"
          end="bottom center"
          className="absolute inset-0 hidden md:block z-0"
        >
          <div className="absolute inset-0 w-full h-full">
            <ImageWidget
              src={getS3Url(data?.Image?.url)}
              alt={data?.Image?.name || "About Us"}
              fill
              className="object-cover object-bottom"
            />
          </div>
        </ParallaxWidget>
        <div className="relative z-10 min-h-[1650px] m:min-h-[1500px] xs:min-h-[1500px] sm:min-h-[1500px] md:min-h-[1400px] lg:min-h-[1000px] xl:min-h-[1100px] 2xl:min-h-[1300px] 3xl:min-h-[1500px]">
          <ContainerWidget>
            <ScrollWidget animation="fadeUp" delay={0.1}>
              <h3 className="text-[32px] sm:text-[34px] md:text-[36px] lg:text-[48px] xl:text-[56px] 2xl:text-[64px] 3xl:text-[64px] 4xl:text-[64px]  font-regular text-black font-urbanist">
                {data.Title}
              </h3>
            </ScrollWidget>
            <div className="flex flex-col items-start justify-start gap-2 md:gap-2">
              <ScrollWidget animation="slideLeft" delay={0.2}>
                <HTMLWidget
                  content={data.Heading}
                  className="mb-3 font-mulish font-normal font-regular leading-[32px] 3xl:leading-[48px] text-[24px] md:text-[28px] lg:text-[28px] xl:text-[24px] 2xl:text-[30px] 3xl:text-[40px] text-black sm:max-w-[600px] md:max-w-[750px] lg:max-w-[800px] xl:max-w-[550px] 2xl:max-w-[650px] 3xl:max-w-[852px]"
                  tag="p"
                />
              </ScrollWidget>
              {data.Description?.map((item, index) => {
                const textContent = item.children?.[0]?.text || "";
                const uniqueKey = `${index}-${textContent.slice(0, 20)}`;
                return (
                  <ScrollWidget
                    key={uniqueKey}
                    animation="fadeUp"
                    delay={0.2 + index * 0.1}
                  >
                    <ParagraphWidget className="max-w-full md:max-w-[650px] xl:max-w-[660px] 2xl:max-w-[850px] 3xl:max-w-[854px]">
                      {textContent}
                    </ParagraphWidget>
                  </ScrollWidget>
                );
              })}
            </div>
          </ContainerWidget>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutHeroSection;
