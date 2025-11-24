"use client";

import { useRef, useState, useEffect } from "react";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { ArrowDown } from "@/helpers/ImageHelper";
import LifeCard from "./ui/life-card";
import gsap from "gsap";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { LifeSectionProps } from "./utils/life-lla";
import { getLifePageData } from "@/app/api/server";
import { useRouter, useSearchParams } from "next/navigation";

const ListSection = ({ data }: LifeSectionProps) => {
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
    const router = useRouter();
   const searchParams = useSearchParams();

  const loadMore = async () => {
    if (loading || cards.length >= total) return;

    setLoading(true);

    const nextPage = page + 1;
    const res = await getLifePageData(nextPage, 8);

    if (res?.Card) {
      setCards(prev => [...prev, ...res.Card]);
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
      }
    );

    previousLength.current = cards.length;
  }, [cards]);

  return (
    <section className="w-full bg-white h-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-5 2xl:py-7 3xl:py-10">
      <ContainerWidget>
        <ScrollWidget animation="fadeDown" delay={0.1}>
          <div className="space-y-3.5 md:space-y-3 lg:space-y-5 text-left md:text-center">
            <h3 className="text-[30px] md:text-[35px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] 3xl:text-[64px] font-regular text-black font-urbanist">
              {data.Title}
            </h3>
           <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[40px] font-regular font-mulish px-3 sm:px-30 md:px-35 lg:px-38 xl:px-40 2xl:px-40 3xl:px-40 text-black"> {data.Heading} <span className="text-[#E97451]"> {" "} {data.SubHeading} </span> </p>
            <p className="text-[12px] md:text-[14px] 2xl:text-[16px] 3xl:text-[18px] font-mulish text-black px-3">
              {data.Description}
            </p>
          </div>
        </ScrollWidget>

        <div className="py-8 md:py-8 lg:py-12 xl:py-10 2xl:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 2xl:gap-6">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el: HTMLDivElement | null) => {
                          cardsRef.current[index] = el;
                        }}
              >
                <ScrollWidget animation="fadeUp" delay={0.1}>
                  <ParallaxWidget speed={-0.1}>
                    <LifeCard card={card} />
                  </ParallaxWidget>
                </ScrollWidget>
              </div>
            ))}

            {loading &&
              [...Array(8)].map((_, i) => <LifeCardSkeleton key={`sk-${i}`} />)}
          </div>

          {!loading && cards.length < total && (
            <ScrollWidget animation="fadeUp" delay={0.1}>
              <div className="flex justify-center items-center mt-6">
                <ParallaxWidget speed={0.1}>
                  <ButtonWidget
                    onClick={loadMore}
                    className="font-mulish hover:bg-white font-bold bg-white border border-[#E97451] rounded-[60px] text-[#E97451] px-5 h-10 text-xs xl:text-[14px] 2xl:text-[14px] 3xl:text-[18px]"
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
                </ParallaxWidget>
              </div>
            </ScrollWidget>
          )}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default ListSection;
