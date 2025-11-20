"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";

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

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

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
    <section className="w-full bg-[#ECECEC] flex flex-col z-40 relative py-10 md:py-30">
      <ContainerWidget>
        <div className="flex flex-row ">
          <div>
            <div className="space-y-2 md:space-y-3 lg:space-y-5">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                Testimonials
              </h3>
              <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
                25 Years,
                <span className="text-[#E97451] ml-2">
                  Countless
                  <br className="hidden sm:block" /> Connections
                </span>
              </p>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                Over the last twenty-five years, LLA has become more than a
                photography school—it's a space that has shaped and been shaped
                by everyone who's walked through it. Here are words from those
                who've shared this journey with us—friends, mentors, industry
                voices, and visitors whose encounters with LLA have left a
                lasting impression.
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-12">
            <div className="relative">
              <div
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                ref={emblaRef}
              >
                <div className="flex">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="shrink-0 w-full bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-sm"
                    >
                      <div className="flex flex-col gap-4 h-full">
                        <p className="text-[16px] lg:text-[18px] 3xl:text-[20px] font-normal text-black leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          <p className="text-lg md:text-xl font-semibold text-black font-urbanist">
                            {testimonial.name}
                          </p>
                          <p className="text-sm md:text-base text-gray-600">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 justify-center mt-6 md:mt-8">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className={`p-3 rounded-full bg-white hover:bg-[#E97451] hover:text-white transition-all duration-300 shadow-md ${
                    !canScrollPrev
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className={`p-3 rounded-full bg-white hover:bg-[#E97451] hover:text-white transition-all duration-300 shadow-md ${
                    !canScrollNext
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default TestimonialSection;
