"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getGalleryPageData } from "@/app/api/server";
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
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowDown, Dummy3 } from "@/helpers/ImageHelper";

interface GalleryData {
  id: number;
  Title: string;
  Description: string;
  ImageCard: Array<{
    id: number;
    Type: string;
    Image: Array<{
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

const GallerySection = ({ data: initialData }: { data: GalleryData }) => {
  const GalleryImageSkeleton = () => (
    <div className="w-full flex flex-col gap-3 bg-[#FFFFFF4D]">
      <Skeleton className="w-full h-[400px] md:h-[500px] lg:h-[600px]" />
    </div>
  );

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

  const filteredImageCards = useMemo(() => {
    if (selectedType === "all") {
      return imageCards;
    }
    return imageCards.filter((card) => card.Type === selectedType);
  }, [imageCards, selectedType]);

  const allImages = useMemo(() => {
    return filteredImageCards.flatMap((card, cardIndex) =>
      (card.Image || []).map((img, imgIndex) => ({
        id: `gallery-${card.id}-${img.id}-${cardIndex}-${imgIndex}`,
        imageId: img.id,
        cardId: card.id,
        src: img.url ? getS3Url(img.url) : Dummy3,
        alt: img.name || "Gallery image",
        type: card.Type,
      })),
    );
  }, [filteredImageCards]);

  const skeletonIdRef = useRef(0);

  const skeletonKeys = useMemo(() => {
    if (loading) {
      skeletonIdRef.current += 1;
      const baseId = skeletonIdRef.current;
      const pageSize = initialData?.pagination?.pageSize || 10;
      return Array.from({ length: pageSize }, () => {
        const uniqueId = `${baseId}-${Math.random().toString(36).substring(2, 9)}`;
        return `skeleton-${uniqueId}`;
      });
    }
    return [];
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

    await new Promise((res) => setTimeout(res, 500));

    const nextPage = page + 1;
    const params: {
      page: number;
      per_page: number;
      type?: string;
    } = {
      page: nextPage,
      per_page: 9,
    };

    if (selectedType !== "all") {
      params.type = selectedType;
    }

    const { data: res } = await getGalleryPageData(params);
    if (res?.ImageCard) {
      setImageCards((prev) => [...prev, ...res.ImageCard]);
      setGalleryData(res);
      setPage(nextPage);
    }
    setLoading(false);
  };

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                {galleryData?.Title || initialData?.Title || "Gallery"}
              </h3>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                {galleryData?.Description || initialData?.Description || ""}
              </p>
            </div>

            {uniqueTypes.length > 0 && (
              <div className="relative w-full md:w-auto md:min-w-[200px]">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[200px]">
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
            {isMounted ? (
              <div style={{ margin: "-10px" }}>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{
                    350: 1,
                    640: 2,
                    1024: 3,
                  }}
                >
                  <Masonry gutter="20px">
                    {allImages.map((image, index) => (
                      <ScrollWidget
                        key={image.id}
                        animation="fadeUp"
                        delay={index * 0.1}
                        duration={0.6}
                        start="top 85%"
                        once={true}
                      >
                        <div
                          className="relative w-full overflow-hidden group cursor-pointer"
                          style={{ padding: "10px" }}
                        >
                          <div className="relative w-full overflow-hidden rounded-none">
                            <ImageWidget
                              src={image.src}
                              alt={image.alt}
                              width={400}
                              height={600}
                              className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </ScrollWidget>
                    ))}

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
                          <div style={{ padding: "10px" }}>
                            <GalleryImageSkeleton />
                          </div>
                        </ScrollWidget>
                      ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: "20px" }}
              >
                {allImages.map((image, index) => (
                  <ScrollWidget
                    key={image.id}
                    animation="fadeUp"
                    delay={index * 0.1}
                    duration={0.6}
                    start="top 85%"
                    once={true}
                  >
                    <div className="relative w-full overflow-hidden group cursor-pointer">
                      <div className="relative w-full overflow-hidden rounded-none">
                        <ImageWidget
                          src={image.src}
                          alt={image.alt}
                          width={400}
                          height={600}
                          className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </ScrollWidget>
                ))}
              </div>
            )}
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
