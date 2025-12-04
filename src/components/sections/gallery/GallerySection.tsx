"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Input } from "@/components/ui/input";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import {
  ArrowDown,
  Dummy3,
  Dummy4,
  Dummy5,
  Dummy6,
  Dummy7,
  Dummy8,
  Dummy9,
} from "@/helpers/ImageHelper";

const baseImages = [Dummy3, Dummy4, Dummy5, Dummy6, Dummy7, Dummy8, Dummy9];

const placeholderImages = Array.from({ length: 21 }, (_, i) => ({
  id: `gallery-image-${i}`,
  src: baseImages[i % baseImages.length],
  alt: `Gallery image ${i + 1}`,
}));

const INITIAL_DISPLAY_COUNT = 12;

const GallerySection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayedImages = placeholderImages.slice(0, displayCount);
  const hasMore = displayCount < placeholderImages.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 12, placeholderImages.length));
  };

  const filteredImages = searchQuery
    ? displayedImages.filter(
        (image) =>
          image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          image.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : displayedImages;

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                Gallery
              </h3>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                The Light & Life Academy Blog brings together a diverse set of
                opinions on photography - the past, present and future
              </p>
            </div>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  inputClassName="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
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
                    {filteredImages.map((image) => (
                      <div
                        key={image.id}
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
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: "20px" }}
              >
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative w-full overflow-hidden group cursor-pointer"
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
                ))}
              </div>
            )}
          </div>

          {hasMore && !searchQuery && (
            <div className="flex justify-center items-center mt-6">
              <ButtonWidget
                onClick={handleLoadMore}
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
