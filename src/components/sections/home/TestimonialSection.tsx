"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { ArrowLeftBlack, ArrowRightBlack, Quote } from "@/helpers/ImageHelper";

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
      name: "Nachiket Pimprikar,",
      role: "Alumni, Batch '15",
      quote:
        "For me, Light and Life is home. I always have a great time talking with Iqbal Sir, listening to his array of stories and enjoying his brilliant sense of humour.. I believe every student who goes out of LLA becomes an artist. Thank you LLA for bringing artists to this world",
    },
    {
      id: "testimonial-2",
      name: "Nachiket Pimprikar,",
      role: "Industry Professional",
      quote:
        "For me, Light and Life is home. I always have a great time talking with Iqbal Sir, listening to his array of stories and enjoying his brilliant sense of humour.. I believe every student who goes out of LLA becomes an artist. Thank you LLA for bringing artists to this world",
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
    <section
      className="
                    w-full bg-[#ECECEC] flex flex-col z-40 relative
                    py-10       
                    sm:py-14    
                    md:py-18     
                    lg:py-20     
                    xl:py-20    
                    2xl:py-28   
                    3xl:py-20  
                  "
    >
      <ContainerWidget>
        <ScrollWidget animation="scale" delay={0.1}>
          <div
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 
     gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 items-stretch"
          >
            <div className="space-y-3.5 md:space-y-3 lg:space-y-5">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                Testimonials
              </h3>
              <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
                25 Years,
                <br className="hidden sm:block" />
                <span className="text-[#E97451]">Countless Connections</span>
              </p>

              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[450px]">
                Over the last twenty-five years, LLA has become more than a
                photography school—it’s a space that has shaped and been shaped
                by everyone who’s walked through it. Here are words from those
                who’ve shared this journey with us—friends, mentors, industry
                voices, and visitors whose encounters with LLA have left a
                lasting impression.
              </p>
            </div>
            <div className="relative h-full flex flex-col">
              <div
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                ref={emblaRef}
              >
                <div className="flex w-full">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="shrink-0 w-full bg-white border border-[#E97451] p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4"
                    >
                      <div className="flex flex-col gap-2  md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 3xl:gap-6 h-full w-full text-center">
                        <div className="flex items-center justify-center">
                          <ImageWidget
                            src={Quote}
                            alt="Quote"
                            className="object-center"
                          />
                        </div>
                        <p className=" text-center text-[16px] lg:text-[15px] xl:text-[17px] 3xl:text-[18px] font-normal font-mulish  text-black leading-normal w-full md:max-w-[750px]">
                          {testimonial.quote}
                        </p>

                        <p
                          className="text-lg sm:text-xl md:text-2xl lg:text-[24px] 
                          text-[#E97451] font-regular font-mulish"
                        >
                          {testimonial.name}
                        </p>

                        <p className="mb-3 text-sm sm:text-base md:text-[16px] text-black font-regular font-mulish">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-3 md:mt-5">
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
                  <ImageWidget src={ArrowLeftBlack} alt="Prev" />
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
                  <ImageWidget src={ArrowRightBlack} alt="Next" />
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
