"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Life, LifeMobile } from "@/helpers/ImageHelper";
import type { LifeCardProps, LifeSectionProps } from "./utils/home";

const LifeCard = ({ card }: LifeCardProps) => (
  <LinkWidget href={`/more/life-at-lla/${card.Slug}`}>
    <div className="bg-white/30 p-5 sm:p-4 lg:p-4 xl:p-5 3xl:p-6 hover:bg-white transition-all duration-300 cursor-pointer 3xl:w-[300px] 3xl:min-w-[300px] 3xl:max-w-[300px]">
      <h4 className="text-base xss:text-[24px] sm:text-lg md:text-xl lg:text-[18px] 2xl:text-[18px] 3xl:text-[24px] font-bold text-black font-mulish leading-tight mb-2 lg:mb-3 3xl:mb-4 line-clamp-2">
        {card.Title}
      </h4>
      <div className="relative w-full aspect-4/3 overflow-hidden mb-2 lg:mb-3 3xl:mb-1">
        <ImageWidget
          src={getS3Url(card.Image?.[0]?.url) || ""}
          alt={card.Title}
          fill
          className="object-cover 3xl:max-w-[252px] 3xl:max-h-[168.79px]"
        />
      </div>
      <ParagraphWidget className="line-clamp-2">
        {card.Description}
      </ParagraphWidget>
    </div>
  </LinkWidget>
);

const LifeSection = ({ data }: LifeSectionProps) => {
  const lifeCardsData = data.Card;
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
        delay: 122000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  if (data?.Card?.length === 0) return null;
  return (
    <section className="w-full min-h-[1100px] md:min-h-[700px] lg:min-h-[900px] xl:min-h-[1000px] 2xl:min-h-[1100px] 3xl:min-h-[1446px] bg-cover  bg-no-repeat bg-position-[bottom_left_-200px] md:bg-center sm:bg-position-center md:bg-fixed relative bg-[#ECECEC] py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat sm:bg-position-center md:hidden"
        style={{ backgroundImage: `url(${LifeMobile.src})` }}
      />
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed"
        style={{ backgroundImage: `url(${Life.src})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #ECECEC 0%, #ECECEC 25%, rgba(236, 236, 236, 0.6) 45%, rgba(236, 236, 236, 0.3) 65%, rgba(236, 236, 236, 0.1) 80%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        <ContainerWidget>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-10">
            <div className="w-full md:w-auto md:min-w-[350px] lg:min-w-[400px] 2xl:min-w-[500px] 3xl:min-w-[550px]">
              <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-4 2xl:gap-6 3xl:gap-8">
                <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                  {data.Title}
                </h3>
                <HTMLWidget
                  content={data.Heading}
                  className="3xl:max-w-[520px]  font-area-variable font-semibold text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black"
                  tag="p"
                />
                <ParagraphWidget className="w-full md:max-w-[650px]">
                  {data.Description}
                </ParagraphWidget>
                <div className="self-start">
                  <LinkWidget href="/more/life-at-lla">
                    <OrangeButtonWidget content={data.Btn_txt} />
                  </LinkWidget>
                </div>
              </div>
              <div className="flex justify-end items-end mt-8 sm:mt-10 md:mt-12 lg:mt-12 xl:mt-14 2xl:mt-16 3xl:mt-20 relative left-1.5 3xl:left-[-45px]">
                <div className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[210px] 2xl:max-w-[220px] 3xl:w-[300px] hidden md:block">
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
            <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-7 3xl:gap-8 ml-auto">
              <div className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-7 3xl:space-y-8">
                {cardsWithoutLast.slice(0, midPoint).map((card) => (
                  <div
                    key={card.id}
                    className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[250px] 2xl:max-w-[260px] 3xl:w-[300px] ml-auto 3xl:ml-[-40px]"
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
                    className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[250px] 2xl:max-w-[260px] 3xl:w-[300px] ml-auto"
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
                  className="flex-[0_0_75vw] sm:flex-[0_0_70vw] max-w-[200px] sm:max-w-[220px] min-w-0 3xl:w-[300px]! 3xl:max-w-[300px]!"
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
