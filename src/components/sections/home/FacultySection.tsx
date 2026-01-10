"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import WheelGestures from "embla-carousel-wheel-gestures";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { FacultySectionProps } from "./utils/home";

const FacultySection = ({ data }: FacultySectionProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "end",
      slidesToScroll: 1,
      loop: false,
      dragFree: true,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 1500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      WheelGestures({
        forceWheelAxis: "x",
        wheelDraggingClass: "is-wheel-dragging",
      }),
    ],
  );

  const facultyData = data.Card;

  if (data?.Card?.length === 0) return null;
  return (
    <section className="w-full py-8 md:py-12 lg:pt-16 xl:pt-20 2xl:pt-24 3xl:pt-28 bg-white mx-auto max-w-[1920px]">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="flex flex-col justify-start md:justify-center items-start md:items-center text-left md:text-center gap-2.5 md:gap-4.5">
            <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
              {data.Title}
            </h2>
            <HTMLWidget
              content={data.Heading}
              className="font-area-variable font-semibold text-[24px] md:text-[28px] 3xl:text-[40px] text-black leading-tight"
              tag="p"
            />
            <ParagraphWidget className="w-full md:max-w-[700px]">
              {data.Description}
            </ParagraphWidget>
            <LinkWidget href="/faculty" className="w-full mt-3 sm:mt-0">
              <OrangeButtonWidget content={data.Btn_txt} />
            </LinkWidget>
          </div>
        </ScrollWidget>
      </ContainerWidget>
      <div className="pt-8 relative">
        <div className="px-4 sm:px-6 md:hidden">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            {facultyData.slice(0, 6).map((faculty, index) => (
              <ScrollWidget
                key={faculty.id}
                animation="scale"
                delay={0.1 + index * 0.1}
              >
                <div className="flex flex-col gap-2 sm:gap-3 group">
                  <div className="w-full aspect-square sm:aspect-auto overflow-hidden relative">
                    <ImageWidget
                      src={getS3Url(faculty?.Image?.[0]?.url) || ""}
                      alt={faculty.Title}
                      fill
                      className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="font-mulish text-lg xss:text-[16px] sm:text-xl font-bold text-black font-urbanist leading-tight truncate">
                    {faculty.Title}
                  </h3>
                  <ParagraphWidget className="line-clamp-2 overflow-hidden text-ellipsis">
                    {faculty.Description}
                  </ParagraphWidget>
                  {/* <div className="self-start mt-auto">
                    <LinkWidget
                      href={`/photography/${faculty.Slug}`}
                      className="w-full"
                    >
                      <OrangeButtonWidget content={faculty.Btn_txt} />
                    </LinkWidget>
                  </div> */}
                </div>
              </ScrollWidget>
            ))}
          </div>
          <div className="min-h-[70px]  flex flex-col justify-center items-start mt-4">
            <div className="self-start md:self-center">
              <LinkWidget href="/faculty" className="w-full">
                <OrangeButtonWidget content={data.Btn_txt} />
              </LinkWidget>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="overflow-hidden" ref={emblaRef}>
            <div
              className={`flex ${
                facultyData.length >= 6 ? "justify-start" : "justify-end"
              }`}
            >
              {facultyData.map((faculty, index) => (
                <div
                  key={faculty.id}
                  className={`shrink-0 ${
                    index === 0
                      ? "mt-10 hover:mt-0"
                      : index === 3
                        ? "mt-20 hover:mt-0"
                        : index % 2
                          ? "mt-40 hover:mt-0"
                          : "mt-0"
                  } w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)] xl:w-[calc((100%-6rem)/5)] 2xl:w-[calc((100%-7.5rem)/6)] transition-all duration-1000 ease-in-out delay-150`}
                >
                  <ScrollWidget animation="scale" delay={0.1 + index * 0.05}>
                    <div className="group relative flex flex-col gap-3 overflow-hidden transition-all duration-500 ease-in-out delay-75 hover:bg-[#E97451]/20 p-3.5 cursor-pointer">
                      <div className="relative w-full aspect-square overflow-hidden transition-transform duration-500 ease-in-out delay-100 group-hover:scale-[1.02]">
                        <ImageWidget
                          src={getS3Url(faculty?.Image?.[0]?.url) || ""}
                          alt={faculty.Title}
                          fill
                          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 3xl:min-w-[299px] 3xl:min-h-[299px]"
                        />
                      </div>
                      <h3 className="font-mulish text-xl  md:text-xl lg:text-2xl xl:text-[20px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight transition-colors duration-500 ease-in-out delay-150">
                        {faculty.Title}
                      </h3>
                      <div className="opacity-0 transition-all duration-500 ease-in-out delay-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                        <ParagraphWidget>{faculty.Description}</ParagraphWidget>
                        <div className="self-start mt-3">
                          <LinkWidget
                            href={`/photography/${faculty.Slug}`}
                            className="w-full"
                          >
                            <OrangeButtonWidget
                              content={faculty.Btn_txt || "Know More"}
                            />
                          </LinkWidget>
                        </div>
                      </div>
                    </div>
                  </ScrollWidget>
                </div>
              ))}
              <div
                className={`shrink-0 ${
                  facultyData.length % 2 ? "mt-30" : "mt-0"
                } w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)] xl:w-[calc((100%-6rem)/5)] 2xl:w-[calc((100%-7.5rem)/6)] ml-3`}
              >
                <ScrollWidget
                  animation="scale"
                  delay={0.1 + facultyData.length * 0.05}
                >
                  <div className="min-h-[230px] group relative flex flex-col justify-center gap-3 overflow-hidden transition-all duration-500 ease-in-out delay-75  p-3.5 cursor-pointer">
                    <h3 className="font-mulish text-xl md:text-xl lg:text-2xl xl:text-[20px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight transition-colors duration-500 ease-in-out delay-150">
                      {" "}
                    </h3>
                    <div className="self-left text-center -mt-4">
                      <LinkWidget href="/faculty" className="w-full">
                        <OrangeButtonWidget content={data.Btn_txt} />
                      </LinkWidget>
                    </div>
                  </div>
                </ScrollWidget>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
