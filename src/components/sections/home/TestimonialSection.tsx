"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import { ArrowRightBlack, ArrowLeftBlack } from "@/helpers/ImageHelper";
import ScrollWidget from "@/components/widgets/ScrollWidget";

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
      quote:"For me, Light and Life is home. I always have a great time talking with Iqbal Sir, listening to his array of stories and enjoying his brilliant sense of humour.. I believe every student who goes out of LLA becomes an artist. Thank you LLA for bringing artists to this world"
    },
    {
      id: "testimonial-2",
      name: "Sarah Johnson",
      role: "Industry Professional",
      quote:"For me, Light and Life is home. I always have a great time talking with Iqbal Sir, listening to his array of stories and enjoying his brilliant sense of humour.. I believe every student who goes out of LLA becomes an artist. Thank you LLA for bringing artists to this world"
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
                    xl:py-28    
                    2xl:py-32   
                    3xl:py-40  
                  "
                >

      <ContainerWidget>
         <ScrollWidget animation="scale" delay={0.1}>
<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 
     gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 items-stretch">
         <div className="space-y-3.5 md:space-y-3 lg:space-y-5">
                         <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                        Testimonials
                      </h3>
            <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              25 Years,<br className="hidden sm:block" /> 
                <span className="text-[#E97451]">Countless Connections</span>
              </p>

                          <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[450px]">
             Over the last twenty-five years, LLA has become more than a photography school—it’s 
             a space that has shaped and been shaped by everyone who’s walked through it.
              Here are words from those who’ve shared this journey with us—friends, mentors,
               industry voices, and 
             visitors whose encounters with LLA have left a lasting impression.
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
                    className="shrink-0 w-full bg-white border border-[#E97451] p-3 sm:p-4 md:p-6 lg:p-6 xl:p-8 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 h-full w-full text-center"> 
                      <Quote
                        className="text-[#E97451] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto"
                      />
                       <p className=" text-center text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal  text-black leading-normal w-full md:max-w-[650px]">

                        {testimonial.quote}
                      </p>
          
                        <p
                          className="text-lg sm:text-xl md:text-2xl text-[#E97451] font-semibold font-urbanist"
                        >
                          {testimonial.name}
                        </p>

                        <p
                          className="text-sm sm:text-base md:text-lg text-gray-600"
                        >
                          {testimonial.role}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-center mt-3 md:mt-3">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`p-2 sm:p-3 md:p-4 hover:bg-[#E97451] hover:rounded-full hover:text-white transition-all duration-300 ${
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
                className={`p-2 sm:p-3 md:p-4 hover:bg-[#E97451] hover:rounded-full hover:text-white transition-all duration-300 ${
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
