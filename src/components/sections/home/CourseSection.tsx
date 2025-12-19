"use client";

import { useEffect, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { CourseSectionProps } from "./utils/home";

type AnimationType =
  | "fadeIn"
  | "fadeUp"
  | "fadeDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "rotate";

const CourseSection = ({ data }: CourseSectionProps) => {
  const [imageIndices, setImageIndices] = useState<number[]>(() => {
    return data?.Card?.map(() => 0) || [];
  });

  useEffect(() => {
    setImageIndices(
      data?.Card?.map((card) => {
        const images = card?.Image;
        return images && images.length > 0
          ? Math.floor(Math.random() * images.length) * 1
          : 0;
      }),
    );
  }, [data?.Card]);

  const animations: Array<{
    image: AnimationType;
    content: AnimationType;
    delay: { image: number; content: number };
  }> = [
    {
      image: "scale",
      content: "slideLeft",
      delay: { image: 0.1, content: 0.3 },
    },
    {
      image: "fadeDown",
      content: "slideRight",
      delay: { image: 0.2, content: 0.4 },
    },
  ];

  const parallaxSpeeds = [
    { image: 0.4, content: -0.25 },
    { image: 0.35, content: -0.15 },
  ];

  const contentClasses = [
    "space-y-3 md:space-y-3 lg:space-y-4 relative z-10 w-full",
    "space-y-3 md:space-y-3 lg:space-y-4 relative z-10 w-full",
  ];

  const cardContainerClasses = [
    "space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6",
    "space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6 md:mt-28 lg:mt-26 xl:mt-16 2xl:mt-34 3xl:mt-44",
  ];

  if (data?.Card?.length === 0) return null;
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white">
      <ContainerWidget>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
          <div className="space-y-2.5 md:space-y-3 lg:space-y-4">
            <h2 className="text-3xl font-area-variable xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
              {data.Title}
            </h2>
            <HTMLWidget
              content={data.Heading}
              className="font-area-variable font-semibold text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black"
              tag="p"
            />
            <ParagraphWidget className="w-full md:max-w-[750px]">
              {data.Description}
            </ParagraphWidget>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 2xl:gap-6">
            {data?.Card?.map((card, index) => {
              const images = card?.Image;
              const imageIndex = imageIndices[index] ?? 0;
              const primaryImage = images?.[imageIndex] ?? null;
              const imageUrl = primaryImage?.url
                ? getS3Url(primaryImage.url)
                : null;

              return (
                <div
                  key={card.id}
                  className={
                    cardContainerClasses[index] || cardContainerClasses[0]
                  }
                >
                  <ScrollWidget
                    animation={animations[index]?.image || "scale"}
                    delay={animations[index]?.delay.image || 0.1}
                  >
                    <ParallaxWidget
                      speed={parallaxSpeeds[index]?.image || 0.4}
                      className="relative w-full aspect-4/3 overflow-hidden xss:max-h-[242px] xss:min-w-[360px] sm:min-w-full sm:max-h-full"
                    >
                      {imageUrl && (
                        <ImageWidget
                          src={imageUrl}
                          alt={card?.Title}
                          fill
                          className="object-cover 3xl:max-h-[429px] 3xl:max-w-[630px]"
                        />
                      )}
                    </ParallaxWidget>
                  </ScrollWidget>
                  <ScrollWidget
                    animation={animations[index]?.content || "slideLeft"}
                    delay={animations[index]?.delay.content || 0.3}
                  >
                    <ParallaxWidget
                      speed={parallaxSpeeds[index]?.content || -0.25}
                      className={contentClasses[index] || contentClasses[0]}
                    >
                      <h3 className="text-xl xss:text-[24px] md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] 3xl:text-[40px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight">
                        {card.Title}
                      </h3>
                      <ParagraphWidget>{card.Description}</ParagraphWidget>
                      {card.Btn_txt !== null && (
                        <div className="self-start flex gap-4">
                          <LinkWidget href={`/courses/${card.Slug}`}>
                            <OrangeButtonWidget content={card.Btn_txt} />
                          </LinkWidget>
                        </div>
                      )}
                    </ParallaxWidget>
                  </ScrollWidget>
                </div>
              );
            })}
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default CourseSection;
