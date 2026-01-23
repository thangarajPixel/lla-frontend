"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getGalleryPageData } from "@/app/api/server";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LightboxWidget from "@/components/widgets/LightboxWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";


import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowDown, Dummy3, Into, Play } from "@/helpers/ImageHelper";
import type { GalleryData } from "./utils/gallery";

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

  const youtubeRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(youtubeRegex);

  const videoId = match?.[1];

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`;
  }

  return url;
};

const GallerySection = ({ data: initialData }: { data: GalleryData }) => {
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});
  const [thumbnailFallbacks, setThumbnailFallbacks] = useState<Record<string, number>>({});
  const [validatedThumbnails, setValidatedThumbnails] = useState<Record<string, string>>({});
  const [displayImages, setDisplayImages] = useState<GalleryItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const isFirstRenderRef = useRef(true);

  const GalleryCardSkeleton = () => (
    <div className="w-full flex flex-col gap-3 bg-white p-3">
      <Skeleton className="w-full h-[200px] md:h-[220px] lg:h-[230px]" />
    </div>
  );

  const handleImageLoad = (itemId: string) => {
    setImageLoadStates(prev => ({ ...prev, [itemId]: true }));
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getYouTubeThumbnailWithFallback = (url: string, fallbackLevel: number = 0): string => {
    if (!url) return "";

    const youtubeRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(youtubeRegex);
    const videoId = match?.[1];

    if (!videoId) return "";

    const thumbnailQualities = [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/default.jpg`
    ];

    return thumbnailQualities[fallbackLevel] || thumbnailQualities[thumbnailQualities.length - 1];
  };

  const validateThumbnail = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && (response.headers.get('content-type')?.startsWith('image/') ?? false);
    } catch {
      return false;
    }
  };

  const findBestThumbnail = async (videoUrl: string, itemId: string): Promise<string> => {
    const dummySrc = typeof Dummy3 === 'string' ? Dummy3 : Dummy3.src;
    
    if (validatedThumbnails[itemId]) {
      return validatedThumbnails[itemId];
    }

    for (let i = 0; i < 5; i++) {
      const thumbnailUrl = getYouTubeThumbnailWithFallback(videoUrl, i);
      if (thumbnailUrl && await validateThumbnail(thumbnailUrl)) {
        setValidatedThumbnails(prev => ({ ...prev, [itemId]: thumbnailUrl }));
        return thumbnailUrl;
      }
    }

    setValidatedThumbnails(prev => ({ ...prev, [itemId]: dummySrc }));
    return dummySrc;
  };

  const handleThumbnailError = async (itemId: string, videoUrl: string) => {
    const currentFallback = thumbnailFallbacks[itemId] || 0;
    const nextFallback = currentFallback + 1;
    
    if (nextFallback < 5) {
      setThumbnailFallbacks(prev => ({ ...prev, [itemId]: nextFallback }));
      const newSrc = getYouTubeThumbnailWithFallback(videoUrl, nextFallback);
      
      if (await validateThumbnail(newSrc)) {
        setValidatedThumbnails(prev => ({ ...prev, [itemId]: newSrc }));
        return newSrc;
      } else {
        return handleThumbnailError(itemId, videoUrl);
      }
    }
    
    const dummySrc = typeof Dummy3 === 'string' ? Dummy3 : Dummy3.src;
    setValidatedThumbnails(prev => ({ ...prev, [itemId]: dummySrc }));
    return dummySrc;
  };

  const uniqueTypesInitial = useMemo(() => {
    if (!initialData?.ImageCard) return [];
    return Array.from(new Set(initialData.ImageCard.map((card) => card.Type)));
  }, [initialData?.ImageCard]);

  const [selectedType, setSelectedType] = useState<string>(
    uniqueTypesInitial.length > 0 ? uniqueTypesInitial[0] : "",
  );
  const [imageCards, setImageCards] = useState(initialData.ImageCard || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData>(initialData);

  const total = galleryData?.pagination?.total || initialData?.pagination?.total || 0;

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previousLength = useRef(imageCards.length);
  const skeletonIdRef = useRef(0);

  const skeletonKeys = useMemo(() => {
    if (loadingMore) {
      skeletonIdRef.current += 1;
      const baseId = skeletonIdRef.current;
      return Array.from({ length: 6 }, () => {
        const uniqueId = `${baseId}-${Math.random().toString(36).substring(2, 9)}`;
        return `skeleton-${uniqueId}`;
      });
    }
    return [];
  }, [loadingMore]);

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
    const images: GalleryItem[] = filteredImageCards.flatMap((card, cardIndex) => {
      if (card.Type === "Video" && (card.VideoUrl) && (!card.Image || card.Image === null)) {
        const initialThumbnail = getYouTubeThumbnailWithFallback(card.VideoUrl, 0);
        const dummySrc = typeof Dummy3 === 'string' ? Dummy3 : Dummy3.src;
        const thumbnailSrc = initialThumbnail || dummySrc;
        
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

      if (
        images.length === 0 ||
        !images.some((img) => img && (img.url || img.id))
      ) {
        return [];
      }

      return images
        .filter((img) => img && (img.url || img.id))
        .map((img, imgIndex): GalleryItem => {
          const isVideo = card.Type === "Video";
          const src = img.url ? getS3Url(img.url) : Dummy3;
          const isVideoFile =
            isVideo &&
            img.url &&
            /\.(mp4|mov|avi|webm|mkv|m4v)$/i.test(img.url);
          const videoUrl = isVideoFile ? getS3Url(img.url) : null;
          
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

    return images;
  }, [filteredImageCards]);

  useEffect(() => {
    const validateVideoThumbnails = async () => {
      const videoItems = allImages.filter(item => item.isVideo && item.videoLinkUrl);
      
      for (const item of videoItems) {
        if (!validatedThumbnails[item.id]) {
          try {
            await findBestThumbnail(item.videoLinkUrl!, item.id);
          } catch (error) {
            console.error(`Error validating thumbnail for ${item.id}:`, error);
            const dummySrc = typeof Dummy3 === 'string' ? Dummy3 : Dummy3.src;
            setValidatedThumbnails(prev => ({ ...prev, [item.id]: dummySrc }));
          }
        }
      }
    };

    if (allImages.length > 0) {
      validateVideoThumbnails();
    }
  }, [allImages, validatedThumbnails]);

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
    if (allImages.length > 0) {
      if (isFirstRenderRef.current) {
        // Hard reload - shuffle images using Math.random()
        const shuffled = [...allImages];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setDisplayImages(shuffled);
        isFirstRenderRef.current = false;
      } else {
        // Load More - append new images to existing ones
        setDisplayImages((prev) => {
          const newImages = allImages.slice(prev.length);
          return [...prev, ...newImages];
        });
      }
    }
  }, [allImages]);

  useEffect(() => {
    if (!selectedType) return;

    setPage(1);
    setImageCards([]);
    setImageLoadStates({});
    setThumbnailFallbacks({});
    setValidatedThumbnails({});
    isFirstRenderRef.current = true;

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

    fetchFilteredData();
  }, [selectedType]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  useEffect(() => {
    previousLength.current = imageCards.length;
  }, [imageCards]);

  const renderGalleryItem = (
    item: GalleryItem,
    _index: number,
    openLightbox?: (index: number) => void,
  ) => {
    const lightboxIndex = imageToLightboxIndex.get(item.id);

    return (
      <div
        key={item.id}
        className="relative w-full group cursor-pointer"
      >
        {item.isVideo ? (
          <DialogWidget
            trigger={
              <div className="relative w-full overflow-hidden rounded-none">
                {item.videoLinkUrl ? (
                  <div className="relative w-full overflow-hidden">
                    <ImageWidget
                      src={validatedThumbnails[item.id] || item.src}
                      alt={item.alt}
                      width={600}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={false}
                      unoptimized={false}
                      onLoad={() => handleImageLoad(item.id)}
                      onError={async (e) => {
                        const target = e.target as HTMLImageElement;
                        if (item.videoLinkUrl) {
                          try {
                            const newSrc = await handleThumbnailError(item.id, item.videoLinkUrl);
                            if (target.src !== newSrc) {
                              target.src = newSrc;
                            }
                          } catch (error) {
                            console.error('Error handling thumbnail fallback:', error);
                            const dummySrc = typeof Dummy3 === 'string' ? Dummy3 : Dummy3.src;
                            if (target.src !== dummySrc) {
                              target.src = dummySrc;
                            }
                          }
                        }
                        handleImageLoad(item.id);
                      }}
                    />
                    {!imageLoadStates[item.id] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden">
                    <video
                      src={(item.videoUrl as string) || ""}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>
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
                  className="w-full h-[75vh] lg:h-[90vh] object-contain rounded-lg"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={item.alt}
                />
              ) : (
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
            <div className="relative w-full overflow-hidden">
              <ImageWidget
                src={item.src}
                alt={item.alt}
                width={600}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
                unoptimized={false}
                onLoad={() => handleImageLoad(item.id)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const dummySrc = typeof Dummy3 === 'string' ? Dummy3 : Dummy3.src;
                  if (target.src !== dummySrc) {
                    target.src = dummySrc;
                  }
                  handleImageLoad(item.id);
                }}
              />

              {!imageLoadStates[item.id] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
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
              <h1 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[64px] 3xl:text-[64px] font-semibold md:font-normal text-black font-urbanist">
                {galleryData?.Title || initialData?.Title || "Gallery"}
              </h1>
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
            {loading ? (
              <div style={{ margin: "-10px" }}>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}
                >
                  <Masonry gutter="20px">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={`skeleton-${index}`} className="w-full">
                        <GalleryCardSkeleton />
                      </div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            ) : displayImages.length > 0 && (
              <LightboxWidget images={lightboxImages}>
                {(openLightbox) => {
                  const isVideoOnly = selectedType === "Video";
                  
                  return (
                    <div style={{ margin: "-10px" }}>
                      <ResponsiveMasonry
                        columnsCountBreakPoints={
                          isVideoOnly
                            ? { 350: 1, 640: 2 }
                            : { 350: 1, 640: 2, 1024: 3 }
                        }
                      >
                        <Masonry gutter="20px">
                          {displayImages.map((item, index) => (
                            <div
                              key={item.id}
                              className="w-full"
                              ref={(el) => {
                                cardsRef.current[index] = el;
                              }}
                            >
                              {renderGalleryItem(item, index, openLightbox)}
                            </div>
                          ))}

                          {loadingMore &&
                            skeletonKeys.map((key) => (
                              <div key={key} className="w-full">
                                <GalleryCardSkeleton />
                              </div>
                            ))}
                        </Masonry>
                      </ResponsiveMasonry>
                    </div>
                  );
                }}
              </LightboxWidget>
            )}
          </div>

          {!loading && !loadingMore && imageCards.length < total && isMounted && (
            <div className="flex justify-center items-center mt-6">
              <ButtonWidget
                onClick={loadMore}
                disabled={loadingMore}
                className="orange-button-white group rounded-[60px] px-6 h-10 xss:text-[16px] 3xl:h-[50px] text-xs 2xl:text-[14px] 3xl:text-[18px] flex items-center justify-center gap-2"
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