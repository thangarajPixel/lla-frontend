"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import {
  ArrowLeftBlack,
  ArrowRightBlack,
  ArrowRightWhite,
  FacebookBlack,
  InstagramBlack,
  LinkedInBlack,
  TwitterBlack,
  WhatsappBlack,
} from "@/helpers/ImageHelper";
import type { BlogDetailProps } from "./utils/blog-detail";

const _SOCIAL_LINKS = [
  {
    id: "linkedin",
    icon: LinkedInBlack,
    alt: "LinkedIn",
    getShareUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    icon: TwitterBlack,
    alt: "Twitter",
    getShareUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "instagram",
    icon: InstagramBlack,
    alt: "Instagram",
    getShareUrl: () => "https://www.instagram.com/lightandlifeacademy",
  },
  {
    id: "facebook",
    icon: FacebookBlack,
    alt: "Facebook",
    getShareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "whatsapp",
    icon: WhatsappBlack,
    alt: "whatsapp",
    getShareUrl: (url: string) =>
      `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetailSection = ({ data }: BlogDetailProps) => {
  const { card, latest } = data;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="w-full bg-white min-h-screen py-8 sm:py-10 md:py-12 lg:py-16 xl:py-10 2xl:py-14 3xl:py-18">
      <ContainerWidget>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 3xl:gap-38">
          <div className="flex-1 max-w-[850px] overflow-hidden">
            <ScrollWidget animation="fadeDown" delay={0.1}>
              <div className="flex flex-col">
                <p className="text-sm md:text-base text-gray-500 font-mulish mb-8">
                  {formatDate(card.CreatedDate)}
                </p>
                <p className="mb-1 text-[32px] sm:text-[34px] md:text-[34px] lg:text-[38px] xl:text-[34px] 2xl:text-[38px] 3xl:text-[48px] font-normal text-black font-urbanist leading-tight">
                  {card.Title}
                </p>
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                {card.Description && (
                  <HTMLWidget
                    content={card.Description}
                    className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-normal font-mulish"
                    tag="div"
                  />
                )}
                 {card.LongDescription && (
                                  <HTMLWidget
                                    content={card.LongDescription}
                                    className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-normal font-mulish"
                                    tag="div"
                                  />
                                )}
                {card.ViewCard?.map((viewCard) => (
                  <div key={viewCard.id} className="flex flex-col gap-4">
                    <h3 className="text-[24px] md:text-[26px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] 3xl:text-[32px] font-normal text-black font-urbanist">
                      {viewCard.Title}
                    </h3>
                    {viewCard.Description && (
                      <HTMLWidget
                        content={viewCard.Description}
                        className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[18px] text-black leading-normal font-mulish"
                        tag="div"
                      />
                    )}
                    {viewCard.Image?.[0]?.url && (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <ImageWidget
                          src={getS3Url(viewCard.Image[0].url)}
                          alt={viewCard.Title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-8 pt-8 border-t border-gray-600">
                  <h3 className="text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px] 3xl:text-[24px] font-normal text-[#082326] font-mulish mb-6">
                    Share with
                  </h3>
                  <div className="flex gap-8 items-center">
                    {_SOCIAL_LINKS.map((social) => {
                      const currentUrl =
                        typeof window !== "undefined"
                          ? window.location.href
                          : "";
                      const shareUrl =
                        social.id === "twitter"
                          ? social.getShareUrl(currentUrl, card.Title)
                          : social.getShareUrl(currentUrl, card.Title);

                      return (
                        <a
                          key={social.id}
                          href={shareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-70 "
                        >
                          <ImageWidget
                            src={social.icon.src}
                            alt={social.alt}
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollWidget>
          </div>
          <aside className="w-full lg:w-[260px] xl:w-[260px] 2xl:w-[280px] 3xl:w-[300px]">
            <ScrollWidget animation="fadeIn" delay={0.2}>
              <div className="lg:sticky lg:top-8">
                <h3 className="text-[32px] ledding-[40px] font-normal text-black font-urbanist mb-3">
                  Latest Blogs
                </h3>
                <div className="hidden md:flex flex-col gap-4">
                  {latest.map((post) => (
                    <div key={post.id} className="group">
                      <div className="flex flex-col gap-2">
                        {(post.ImageUrl || post.Image?.[0]?.url) && (
                          <div className="relative w-full aspect-video overflow-hidden">
                            <ImageWidget
                              src={
                                post.ImageUrl?.trim() ||
                                getS3Url(post.Image?.[0]?.url || "")
                              }
                              alt={post.Title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h4 className="text-[16px] font-semibold text-black font-mulish">
                          {post.Title}
                        </h4>
                        <Link
                          href={`/more/blogs/${post.Slug}`}
                          className="inline-flex items-center gap-2 text-[#E97451] hover:gap-4 transition-all duration-300 mt-2 text-[16px] md:text-[16px] lg:text-[16px] font-normal font-urbanist group"
                        >
                          Read More
                          <ImageWidget
                            src={ArrowRightWhite}
                            alt="Arrow Right"
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="md:hidden relative">
                  <div
                    ref={scrollContainerRef}
                    onScroll={checkScrollButtons}
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {latest.map((post) => (
                      <div
                        key={post.id}
                        className="shrink-0 w-[85%] snap-start"
                      >
                        <div className="flex flex-col gap-2">
                          {post.Image?.[0]?.url && (
                            <div className="relative w-full aspect-video overflow-hidden">
                              <ImageWidget
                                src={getS3Url(post.Image[0].url)}
                                alt={post.Title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h4 className="text-[16px] font-semibold text-black font-mulish">
                            {post.Title}
                          </h4>
                          <Link
                            href={`/more/blogs/${post.Slug}`}
                            className="inline-flex items-center gap-2 text-[#E97451] hover:gap-4 transition-all duration-300 mt-2 text-[16px] font-normal font-urbanist group"
                          >
                            Read More
                            <ImageWidget
                              src={ArrowRightWhite}
                              alt="Arrow Right"
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6 justify-start">
                    <button
                      type="button"
                      onClick={() => scroll("left")}
                      disabled={!canScrollLeft}
                      className={`transition-opacity ${
                        canScrollLeft
                          ? "opacity-100 hover:opacity-70"
                          : "opacity-30 cursor-not-allowed"
                      }`}
                      aria-label="Previous slide"
                    >
                      <ImageWidget
                        src={ArrowLeftBlack}
                        alt="Previous"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => scroll("right")}
                      disabled={!canScrollRight}
                      className={`transition-opacity ${
                        canScrollRight
                          ? "opacity-100 hover:opacity-70"
                          : "opacity-30 cursor-not-allowed"
                      }`}
                      aria-label="Next slide"
                    >
                      <ImageWidget
                        src={ArrowRightBlack}
                        alt="Next"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollWidget>
          </aside>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default BlogDetailSection;
