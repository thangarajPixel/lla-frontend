"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getLifePageData } from "@/app/api/server";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { ArrowDown } from "@/helpers/ImageHelper";
import LifeCard from "./utils/life-card";
import type { LifeSectionProps } from "./utils/life-lla";

const LifeLlaSection = ({ data }: LifeSectionProps) => {
  const LifeCardSkeleton = () => (
    <div className="w-full flex flex-col gap-3 bg-[#FFFFFF4D]">
      <Skeleton className="w-full h-[200px] md:h-[220px] lg:h-[230px]" />
    </div>
  );

  const [cards, setCards] = useState(data.Card || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const total = data?.pagination?.total;

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previousLength = useRef(cards.length);
  const skeletonIdRef = useRef(0);

  const skeletonKeys = useMemo(() => {
    if (loading) {
      skeletonIdRef.current += 1;
      const baseId = skeletonIdRef.current;
      return Array.from({ length: 8 }, () => {
        const uniqueId = `${baseId}-${Math.random().toString(36).substring(2, 9)}`;
        return `skeleton-${uniqueId}`;
      });
    }
    return [];
  }, [loading]);

  const loadMore = async () => {
    if (loading || cards.length >= total) return;

    // STEP 1: show skeleton first
    setLoading(true);

    await new Promise((res) => setTimeout(res, 500));

    const nextPage = page + 1;
    const params = { page: nextPage, per_page: 8 };
    const { data: res } = await getLifePageData(params);
    if (res?.Card) {
      setCards((prev) => [...prev, ...res.Card]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  useEffect(() => {
    const newItems = cardsRef.current.slice(previousLength.current);
    gsap.fromTo(
      newItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      },
    );

    previousLength.current = cards.length;
  }, [cards]);

  return (
    <section className="w-full bg-white h-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-2 2xl:py-7 3xl:py-20">
      <ContainerWidget>
        <ScrollWidget animation="fadeDown" delay={0.1}>
          <div className="flex flex-col justify-start md:justify-center items-start md:items-center text-left md:text-center gap-2 md:gap-5 lg:gap-3">
            <h3 className="text-[32px] md:text-[35px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] 3xl:text-[64px] font-regular text-black font-urbanist">
              {data.Title}
            </h3>
            <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[40px] font-regular font-mulish  text-black w-full md:max-w-[600px] 3xl:max-w-[976px] 3xl:leading-[48px]">
              {data.Heading}
              <span className="text-[#E97451] ml-2"> {data.SubHeading} </span>
            </p>
            <p className="text-[12px] lg:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[750px] 3xl:max-w-[976px]">
              {data.Description}
            </p>
          </div>
        </ScrollWidget>
        <div className="py-8 md:py-8 lg:py-12 xl:py-10 2xl:py-10 3xl:py-10">
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 1,
              400: 1,
              630: 2,
              660: 2,
              700: 2,
              768: 3,
              1024: 4,
            }}
          >
            <Masonry
              style={{
                gap: "20px",
              }}
            >
              {cards.map((card, index) => (
                <div
                  className="gap-30 max-w-[300px]"
                  key={card.id}
                  style={{ marginBottom: "8px" }}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                >
                  <ScrollWidget animation="fadeIn" delay={-0.1}>
                    <ParallaxWidget speed={-0.1}>
                      <LifeCard card={card} />
                    </ParallaxWidget>
                  </ScrollWidget>
                </div>
              ))}

              {loading &&
                skeletonKeys.map((key) => (
                  <div key={key}>
                    <LifeCardSkeleton />
                  </div>
                ))}
            </Masonry>
          </ResponsiveMasonry>

          {loading &&
            skeletonKeys.map((key) => (
              <div key={key}>
                <LifeCardSkeleton />
              </div>
            ))}

          {!loading && cards.length < total && (
            <ScrollWidget animation="fadeIn" delay={0.1}>
              <div className="flex justify-center items-center mt-6">
                <ButtonWidget
                  onClick={loadMore}
                  className="h-[50px] w-[172px]  font-mulish hover:bg-white font-bold bg-white border border-[#E97451] rounded-[60px] text-[#E97451] px-5 h-10 text-xs xl:text-[14px] 2xl:text-[14px] 3xl:text-[18px]"
                >
                  Load More
                  <ImageWidget
                    src={ArrowDown}
                    alt="Arrow Down"
                    height={24}
                    width={24}
                    className="object-cover"
                  />
                </ButtonWidget>
              </div>
            </ScrollWidget>
          )}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default LifeLlaSection;
