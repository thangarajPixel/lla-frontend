"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { Dummy11 } from "@/helpers/ImageHelper";

const FacultySection = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: false,
    },
    [
      Autoplay({
        delay: 1000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const mobileFacultyIds = [
    "faculty-mobile-0",
    "faculty-mobile-1",
    "faculty-mobile-2",
    "faculty-mobile-3",
    "faculty-mobile-4",
    "faculty-mobile-5",
  ];

  const desktopFacultyData = [
    { id: "faculty-desktop-0", index: 0 },
    { id: "faculty-desktop-1", index: 1 },
    { id: "faculty-desktop-2", index: 2 },
    { id: "faculty-desktop-3", index: 3 },
    { id: "faculty-desktop-4", index: 4 },
    { id: "faculty-desktop-5", index: 5 },
    { id: "faculty-desktop-6", index: 6 },
    { id: "faculty-desktop-7", index: 7 },
    { id: "faculty-desktop-8", index: 8 },
    { id: "faculty-desktop-9", index: 9 },
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white mx-auto max-w-[1920px]">
      <ContainerWidget>
        <div className="flex flex-col justify-start md:justify-center items-start md:items-center text-left md:text-center gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
            Faculty
          </h2>
          <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
            Rooted in the spirit of a <br />
            <span className="text-[#E97451]">Modern-Day Gurukul</span>
          </p>
          <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
            Our faculty foster an environment of collaboration and mentorship.
            The guidance is personal,
            <br className="hidden sm:block" /> conversations are open, and
            growth happens through shared experience.
          </p>
          <OrangeButtonWidget content="Know Your Guides" />
        </div>
      </ContainerWidget>
      <div className="pt-8 relative">
        <div className="px-4 sm:px-6 md:hidden">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            {mobileFacultyIds.map((key) => (
              <div key={key} className="flex flex-col gap-2 sm:gap-3">
                <div className="w-full aspect-square sm:aspect-auto overflow-hidden">
                  <ImageWidget src={Dummy11} alt="Faculty" />
                </div>
                <h3 className="font-mulish text-lg sm:text-xl font-bold text-black font-urbanist leading-tight">
                  Akshay Sharma
                </h3>
                <p className="text-sm sm:text-base font-normal text-black leading-relaxed line-clamp-2 overflow-hidden text-ellipsis">
                  Mihir Hardikar is a Food and Beverage photographer based in
                  Mumbai. Mihir has worked with national and international
                  brands such as Domino's Pizza, Cure.Fit, Mother Dairy, Nestle
                  Bangladesh, Haldirams.
                </p>
                <div className="self-start mt-auto">
                  <OrangeButtonWidget content="Know More" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {desktopFacultyData.map(({ id, index: i }) => (
                <div
                  key={id}
                  className={`shrink-0 ${
                    i % 2 ? "mt-30" : "mt-0"
                  } w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)] xl:w-[calc((100%-6rem)/5)] 2xl:w-[calc((100%-7.5rem)/6)]`}
                >
                  <div className="group relative flex flex-col gap-3 overflow-hidden transition-all duration-500 ease-in-out delay-75 hover:bg-[#E97451]/20 p-3.5 cursor-pointer">
                    <div className="transition-transform duration-500 ease-in-out delay-100 group-hover:scale-[1.02]">
                      <ImageWidget src={Dummy11} alt="Faculty" />
                    </div>
                    <h3 className="font-mulish text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight transition-colors duration-500 ease-in-out delay-150">
                      Akshay Sharma
                    </h3>
                    <div className="opacity-0 transition-all duration-500 ease-in-out delay-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                      <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
                        Mihir Hardikar is a Food and Beverage photographer based
                        in Mumbai. Mihir has worked with national and
                        international brands such as Domino's Pizza, Cure.Fit,
                        Mother Dairy, Nestle Bangladesh, Haldirams.
                      </p>
                      <div className="self-start mt-3">
                        <OrangeButtonWidget content="Know More" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
