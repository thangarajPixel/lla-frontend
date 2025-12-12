"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getGalleryPageData } from "@/app/api/server";
import { DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowDown, Dummy3, Into, Play } from "@/helpers/ImageHelper";

interface GalleryData {
  id: number;
  Title: string;
  Description: string;
  ImageCard: Array<{
    id: number;
    Type: string;
    Url?: string | null;
    Image:
      | {
          id: number;
          name: string;
          url: string;
        }
      | Array<{
          id: number;
          name: string;
          url: string;
        }>;
  }>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const isVideoFile = (url: string): boolean => {
  if (!url) return false;
  const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv", ".m4v"];
  return videoExtensions.some((ext) =>
    url.toLowerCase().endsWith(ext.toLowerCase()),
  );
};

const GalleryImageSkeleton = () => (
  <div className="w-full flex flex-col gap-3 bg-[#FFFFFF4D]">
    <Skeleton className="w-full h-[400px] md:h-[500px] lg:h-[600px]" />
  </div>
);

const GallerySection = ({ data: initialData }: { data: GalleryData }) => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [imageCards, setImageCards] = useState(initialData.ImageCard || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
    () =>
      selectedType === "all"
        ? imageCards
        : imageCards.filter((card) => card.Type === selectedType),
    [imageCards, selectedType],
  );

  const allImages = useMemo(() => {
    return filteredImageCards.flatMap((card, cardIndex) => {
      const images = Array.isArray(card.Image)
        ? card.Image
        : card.Image
          ? [card.Image]
          : [];
      return images.map((img, imgIndex) => {
        const isVideo = isVideoFile(img.url || "");
        const src = img.url ? getS3Url(img.url) : Dummy3;
        const videoUrl = isVideo && img.url ? getS3Url(img.url) : null;
        return {
          id: `gallery-${card.id}-${img.id}-${cardIndex}-${imgIndex}`,
          imageId: img.id,
          cardId: card.id,
          src,
          alt: img.name || "Gallery image",
          type: card.Type,
          isVideo,
          videoUrl: typeof videoUrl === "string" ? videoUrl : null,
        };
      });
    });
  }, [filteredImageCards]);

  const skeletonIdRef = useRef(0);

  const skeletonKeys = useMemo(() => {
    if (!loading) return [];
    skeletonIdRef.current += 1;
    const pageSize = initialData?.pagination?.pageSize || 10;
    return Array.from(
      { length: pageSize },
      (_, i) => `skeleton-${skeletonIdRef.current}-${i}`,
    );
  }, [loading, initialData?.pagination?.pageSize]);

  useEffect(() => {
    if (selectedType !== "all") {
      setPage(1);
      setImageCards([]);

      const fetchFilteredData = async () => {
        setLoading(true);
        try {
          const params = {
            page: 1,
            per_page: 9,
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
    } else {
      setPage(1);
      setImageCards(initialData.ImageCard || []);
      setGalleryData(initialData);
    }
  }, [selectedType, initialData, isMounted]);
  const loadMore = async () => {
    if (loading || imageCards.length >= total) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const params: { page: number; per_page: number; type?: string } = {
        page: nextPage,
        per_page: 9,
        ...(selectedType !== "all" && { type: selectedType }),
      };
      const { data: res } = await getGalleryPageData(params);
      if (res?.ImageCard) {
        setImageCards((prev) => [...prev, ...res.ImageCard]);
        setGalleryData(res);
        setPage(nextPage);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderGalleryItem = (item: (typeof allImages)[0], index: number) => (
    <ScrollWidget
      key={item.id}
      animation="fadeUp"
      delay={index * 0.1}
      duration={0.6}
      start="top 85%"
      once={true}
    >
      <div className="relative w-full overflow-hidden group cursor-pointer">
        {item.isVideo ? (
          <DialogWidget
            trigger={
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-none">
                <video
                  src={(item.videoUrl as string) || ""}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  muted
                  playsInline
                  preload="metadata"
                />
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
              {/* biome-ignore lint/a11y/useMediaCaption: Gallery videos may not have captions available */}
              <video
                src={(item.videoUrl as string) || ""}
                controls
                autoPlay
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </DialogWidget>
        ) : (
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-none">
            <ImageWidget
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </ScrollWidget>
  );

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                {galleryData?.Title || initialData?.Title || "Gallery"}
              </h3>
              <p className="text-[16px] lg:text-[16px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                {galleryData?.Description || initialData?.Description || ""}
              </p>
            </div>

            {uniqueTypes.length > 0 && (
              <div className="relative w-full md:w-auto md:min-w-[200px]">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[200px] rounded-full border-[#E97451]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="w-full" suppressHydrationWarning>
            {allImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {allImages.map((item, index) => (
                  <div
                    key={item.id}
                    className={
                      item.isVideo
                        ? "sm:col-span-1 lg:col-span-3"
                        : "sm:col-span-1 lg:col-span-2"
                    }
                  >
                    {renderGalleryItem(item, index)}
                  </div>
                ))}
              </div>
            )}
            {loading &&
              skeletonKeys.map((key, index) => (
                <ScrollWidget
                  key={key}
                  animation="fadeUp"
                  delay={index * 0.1}
                  duration={0.6}
                  start="top 85%"
                  once={true}
                >
                  <GalleryImageSkeleton />
                </ScrollWidget>
              ))}
          </div>

          {!loading && imageCards.length < total && (
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
