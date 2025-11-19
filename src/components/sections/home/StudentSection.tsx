"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Into, Play } from "@/helpers/ImageHelper";
import { DialogClose } from "@/components/ui/dialog";

const StudentSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "end",
      slidesToScroll: 1,
      loop: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 3000,
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

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  const studentData = [
    {
      id: "student-0",
      name: "Johnson",
      role: "Batch - ‘09 - ‘10",
      videoSrc: "/dummy.mp4",
    },
    {
      id: "student-1",
      name: "Michael Chen",
      role: "Batch - ‘09 - ‘10",
      videoSrc: "/dummy.mp4",
    },
    {
      id: "student-2",
      name: "Emily Rodriguez",
      role: "Batch - ‘09 - ‘10",
      videoSrc: "/dummy.mp4",
    },
  ];

  return (
    <section className="w-full py-10 md:py-10 lg:py-12 xl:py-16 2xl:py-20 3xl:py-24 bg-white mx-auto max-w-[1920px]">
      <ContainerWidget>
        <ScrollWidget animation="slideRight" delay={0.1}>
          <div className="flex flex-col justify-start md:justify-center items-start md:items-center text-left md:text-center gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-normal text-black font-urbanist">
              Student Testimonials
            </h2>
            <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-[40px] text-black">
              Hear from
              <span className="text-[#E97451] pl-2">Our Community</span>
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
              Over the years, Light & Life Academy has grown into a close-knit
              community. Here, they share their stories of
              <br className="hidden sm:block" /> discovery, growth, and the many
              ways their time at the Academy shaped who they are today.
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
              <div className={`flex gap-4 sm:gap-6 justify-center`}>
                {studentData.map((student, index) => (
                  <ScrollWidget
                    key={student.id}
                    animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
                    delay={0.1 + index * 0.15}
                  >
                    <div
                      className={`shrink-0 ${index % 2 ? "md:mt-30" : "mt-0"
                        } w-[calc(100%-2rem)] min-w-[320px] sm:w-[calc((100%-3rem-1rem)/2)] md:w-[calc((100%-4.5rem)/3.5)] lg:w-[calc((100%-4.5rem)/3.5)] xl:w-[calc((100%-4.5rem)/3.5)] 2xl:w-[calc((100%-4.5rem)/3.5)]`}
                    >
                      {/* biome-ignore lint/a11y/noStaticElementInteractions: Hover-only interaction for video playback, not a clickable element */}
                      <div
                        className="group relative flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out delay-75 p-3 sm:p-4 lg:p-5 aspect-3/4 min-h-[380px] sm:min-h-[430px] bg-[#F6F6F6] hover:bg-[#E97451]/80"
                        onMouseEnter={(e) => {
                          const video = e.currentTarget.querySelector("video");
                          if (video) {
                            video.play().catch(() => { });
                          }
                        }}
                        onMouseLeave={(e) => {
                          const video = e.currentTarget.querySelector("video");
                          if (video) {
                            video.pause();
                          }
                        }}
                      >
                        <video
                          src={student.videoSrc}
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover z-0 p-1.5"
                        />
                        <div className="relative z-20 flex items-end justify-between h-full">
                          <div
                            className="flex flex-col justify-end gap-3 bg-[#E97451]/80 w-full h-30 p-4"
                            style={{
                              clipPath:
                                "polygon(0 0%, 100% 42%, 100% 100%, 0% 100%)",
                            }}
                          >
                            <h3 className="font-mulish text-xl md:text-xl lg:text-2xl xl:text-[20px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-white font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight transition-colors duration-500 ease-in-out delay-150">
                              {student.name}
                            </h3>
                            <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base 3xl:text-lg font-normal text-white">
                              {student.role}
                            </p>
                          </div>
                          <DialogWidget
                            trigger={
                              <ButtonWidget
                                className="absolute right-3 bottom-10 w-18 h-18 p-0 bg-transparent hover:bg-transparent border-none shadow-none rounded-full group/play-button hover:scale-110 active:scale-95 transition-all duration-300 ease-out animate-play-pulse"
                                aria-label="Play video"
                              >
                                <ImageWidget
                                  src={Play}
                                  alt=""
                                  className="w-18 cursor-pointer h-18 text-white group-hover/play-button:text-[#E97451] transition-colors duration-500 ease-in-out"
                                  aria-hidden="true"
                                />
                              </ButtonWidget>
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
                                  <ImageWidget src={Into} alt="Into" className="w-[30px] h-[30px]" />
                                </div>
                              </DialogClose>
                            }
                          >
                            <div className="relative w-full aspect-video bg-black rounded-lg">
                              <video
                                src={student.videoSrc}
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
                ))}
              </div>
              <div className="md:hidden flex gap-2 mt-10">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className={`p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${!canScrollPrev ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className={`p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${!canScrollNext ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </ScrollWidget>
      </div>
    </section>
  );
};

export default StudentSection;
