"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import { ArrowRightBlack, ArrowLeftBlack } from "@/helpers/ImageHelper";

const TestimonialSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: false,
    dragFree: false,
  });

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

  const testimonials = [
    {
      id: "testimonial-1",
      name: "John Doe",
      role: "Alumni, Batch '15",
      quote:
        "LLA transformed my perspective on photography. The mentors here don't just teach techniques—they nurture creativity and help you find your unique voice.",
    },
    {
      id: "testimonial-2",
      name: "Sarah Johnson",
      role: "Industry Professional",
      quote:
        "The connections I made at LLA have been invaluable. It's more than a school; it's a community that continues to support and inspire long after graduation.",
    },
    {
      id: "testimonial-3",
      name: "Michael Chen",
      role: "Alumni, Batch '20",
      quote:
        "The hands-on approach and real-world projects prepared me for my career in ways I never expected. LLA is truly special.",
    },
    {
      id: "testimonial-4",
      name: "Emily Rodriguez",
      role: "Visiting Artist",
      quote:
        "I've visited many institutions, but LLA stands out for its commitment to both technical excellence and artistic expression.",
    },
  ];

  return (
    <section className="w-full bg-[#ECECEC] flex flex-col z-40 relative py-10 md:py-20 lg:py-28 xl:py-32 2xl:py-36 3xl:py-40">
      <ContainerWidget>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">

          {/* LEFT SECTION */}
          <div className="space-y-2 md:space-y-3 lg:space-y-5 xl:space-y-6 2xl:space-y-8">
            <h3 className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              xl:text-7xl 2xl:text-8xl 3xl:text-[90px]
              font-normal text-black font-urbanist
            ">
              Testimonials
            </h3>

            <p className="
              font-area-variable font-semibold 
              text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 
              2xl:text-4xl 3xl:text-[45px] 
              text-black
            ">
              25 Years,
              <span className="text-[#E97451] ml-2">
                Countless
                <br className="hidden sm:block" /> Connections
              </span>
            </p>

            <p className="
              text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] 
              xl:text-[19px] 2xl:text-[20px] 3xl:text-[22px]
              font-normal text-black leading-normal 
              w-full md:max-w-[600px]
            ">
              Over the last twenty-five years, LLA has become more than a
              photography school—it's a space that has shaped and been shaped
              by everyone who's walked through it. Here are words from those
              who've shared this journey with us.
            </p>
          </div>

          {/* RIGHT SECTION - CAROUSEL */}
          <div className="relative">
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              ref={emblaRef}
            >
              <div className="flex">

                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="
                      shrink-0 w-full bg-white
                      border border-[#E97451] 
                      p-5 sm:p-6 md:p-8 lg:p-10 xl:p-10
                      shadow-sm
                    "
                  >
                    <div className="flex flex-col gap-4 h-full text-center">
                      <Quote className="
                        text-[#E97451] 
                        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                        mx-auto
                      " />

                      <p className="
                        text-[15px] sm:text-[16px] md:text-[17px] 
                        lg:text-[18px] xl:text-[19px] 2xl:text-[20px] 
                        3xl:text-[22px]
                        font-normal text-black leading-relaxed italic
                      ">
                        "{testimonial.quote}"
                      </p>

                      <div className="mt-auto pt-4">
                        <p className="
                          text-lg sm:text-xl md:text-2xl 
                          text-[#E97451] font-semibold font-urbanist
                        ">
                          {testimonial.name}
                        </p>

                        <p className="
                          text-sm sm:text-base md:text-lg 
                          text-gray-600
                        ">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* CONTROLS */}
            <div className="flex gap-4 justify-center mt-6 md:mt-8">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`
                  p-2 sm:p-3 md:p-4 
                  hover:bg-[#E97451] hover:rounded-full 
                  hover:text-white transition-all duration-300
                  ${
                    !canScrollPrev
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                <ImageWidget src={ArrowLeftBlack} alt="Prev" />
              </button>

              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={`
                  p-2 sm:p-3 md:p-4
                  hover:bg-[#E97451] hover:rounded-full 
                  hover:text-white transition-all duration-300
                  ${
                    !canScrollNext
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                <ImageWidget src={ArrowRightBlack} alt="Next" />
              </button>
            </div>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default TestimonialSection;
