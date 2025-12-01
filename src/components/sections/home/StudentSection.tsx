"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import {
  ArrowLeftBlack,
  ArrowRightBlack,
  Into,
  Play,
} from "@/helpers/ImageHelper";
import type { StudentSectionProps } from "./utils/home";

const StudentSection = ({ data }: StudentSectionProps) => {
  const studentData = data.Card || [];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "end",
      slidesToScroll: 1,
      loop: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const stopAllVideos = () => {
    if (carouselRef.current) {
      const videos = carouselRef.current.querySelectorAll("video");
      videos.forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });
    }
  };

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);
    emblaApi.on("resize", updateScrollButtons);

    const handleResize = () => {
      emblaApi.reInit();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
      emblaApi.off("resize", updateScrollButtons);
      window.removeEventListener("resize", handleResize);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <section className="w-full py-10 md:py-10 lg:py-12 xl:py-16 2xl:py-20 3xl:py-24 bg-white mx-auto max-w-[1920px]">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="flex flex-col justify-start md:justify-center items-start md:items-center text-left md:text-center gap-4.5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
              {data.Title || "Student Testimonials"}
            </h2>
            <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-[40px] text-black">
              {data.Heading}
              {data.SubHeading && (
                <span className="text-[#E97451] pl-2">{data.SubHeading}</span>
              )}
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal max-w-full md:max-w-[760px]">
              {data.Description ||
                "Over the years, Light & Life Academy has grown into a close-knit community. Here, they share their stories of discovery, growth, and the many ways their time at the Academy shaped who they are today."}
            </p>
          </div>
        </ScrollWidget>
      </ContainerWidget>
      <div className="pt-10 md:pt-20 md:pb-5 pb relative px-4 sm:px-0">
        <ScrollWidget animation="fadeDown" delay={0.2}>
          <div className="relative" ref={carouselRef}>
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              ref={emblaRef}
            >
              <div className="flex w-full justify-start md:justify-center gap-4 sm:gap-6">
                {studentData.map((student, index) => {
                  const videoUrl =
                    getS3Url(student.Image?.[0]?.url) || "/dummy.mp4";
                  return (
                    <ScrollWidget
                      key={student.id}
                      animation={index % 2 === 0 ? "fadeUp" : "fadeDown"}
                      delay={0.1 + index * 0.15}
                    >
                      <div
                        className={`shrink-0 ${
                          index % 2 ? "md:mt-30" : "mt-0"
                        } w-[calc(100%-2rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc((100%-4.5rem)/3.5)] lg:w-[calc((100%-4.5rem)/3.5)] xl:w-[calc((100%-4.5rem)/3.5)] 2xl:w-[calc((100%-4.5rem)/3.5)]`}
                      >
                        {/* biome-ignore lint/a11y/noStaticElementInteractions: Hover-only interaction for video playback, not a clickable element */}
                        <div
                          className="group relative flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out delay-75 p-3 sm:p-4 lg:p-5 aspect-3/4 min-h-[380px] sm:min-h-[480px] sm:max-w-[330px] bg-[#F6F6F6] hover:bg-[#E97451]/80 3xl:min-w-[410px] 3xl:h-[651px]"
                          onMouseEnter={(e) => {
                            const video =
                              e.currentTarget.querySelector("video");
                            if (video) {
                              video.play().catch(() => {});
                            }
                          }}
                          onMouseLeave={(e) => {
                            const video =
                              e.currentTarget.querySelector("video");
                            if (video) {
                              video.pause();
                            }
                          }}
                        >
                          <video
                            src={videoUrl}
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover z-0 p-1.5"
                          />
                          <div className="relative z-20 flex items-end justify-between h-full">
                            <div
                              className="flex flex-col justify-end gap-3 bg-[#E97451]/80 w-full h-27 p-4"
                              style={{
                                clipPath:
                                  "polygon(0 0%, 100% 23%, 100% 100%, 0% 100%)",
                              }}
                            >
                              <h3 className="font-mulish text-xl md:text-xl lg:text-2xl xl:text-[20px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-white font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight transition-colors duration-500 ease-in-out delay-150">
                                {student.Title}
                              </h3>
                              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base 3xl:text-lg font-normal text-white">
                                {student.Description}
                              </p>
                            </div>
                            <DialogWidget
                              trigger={
                                <div className="absolute right-5 bottom-15 w-13 h-13">
                                  <div className="video-main">
                                    <div className="waves-block">
                                      <div className="waves wave-1" />
                                      <div className="waves wave-2" />
                                      <div className="waves wave-3" />
                                    </div>
                                  </div>
                                  <ButtonWidget
                                    type="button"
                                    className="relative w-13 h-13 p-0 bg-transparent hover:bg-transparent border-none shadow-none rounded-full group/play-button transition-all duration-300 ease-out z-10"
                                  >
                                    <ImageWidget
                                      src={Play}
                                      alt="play video"
                                      className="w-13 cursor-pointer h-13 text-white group-hover/play-button:text-[#E97451] transition-colors duration-500 ease-in-out relative z-10"
                                    />
                                  </ButtonWidget>
                                </div>
                              }
                              contentClassName="sm:max-w-[90vw] lg:max-w-[800px] p-0"
                              showCancel={false}
                              onOpenChange={(open) => {
                                if (!open) {
                                  stopAllVideos();
                                }
                              }}
                              showCloseButton={false}
                              customCloseButton={
                                <DialogClose asChild>
                                  <div className="cursor-pointer -mt-[30px] -mr-[30px]">
                                    <ImageWidget
                                      src={Into}
                                      alt="Into"
                                      className="w-[30px] h-[30px]"
                                    />
                                  </div>
                                </DialogClose>
                              }
                            >
                              <div className="relative w-full aspect-video bg-black rounded-lg">
                                <video
                                  src={videoUrl}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  controls
                                  className="w-full h-full object-contain rounded-lg"
                                />
                              </div>
                            </DialogWidget>
                          </div>
                        </div>
                      </div>
                    </ScrollWidget>
                  );
                })}
              </div>
            </div>
            <div className="md:hidden flex gap-2 mt-5 justify-start">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`h-[35px] w-[35px] sm:h-[35px]  md:h-[40px] lg:h-[40px] xl:h-[48px] 2xl:h-[48px] 3xl:h-[48px] sm:w-[35px] md:w-[40px] lg:w-[40px] xl:w-[48px] 2xl:w-[48px] 3xl:w-[48px]  ${
                  !canScrollPrev
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                aria-label="Previous"
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
                aria-label="Next"
              >
                <ImageWidget
                  src={ArrowRightBlack}
                  alt="Next"
                  className="w-[35px] h-[35px]"
                />
              </button>
            </div>
          </div>
        </ScrollWidget>
      </div>
    </section>
  );
};

export default StudentSection;
