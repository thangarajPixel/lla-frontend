"use client";

import { useRef, useState, useEffect } from "react";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { ArrowDown, Dummy5 } from "@/helpers/ImageHelper";
import LifeCard from "./ui/life-card";
import gsap from "gsap";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import { Skeleton } from "@/components/ui/skeleton";


const ListSection = () => {
  const listItems = [
    { id: 1, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 2, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 3, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 4, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 5, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 6, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 7, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 8, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 9, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 10, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 11, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
    { id: 12, title: "The 25th Year Begins", Description: "The 25th Year Begins", image: Dummy5 },
  ];
 const LifeCardSkeleton = () => (
  <div className="w-full flex flex-col gap-3  bg-[#FFFFFF4D]">
    <Skeleton className="w-full h-[200px] md:h-[220px] lg:h-[230px]" />
  </div>
);

  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [prevCount, setPrevCount] = useState(0);
const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const loadMore = () => {
    setLoading(true);
  setPrevCount(visibleCount); 
 setTimeout(() => {
    setVisibleCount(prev => prev + 6);
    setLoading(false);
  }, 700); //
};
  useEffect(() => {
   const newCards = cardsRef.current.slice(prevCount, visibleCount);
    gsap.fromTo(
      newCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
  }, [visibleCount]);
 return (
  <section className="w-full bg-white h-full py-4 sm:py-6 md:py-8 lg:py-10 xl:py-5 2xl:py-7 3xl:py-10">
    <ContainerWidget>
      <ScrollWidget animation="fadeDown" delay={0.1}>
        <div className="space-y-3.5 md:space-y-3 lg:space-y-5 text-left md:text-center lg:text-center xl:text-center">
          <h3 className="text-[30px] md:text-[35px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] 3xl:text-[64px] font-regular text-black font-urbanist">
            Life @ LLA
          </h3>
          <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[40px] font-regular font-mulish px-3 sm:px-30 md:px-35 lg:px-38 xl:px-40 2xl:px-40 3xl:px-40 text-black">
            Lorem ipsum dolor sit amet, consectetur
            <span className="text-[#E97451]">
              {" "}
              adipiscing elit, sed do eiusmod tempor
            </span>
          </p>
          <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[16px] 3xl:text-[18px] font-regular text-black font-mulish px-3 sm:px-30 md:px-35 lg:px-35 xl:px-35 2xl:px-40 3xl:px-40">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </ScrollWidget>
      <div className="py-8 pb-9 sm sm:py-8 md:py-8 lg:py-12 xl:py-10 2xl:py-16 3xl:py-20 4xl:py-15">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-4 gap-4 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 2xl:gap-5 3xl:gap-6 4xl:gap-7">
          {listItems.slice(0, visibleCount + (loading ? 6 : 0)).map((card, index) => {
                    const isSkeleton =
                      loading && index >= visibleCount && index < visibleCount + 6;

                    if (isSkeleton) {
                      return <LifeCardSkeleton key={`skeleton-${index}`} />;
                    }
                    return (
                      <div  key={card.id}
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
                    );
                  })}

        </div>
        {visibleCount < listItems.length && (
          <ScrollWidget  animation="fadeUp" delay={0.1}>
          <div className="flex justify-center items-center mt-6">
             <ParallaxWidget speed={0.1}>
            <ButtonWidget onClick={loadMore}
              className="font-mulish hover:bg-white  font-bold  bg-white border border-[#E97451] rounded-[60px] text-[#E97451] px-5 h-10 text-xs xl:text-[14px] 2xl:text-[14px] 3xl:text-[18px]">
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
