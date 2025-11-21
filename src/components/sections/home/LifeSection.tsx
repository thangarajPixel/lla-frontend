"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url, parseHeading } from "@/helpers/ConstantHelper";
import { Life } from "@/helpers/ImageHelper";
import type { LifeCardProps, LifeSectionProps } from "./utils/home";


const LifeCard = ({ card }: LifeCardProps) => (
  <div className="bg-white/30 p-3 sm:p-4 lg:p-4 xl:p-5 3xl:p-6 hover:bg-white transition-all duration-300 cursor-pointer">
    <h4 className="text-base sm:text-lg md:text-xl lg:text-[18px] 2xl:text-[20px] 3xl:text-[24px] font-bold text-black font-urbanist leading-tight mb-2 lg:mb-3 3xl:mb-4">
      {card.Title}
    </h4>
    <div className="relative w-full aspect-4/3 overflow-hidden mb-2 lg:mb-3 3xl:mb-4">
      <ImageWidget
        src={getS3Url(card.Image?.[0]?.url) || Life}
        alt={card.Title}
        fill
        className="object-cover"
      />
    </div>
    <p className="text-sm sm:text-base lg:text-[15px] 2xl:text-[16px] 3xl:text-[18px] font-normal text-black leading-normal">
      {card.Description}
    </p>
  </div>
);

const LifeSection = ({ data }: LifeSectionProps) => {
  const headingParts = parseHeading(data.Heading);
  const lifeCardsData = data.Card || [];
  const lastCard =
    lifeCardsData.length > 0 ? lifeCardsData[lifeCardsData.length - 1] : null;
  const cardsWithoutLast = lifeCardsData.slice(0, -1);
  const midPoint = Math.ceil(cardsWithoutLast.length / 2);

  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
  return (
    
    <section
      className="w-full min-h-[1100px] md:min-h-[700px] lg:min-h-[900px] xl:min-h-[1000px] 2xl:min-h-[1100px] 3xl:min-h-[1200px] bg-cover  bg-no-repeat bg-position-[bottom_left_-200px] md:bg-center sm:bg-position-center md:bg-fixed relative bg-[#ECECEC] py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28"
      style={{ backgroundImage: `url(${Life.src})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#ECECEC] via-transparent to-transparent" />

      <div className="relative z-10">
        <ContainerWidget>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-10">
            <div className="w-full md:w-auto md:min-w-[350px] lg:min-w-[400px] xl:min-w-[450px] 2xl:min-w-[500px] 3xl:min-w-[550px]">
              <div className="flex flex-col gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-7 3xl:gap-8">
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                  {data.Title || "Life at LLA"}
                </h3>
                <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
                  {headingParts[0]}
                  {headingParts[1] && (
                    <>
                      <br />
                      <span className="text-[#E97451]">{headingParts[1]}</span>
                    </>
                  )}
                </p>
                <div className="self-start">
                  <OrangeButtonWidget content={data.Btn_txt || "View More"} />
                </div>
              </div>
              <div className="flex justify-end items-end mt-8 sm:mt-10 md:mt-12 lg:mt-12 xl:mt-14 2xl:mt-16 3xl:mt-20">
                <div className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[220px] lg:max-w-[230px] xl:max-w-[240px] 2xl:max-w-[240px] 3xl:max-w-[280px] hidden md:block">
                  <ScrollWidget
                    animation="fadeUp"
                    delay={0.1}
                    duration={1}
                    ease="power3.out"
                  >
                    {lastCard && <LifeCard card={lastCard} />}
                  </ScrollWidget>
                </div>
              </div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-7 3xl:gap-8">
              <div className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-7 3xl:space-y-8">
                {cardsWithoutLast.slice(0, midPoint).map((card) => (
                  <div
                    key={card.id}
                    className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[250px] 2xl:max-w-[260px] 3xl:max-w-[280px]"
                  >
                    <ScrollWidget
                      animation="fadeUp"
                      delay={0.1}
                      duration={1}
                      ease="power3.out"
                    >
                      <LifeCard card={card} />
                    </ScrollWidget>
                  </div>
                ))}
              </div>
              <div className="md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 3xl:mt-20 space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-7 3xl:space-y-8">
                {cardsWithoutLast.slice(midPoint).map((card) => (
                  <div
                    key={card.id}
                    className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[250px] 2xl:max-w-[260px] 3xl:max-w-[280px]"
                  >
                    <ScrollWidget
                      animation="fadeUp"
                      delay={0.1}
                      duration={1}
                      ease="power3.out"
                    >
                      <LifeCard card={card} />
                    </ScrollWidget>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContainerWidget>
        {/* Mobile: Horizontal Scroll - Below md breakpoint */}
        <div className="md:hidden w-full sm:mt-8 overflow-hidden">
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-4 sm:gap-4 touch-pan-x pl-4">
              {lifeCardsData.map((card) => (
                <div
                  key={card.id}
                  className="flex-[0_0_75vw] sm:flex-[0_0_70vw] max-w-[200px] sm:max-w-[220px] min-w-0"
                >
                  <LifeCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeSection;
