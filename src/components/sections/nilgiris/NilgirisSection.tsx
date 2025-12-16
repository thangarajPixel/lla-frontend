"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getNilgirisPageData } from "@/app/api/server";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import DialogWidget from "@/components/widgets/DialogWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowDown, Dummy3, Into, Play } from "@/helpers/ImageHelper";
import type { NilgirisData } from "./utils/nilgiris";

const isVideoFile = (url: string): boolean => {
  if (!url) return false;
  const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv", ".m4v"];
  return videoExtensions.some((ext) =>
    url.toLowerCase().endsWith(ext.toLowerCase()),
  );
};

const NilgirisImageSkeleton = () => (
  <div className="w-full flex flex-col gap-3 bg-[#FFFFFF4D]">
    <Skeleton className="w-full h-[400px] md:h-[500px] lg:h-[600px]" />
  </div>
);

const NilgirisSection = ({ data: initialData }: { data: NilgirisData }) => {
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
  const [nilgirisData, setNilgirisData] = useState<NilgirisData>(initialData);
  const [isMounted, setIsMounted] = useState(false);

  const total =
    nilgirisData?.pagination?.total || initialData?.pagination?.total || 0;

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
          id: `nilgiris-${card.id}-${img.id}-${cardIndex}-${imgIndex}`,
          imageId: img.id,
          cardId: card.id,
          src,
          alt: img.name || "Nilgiris image",
          type: card.Type,
          isVideo,
          videoUrl: typeof videoUrl === "string" ? videoUrl : null,
        };
      });
    });
  }, [filteredImageCards]);

  const skeletonIdRef = useRef(0);

  const skeletonKeys = useMemo(() => {
    if (!loadingMore) return [];
    skeletonIdRef.current += 1;
    const perPage = 9;
    return Array.from(
      { length: perPage },
      (_, i) => `skeleton-${skeletonIdRef.current}-${i}`,
    );
  }, [loadingMore]);

  useEffect(() => {
    if (!selectedType) return;

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

        const { data: res } = await getNilgirisPageData(params);
        if (res?.ImageCard) {
          setImageCards(res.ImageCard);
          setNilgirisData(res);
        }
      } catch (error) {
        console.error("Error fetching filtered nilgiris data:", error);
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
        per_page: 9,
        type: selectedType,
      };
      const { data: res } = await getNilgirisPageData(params);
      if (res?.ImageCard) {
        setImageCards((prev) => [...prev, ...res.ImageCard]);
        setNilgirisData(res);
        setPage(nextPage);
      }
    } finally {
      setLoadingMore(false);
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
              <div className="relative w-full overflow-hidden rounded-none">
                <video
                  src={(item.videoUrl as string) || ""}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
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
          <div className="relative w-full overflow-hidden rounded-none">
            <ImageWidget
              src={item.src}
              alt={item.alt}
              width={600}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
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
                {nilgirisData?.Title || initialData?.Title || "Nilgiris"}
              </h3>
              <p className="text-[16px] md:text-[17px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                {nilgirisData?.Description || initialData?.Description || ""}
              </p>
            </div>

            {uniqueTypes.length > 0 && (
              <RadioGroup
                value={selectedType}
                onValueChange={setSelectedType}
                className="flex flex-wrap items-center gap-4 md:gap-6 mt-6"
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
            {allImages.length > 0 &&
              (isMounted ? (
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
                          {renderGalleryItem(item, index)}
                        </div>
                      ))}
                      {loadingMore &&
                        skeletonKeys.length > 0 &&
                        skeletonKeys.map((key, index) => (
                          <div key={key} className="w-full p-3">
                            <ScrollWidget
                              animation="fadeUp"
                              delay={(allImages.length + index) * 0.1}
                              duration={0.6}
                              start="top 85%"
                              once={true}
                            >
                              <NilgirisImageSkeleton />
                            </ScrollWidget>
                          </div>
                        ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allImages.map((item, index) => (
                    <div key={item.id}>{renderGalleryItem(item, index)}</div>
                  ))}
                  {loadingMore &&
                    skeletonKeys.length > 0 &&
                    skeletonKeys.map((key, index) => (
                      <div key={key}>
                        <ScrollWidget
                          animation="fadeUp"
                          delay={(allImages.length + index) * 0.1}
                          duration={0.6}
                          start="top 85%"
                          once={true}
                        >
                          <NilgirisImageSkeleton />
                        </ScrollWidget>
                      </div>
                    ))}
                </div>
              ))}
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

export default NilgirisSection;
