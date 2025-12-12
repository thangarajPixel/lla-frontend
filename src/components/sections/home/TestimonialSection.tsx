"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { ArrowLeftBlack, ArrowRightBlack, Quote } from "@/helpers/ImageHelper";
import type { TestimonialData } from "../courses/utils/types";

type TestimonialSectionProps = {
  data: TestimonialData[] | TestimonialData;
};

const TestimonialSection = ({ data }: TestimonialSectionProps) => {
  const sectionData = Array.isArray(data) ? data[0] : data;
  const testimonials = sectionData?.Slider;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: true,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (testimonials?.length === 0) return null;
  return (
    <section className="w-full bg-[#ECECEC] flex flex-col z-40 relative py-10 sm:py-14 md:py-18 lg:py-20 xl:py-20 2xl:py-20 3xl:py-20">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 items-stretch">
            <div className="space-y-3 md:space-y-3 lg:space-y-4">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                {sectionData?.Title}
              </h3>
              <HTMLWidget
                content={sectionData.Heading}
                className="max-w-[520px] font-area-variable font-semibold text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black"
                tag="p"
              />

              <p className="text-[16px] lg:text-[17px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[450px]">
                {sectionData?.Description}
              </p>
            </div>
            <div className="relative h-full flex flex-col">
              <div className="px-px">
                <div
                  className="overflow-hidden cursor-grab active:cursor-grabbing"
                  ref={emblaRef}
                >
                  <div className="flex w-full">
                    {testimonials.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="shrink-0 w-full bg-white border border-[#E97451] p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4 px-5 md:px-0"
                      >
                        <div className="flex flex-col gap-2 items-start md:items-center  md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 3xl:gap-6 h-full w-full ">
                          <div className="flex items-center">
                            <ImageWidget
                              src={Quote}
                              alt="Quote"
                              className="object-center w-[40px] h-[40px] xss:w-[40px] xss:h-[40px] opacity-80"
                            />
                          </div>
                          <p className="md:text-center text-[16px] lg:text-[15px] xl:text-[18px] 3xl:text-[24px] font-normal font-mulish  text-black leading-normal w-full md:max-w-[750px]">
                            {testimonial.Description}
                          </p>

                          <p className="mb-2 text-lg xss:text-[16px] sm:text-xl md:text-2xl lg:text-[24px] text-[#E97451] font-regular font-mulish">
                            {testimonial.Name}
                          </p>

                          <p className="md:text-center mb-3 text-sm xss:text-[16px] sm:text-base md:text-[14px] 3xl:text-[16px] text-black font-regular font-mulish lg:-mt-5">
                            {testimonial.Batch}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-start mt-5 md:justify-center md:mt-5">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className={`h-[35px] w-[35px] sm:h-[35px]  md:h-[40px] lg:h-[40px] xl:h-[48px] 2xl:h-[48px] 3xl:h-[48px] sm:w-[35px] md:w-[40px] lg:w-[40px] xl:w-[48px] 2xl:w-[48px] 3xl:w-[48px]  ${
                    !canScrollPrev
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <ImageWidget
                    src={ArrowLeftBlack}
                    alt="Prev"
                    className="w-[35px] h-[35px]"
                  />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className={`h-[35px] w-[35px] sm:h-[35px]  md:h-[40px] lg:h-[40px] xl:h-[48px] 2xl:h-[48px] 3xl:h-[48px] sm:w-[35px] md:w-[40px] lg:w-[40px] xl:w-[48px] 2xl:w-[48px] 3xl:w-[48px]  ${
                    !canScrollNext
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <ImageWidget
                    src={ArrowRightBlack}
                    alt="Next"
                    className="w-[35px] h-[35px]"
                  />
                </button>
              </div>
            </div>
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default TestimonialSection;
