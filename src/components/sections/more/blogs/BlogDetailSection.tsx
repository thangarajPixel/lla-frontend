"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return "";

  // Handle different YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return url;
};

const ImageSlider = ({
  images,
  title,
}: {
  images: Array<{ id: number; name: string; url: string }>;
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && images.length > 1) {
      autoPlayRef.current = setInterval(nextSlide, 4000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, images.length, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (images.length === 0) return null;

  return (
    <div
      aria-hidden
      className="relative w-full aspect-video overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        <ImageWidget
          src={getS3Url(images[currentIndex].url)}
          alt={title || images[currentIndex].name}
          fill
          className="object-cover transition-opacity duration-500"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ImageWidget
              src={ArrowLeftBlack}
              alt="Previous"
              width={20}
              height={20}
              className="object-contain filter invert cursor-pointer"
            />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <ImageWidget
              src={ArrowRightBlack}
              alt="Next"
              width={20}
              height={20}
              className="object-contain filter invert cursor-pointer"
            />
          </button>
        </>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={`slide-${index + 1}`}
              type="button"
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

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
                {/* <p className="text-sm md:text-base text-gray-500 font-mulish mb-8">
                  {formatDate(card.CreatedDate)}
                </p> */}
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
                    {viewCard.Type === "Slide" &&
                      viewCard.Image &&
                      viewCard.Image.length > 0 && (
                        <ImageSlider
                          images={viewCard.Image}
                          title={viewCard.Title}
                        />
                      )}
                    {viewCard.Type === "Video" && viewCard.Url && (
                      <div className="relative w-full aspect-video overflow-hidden bg-black">
                        <iframe
                          src={getYouTubeEmbedUrl(viewCard.Url)}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          title={viewCard.Title || "Video"}
                          loading="lazy"
                        />
                      </div>
                    )}
                    {viewCard.Type !== "Slide" &&
                      viewCard.Type !== "Video" &&
                      viewCard.Image?.[0]?.url && (
                        <div className="relative w-full overflow-hidden">
                          <ImageWidget
                            src={getS3Url(viewCard.Image[0].url)}
                            alt={viewCard.Title}
                            width={850}
                            height={600}
                            className="w-full h-auto object-contain"
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
                        {(post.Image?.[0]?.url) && (
                          <div className="relative w-full aspect-video overflow-hidden">
                            <ImageWidget
                              src={
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
                          href={`/blogs/${post.Slug}`}
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
                            href={`/blogs/${post.Slug}`}
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
                      className={`transition-opacity ${canScrollLeft
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
                      className={`transition-opacity ${canScrollRight
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
