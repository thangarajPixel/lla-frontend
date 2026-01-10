"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { StaticImageData } from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getGalleryPageData } from "@/app/api/server";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LightboxWidget from "@/components/widgets/LightboxWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowDown, Dummy3, Into, Play } from "@/helpers/ImageHelper";
import type { GalleryData } from "./utils/gallery";

// Define types for gallery items
type GalleryItem = {
  id: string;
  imageId: string | number;
  cardId: number;
  src: string | StaticImageData;
  alt: string;
  type: string;
  isVideo: boolean;
  videoLinkUrl: string | null;
  videoUrl: string | null;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const convertToEmbedUrl = (url: string): string => {
  if (!url) return url;

  // YouTube URL patterns
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(youtubeRegex);

  const videoId = match?.[1];

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`;
  }

  // Return original URL for other video platforms or already embedded URLs
  return url;
};

const getYouTubeThumbnail = (url: string): string => {
  if (!url) return "";

  // YouTube URL patterns
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(youtubeRegex);

  const videoId = match?.[1];

  if (videoId) {
    // Use high quality thumbnail (maxresdefault), with fallback to medium quality
    // Note: maxresdefault might not be available for all videos, but we'll try it first
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  // Return empty string for non-YouTube URLs
  return "";
};

// Alternative function to get medium quality thumbnail as fallback
const getYouTubeThumbnailMedium = (url: string): string => {
  if (!url) return "";

  const youtubeRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(youtubeRegex);

  const videoId = match?.[1];

  if (videoId) {
    // Use medium quality thumbnail (more reliable)
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return "";
};

const GallerySection = ({ data: initialData }: { data: GalleryData }) => {
  const uniqueTypesInitial = useMemo(() => {
    if (!initialData?.ImageCard) return [];
    return Array.from(new Set(initialData.ImageCard.map((card) => card.Type)));
  }, [initialData?.ImageCard]);

  const shuffleArray = useCallback(<T,>(array: T[]) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, []);

  const [selectedType, setSelectedType] = useState<string>(
    uniqueTypesInitial.length > 0 ? uniqueTypesInitial[0] : "",
  );
  const [imageCards, setImageCards] = useState(initialData.ImageCard || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData>(initialData);
  const [isMounted, setIsMounted] = useState(false);

  const total =
    galleryData?.pagination?.total || initialData?.pagination?.total || 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const uniqueTypes = useMemo(() => {
    if (!initialData?.ImageCard) return [];
    const types = Array.from(
      new Set(initialData.ImageCard.map((card) => card.Type)),
    );
    return types;
  }, [initialData?.ImageCard]);

  const filteredImageCards = useMemo(
    () => imageCards.filter((card) => card.Type === selectedType),
    [imageCards, selectedType],
  );

  const allImages: GalleryItem[] = useMemo(() => {
    if (!isMounted) return [];

    const images: GalleryItem[] = filteredImageCards.flatMap((card, cardIndex) => {
      // Handle video cards with VideoUrl but no Image
      if (card.Type === "Video" && (card.VideoUrl) && (!card.Image || card.Image === null)) {
        // Get YouTube thumbnail - try high quality first, then medium quality, then placeholder
        const youTubeThumbnailHQ = getYouTubeThumbnail(card.VideoUrl);
        const youTubeThumbnailMQ = getYouTubeThumbnailMedium(card.VideoUrl);
        const thumbnailSrc = youTubeThumbnailHQ || youTubeThumbnailMQ || Dummy3;
        
        console.log(`Video ${card.id} thumbnail:`, {
          videoUrl: card.VideoUrl,
          thumbnailHQ: youTubeThumbnailHQ,
          thumbnailMQ: youTubeThumbnailMQ,
          finalSrc: thumbnailSrc
        });
        
        return [{
          id: `gallery-${card.id}-video-${cardIndex}`,
          imageId: `video-${card.id}`,
          cardId: card.id,
          src: thumbnailSrc,
          alt: `Video ${card.id}`,
          type: card.Type,
          isVideo: true,
          videoLinkUrl: card.VideoUrl || null,
          videoUrl: null,
        }];
      }

      const images = Array.isArray(card.Image)
        ? card.Image
        : card.Image
          ? [card.Image]
          : [];

      // Log cards with no valid images
      if (
        images.length === 0 ||
        !images.some((img) => img && (img.url || img.id))
      ) {
        console.log(`Card ${card.id} has no valid images:`, card);
        return []; // Return empty array instead of undefined
      }

      // Filter out invalid images and map to gallery items
      return images
        .filter((img) => img && (img.url || img.id)) // Only include images with url or id
        .map((img, imgIndex): GalleryItem => {
          const isVideo = card.Type === "Video";
          const src = img.url ? getS3Url(img.url) : Dummy3;
          const isVideoFile =
            isVideo &&
            img.url &&
            /\.(mp4|mov|avi|webm|mkv|m4v)$/i.test(img.url);
          const videoUrl = isVideoFile ? getS3Url(img.url) : null;
          
          // Handle VideoUrl from card
          const videoLinkUrl = card.VideoUrl || null;
          
          return {
            id: `gallery-${card.id}-${img.id}-${cardIndex}-${imgIndex}`,
            imageId: img.id,
            cardId: card.id,
            src,
            alt: img.name || "Gallery image",
            type: card.Type,
            isVideo,
            videoLinkUrl,
            videoUrl: typeof videoUrl === "string" ? videoUrl : null,
          };
        });
    });

    console.log(
      `Cards: ${filteredImageCards.length}, Images: ${images.length}`,
    );
    return shuffleArray(images);
  }, [filteredImageCards, isMounted, shuffleArray]);

  const lightboxImages = useMemo(() => {
    return allImages
      .filter((item) => !item.isVideo)
      .map((item) => ({
        src: item.src,
        alt: item.alt,
      }));
  }, [allImages]);

  const imageToLightboxIndex = useMemo(() => {
    const map = new Map<string, number>();
    let lightboxIndex = 0;
    allImages.forEach((item) => {
      if (!item.isVideo) {
        map.set(item.id, lightboxIndex);
        lightboxIndex += 1;
      }
    });
    return map;
  }, [allImages]);

  useEffect(() => {
    if (!selectedType) return;

    setPage(1);
    setImageCards([]);

    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          per_page: 30,
          type: selectedType,
        };

        const { data: res } = await getGalleryPageData(params);
        if (res?.ImageCard) {
          setImageCards(res.ImageCard);
          setGalleryData(res);
        }
      } catch (error) {
        console.error("Error fetching filtered gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      fetchFilteredData();
    }
  }, [selectedType, isMounted]);
  const loadMore = async () => {
    if (loading || loadingMore || imageCards.length >= total || !selectedType)
      return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const params: { page: number; per_page: number; type: string } = {
        page: nextPage,
        per_page: 30,
        type: selectedType,
      };
      const { data: res } = await getGalleryPageData(params);
      if (res?.ImageCard) {
        setImageCards((prev) => [...prev, ...res.ImageCard]);
        setGalleryData(res);
        setPage(nextPage);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  // Refresh ScrollTrigger when new images are loaded
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;

    const refreshScrollTrigger = () => {
      // Multiple refresh calls to ensure it works after DOM updates
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
            try {
              ScrollTrigger.refresh();
            } catch (error) {
              console.error("Error refreshing ScrollTrigger:", error);
            }
          }
        }, 100);
        setTimeout(() => {
          if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
            try {
              ScrollTrigger.refresh();
            } catch (error) {
              console.error("Error refreshing ScrollTrigger:", error);
            }
          }
        }, 300);
        setTimeout(() => {
          if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
            try {
              ScrollTrigger.refresh();
            } catch (error) {
              console.error("Error refreshing ScrollTrigger:", error);
            }
          }
        }, 500);
      });
    };

    if (allImages.length > 0) {
      refreshScrollTrigger();
    }
  }, [allImages.length, isMounted]);

  const renderGalleryItem = (
    item: GalleryItem,
    _index: number,
    openLightbox?: (index: number) => void,
  ) => {
    const lightboxIndex = imageToLightboxIndex.get(item.id);

    return (
      <div
        key={item.id}
        className="relative w-full overflow-hidden group cursor-pointer"
      >
        {item.isVideo ? (
          <DialogWidget
            trigger={
              <div className="relative w-full overflow-hidden rounded-none">
                {item.videoLinkUrl ? (
                  <ImageWidget
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={false}
                    unoptimized={false}
                  />
                ) : (
                  <video
                    src={(item.videoUrl as string) || ""}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="video-main">
                    <div className="waves-block">
                      <div className="waves wave-1" />
                      <div className="waves wave-2" />
                      <div className="waves wave-3" />
                    </div>
                  </div>
                  <div className="relative w-13 h-13 p-0 bg-transparent hover:bg-transparent border-none shadow-none rounded-full transition-all duration-300 ease-out z-10">
                    <ImageWidget
                      src={Play}
                      alt="play video"
                      className="w-13 cursor-pointer h-13 text-white group-hover:text-[#E97451] transition-colors duration-500 ease-in-out relative z-10"
                    />
                  </div>
                </div>
              </div>
            }
            contentClassName="sm:max-w-[90vw] lg:max-w-[800px] p-0"
            showCancel={false}
            showCloseButton={false}
            customCloseButton={
              <DialogClose asChild>
                <div className="cursor-pointer -mt-[30px] -mr-[30px]">
                  <ImageWidget
                    src={Into}
                    alt="Close"
                    className="w-[30px] h-[30px]"
                  />
                </div>
              </DialogClose>
            }
          >
            <div className="relative w-full aspect-video bg-black rounded-lg">
              {item.videoLinkUrl ? (
                <iframe
                  src={convertToEmbedUrl(item.videoLinkUrl)}
                  className="w-full h-full object-contain rounded-lg"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={item.alt}
                />
              ) : (
                // biome-ignore lint/a11y/useMediaCaption: Gallery videos may not have captions available
                <video
                  src={(item.videoUrl as string) || ""}
                  controls
                  autoPlay
                  className="w-full h-full object-contain rounded-lg"
                />
              )}
            </div>
          </DialogWidget>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (openLightbox && lightboxIndex !== undefined) {
                openLightbox(lightboxIndex);
              }
            }}
            className="relative w-full overflow-hidden rounded-none border-none bg-transparent p-0 cursor-pointer"
          >
            <ImageWidget
              src={item.src}
              alt={item.alt}
              width={600}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              priority={true}
              unoptimized={false}
            />
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="w-full bg-white py-10 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[64px] 3xl:text-[64px] font-semibold md:font-normal text-black font-urbanist">
                {galleryData?.Title || initialData?.Title || "Gallery"}
              </h3>
              <ParagraphWidget className="w-full md:max-w-[600px]">
                {galleryData?.Description || initialData?.Description}
              </ParagraphWidget>
            </div>

            {uniqueTypes.length > 0 && (
              <RadioGroup
                value={selectedType}
                onValueChange={setSelectedType}
                className="flex flex-wrap items-center gap-4 md:gap-6 md:mt-20"
              >
                {uniqueTypes.map((type) => {
                  const formattedType = type
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase());
                  const radioId = `filter-${type}`;
                  return (
                    <div
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <RadioGroupItem
                        value={type}
                        id={radioId}
                        className="border-[#E97451] data-[state=checked]:border-[#E97451]"
                      />
                      <Label
                        htmlFor={radioId}
                        className="text-[16px] font-normal text-black cursor-pointer"
                      >
                        {formattedType}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            )}
          </div>

          <div className="w-full" suppressHydrationWarning>
            {allImages.length > 0 && (
              <LightboxWidget images={lightboxImages}>
                {(openLightbox) =>
                  isMounted ? (
                    <div className="-m-3">
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          350: 1,
                          640: 2,
                          1024: allImages.some((item) => item.isVideo) ? 2 : 3,
                        }}
                      >
                        <Masonry gutter="24px">
                          {allImages.map((item, index) => (
                            <div key={item.id} className="w-full p-3">
                              <ScrollWidget
                                animation="fadeUp"
                                duration={0.4}
                                delay={0.1}
                                start="top 90%"
                              >
                                {renderGalleryItem(item, index, openLightbox)}
                              </ScrollWidget>
                            </div>
                          ))}
                        </Masonry>
                      </ResponsiveMasonry>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allImages.map((item, index) => (
                        <div key={item.id}>
                          <ScrollWidget
                            animation="fadeUp"
                            delay={0.1}
                            duration={0.4}
                            start="top 90%"
                          >
                            {renderGalleryItem(item, index, openLightbox)}
                          </ScrollWidget>
                        </div>
                      ))}
                    </div>
                  )
                }
              </LightboxWidget>
            )}
          </div>

          {!loading && !loadingMore && imageCards.length < total && (
            <div className="flex justify-center items-center mt-6">
              <ButtonWidget
                className="orange-button-white group rounded-[60px] px-6 h-10 xss:text-[16px] 3xl:h-[50px] text-xs 2xl:text-[14px] 3xl:text-[18px] flex items-center justify-center gap-2"
                onClick={loadMore}
              >
                Load More
                <ImageWidget
                  src={ArrowDown}
                  alt="Arrow Down"
                  height={20}
                  width={20}
                  className="object-cover"
                />
              </ButtonWidget>
            </div>
          )}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default GallerySection;
