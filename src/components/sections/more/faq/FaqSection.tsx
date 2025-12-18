"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import type { FaqProps } from "./utils/faq";

const FaqSection = ({ data }: FaqProps) => {
  const [activeCategory, setActiveCategory] = useState<number>(
    data?.faq?.[0]?.id || 1,
  );
  const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.getAttribute("data-category");
            if (categoryId) {
              setActiveCategory(Number(categoryId));
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      },
    );
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToCategory = (categoryId: number) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!data || !data.faq || data.faq.length === 0) {
    return (
      <section className="relative w-full bg-white py-10 md:py-15">
        <ContainerWidget>
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="font-urbanist font-normal text-[32px] md:text-[40px] xl:text-[48px] 2xl:text-[56px] 3xl:text-[64px] text-black mb-12">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg">
              No FAQ data available at the moment.
            </p>
          </div>
        </ContainerWidget>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white py-10 md:py-15">
      <ContainerWidget>
        <div className="max-w-6xl">
          <h1 className="font-urbanist font-normal text-[32px] md:text-[32px]  xl:text-[48px] 2xl:text-[56px] 3xl:text-[64px] text-black mb-6 md:mb-12 text-left">
            {data.Title || "Frequently Asked Questions"}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-14">
            <div className="hidden md:block lg:col-span-1 shadow-xl ">
              <nav className="space-y-1 lg:sticky lg:top-30">
                {data.faq.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => scrollToCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer text-[16px] md:text-[15px] xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] relative ${
                      activeCategory === category.id
                        ? "text-[#E97451] font-semibold"
                        : "text-black hover:text-[#E97451] hover:bg-gray-50 font-normal"
                    }`}
                  >
                    {category.Title}
                  </button>
                ))}
              </nav>
            </div>
            <div className="lg:col-span-3">
              {data.faq.map((category) => (
                <div
                  key={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el;
                    if (el && observerRef.current) {
                      observerRef.current.observe(el);
                    }
                  }}
                  data-category={category.id}
                  className="scroll-mt-24"
                >
                  <div className="bg-white p-0 md:pb-6">
                    <h2
                      className={`text-[24px] md:text-3xl font-semibold mb-3 md:mb-6 transition-colors duration-300 ${
                        activeCategory === category.id
                          ? "text-[#E97451]"
                          : "text-black"
                      }`}
                    >
                      {category.Title}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.Qa.map((item, index) => (
                        <AccordionItem
                          key={`question-${index + 1}`}
                          value={`${category.id}-item-${index}`}
                          className="bg-white border-none"
                        >
                          <AccordionTrigger className="py-3 text-left hover:no-underline cursor-pointer">
                            <span className="text-[16px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] font-mulish font-regular text-black">
                              {item.Question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <HTMLWidget
                              content={item.Answer}
                              className="text-[16px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[15px] 2xl:text-[15px] 3xl:text-[16px] font-mulish font-regular text-black"
                              tag="p"
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FaqSection;
