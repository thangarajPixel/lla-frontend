"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LightboxWidget from "@/components/widgets/LightboxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";

type FacilitiesSectionProps = {
  data: {
    Title: string;
    Heading: string;
    Description: string | null;
    Card: Array<{
      id: number;
      Title: string;
      Slug: string | null;
      Image: {
        id: number;
        name: string;
        url: string;
      };
      Thumbnail: {
        id: number;
        name: string;
        url: string;
      } | null;
    }>;
  };
};

const FacilitiesSection = ({ data }: FacilitiesSectionProps) => {
  const facilitiesData = data?.Card || [];

  const getThumbnailUrl = useCallback(
    (card: FacilitiesSectionProps["data"]["Card"][0]) => {
      if (card.Thumbnail?.url) {
        return getS3Url(card.Thumbnail.url);
      }
      if (Array.isArray(card.Image)) {
        return card.Image.length > 0 && card.Image[0]?.url
          ? getS3Url(card.Image[0].url)
          : null;
      }
      return card.Image?.url ? getS3Url(card.Image.url) : null;
    },
    [],
  );

  const getFullImageUrl = useCallback(
    (card: FacilitiesSectionProps["data"]["Card"][0]) => {
      if (Array.isArray(card.Image)) {
        return card.Image.length > 0 && card.Image[0]?.url
          ? getS3Url(card.Image[0].url)
          : null;
      }
      return card.Image?.url ? getS3Url(card.Image.url) : null;
    },
    [],
  );

  const lightboxImages = useMemo(() => {
    return facilitiesData
      .map((facility) => {
        const imageUrl = getFullImageUrl(facility);
        return imageUrl
          ? {
              src: imageUrl,
              alt: facility.Title || "Facility",
            }
          : null;
      })
      .filter((img): img is { src: string; alt: string } => img !== null);
  }, [facilitiesData, getFullImageUrl]);

  const facilityToLightboxIndex = useMemo(() => {
    const map = new Map<number, number>();
    let lightboxIndex = 0;
    facilitiesData.forEach((facility) => {
      const imageUrl = getFullImageUrl(facility);
      if (imageUrl) {
        map.set(facility.id, lightboxIndex);
        lightboxIndex++;
      }
    });
    return map;
  }, [facilitiesData, getFullImageUrl]);

  const predefinedPositions: Array<{
    position: string;
    container: string;
    heights: { xl: number; "2xl": number; "3xl": number };
    tops: { xl: number; "2xl": number; "3xl": number };
  }> = [
    {
      position: "absolute top-0 right-0",
      container:
        "relative w-full xl:w-[420px] xl:h-[281px] 2xl:w-[520px] 2xl:h-[381px] 3xl:h-[421px] 3xl:w-[630px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 281, "2xl": 381, "3xl": 421 },
      tops: { xl: 0, "2xl": 0, "3xl": 0 },
    },
    {
      position: "absolute top-[308px] 2xl:top-[320px] left-0",
      container:
        "relative w-full xl:w-[290px] xl:h-[183px] 2xl:w-[350px] 2xl:h-[223px] 3xl:h-[273px] 3xl:w-[410px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 183, "2xl": 223, "3xl": 273 },
      tops: { xl: 228, "2xl": 248, "3xl": 248 },
    },
    {
      position: "absolute top-[345px] 2xl:top-[455px] 3xl:top-[525px] right-0",
      container:
        "relative w-full xl:w-[332px] xl:h-[221px] 2xl:w-[422px] 2xl:h-[271px] 3xl:h-[291px] 3xl:w-[522px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 221, "2xl": 271, "3xl": 291 },
      tops: { xl: 345, "2xl": 455, "3xl": 525 },
    },
    {
      position: "absolute top-[633px] 2xl:top-[793px] 3xl:top-[923px] right-0",
      container:
        "relative w-full xl:w-[332px] xl:h-[260px] 2xl:w-[420px] 2xl:h-[306px] 3xl:h-[346px] 3xl:w-[520px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 260, "2xl": 306, "3xl": 346 },
      tops: { xl: 633, "2xl": 793, "3xl": 923 },
    },
    {
      position:
        "absolute left-20 top-[550px] 2xl:top-[603px] 2xl:left-[98px] 3xl:top-[680px] 3xl:left-[110px]",
      container:
        "relative w-full xl:w-[440px] xl:h-[319px] 2xl:w-[500px] 2xl:h-[379px] 3xl:h-[419px] 3xl:w-[630px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 319, "2xl": 379, "3xl": 419 },
      tops: { xl: 460, "2xl": 540, "3xl": 610 },
    },
    {
      position:
        "absolute top-[930px] 2xl:top-[1056px] 3xl:top-[1176px] left-0 2xl:left-4.5 3xl:left-0",
      container:
        "relative w-[425px] h-[295px] 2xl:w-[500px] 2xl:h-[379px] 3xl:h-[419px] 3xl:w-[630px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 295, "2xl": 379, "3xl": 419 },
      tops: { xl: 849, "2xl": 996, "3xl": 1126 },
    },
    {
      position:
        "absolute top-[960px] 2xl:top-[1168px] 3xl:top-[1368px] right-0",
      container:
        "relative w-[425px] h-[295px] 2xl:w-[500px] 2xl:h-[379px] 3xl:h-[419px] 3xl:w-[630px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 295, "2xl": 379, "3xl": 419 },
      tops: { xl: 960, "2xl": 1168, "3xl": 1368 },
    },
    {
      position:
        "absolute top-[1295px] 2xl:top-[1500px] 3xl:top-[1675px] left-0",
      container:
        "relative xl:w-[290px] xl:h-[183px] 2xl:w-[330px] 2xl:h-[207px] 3xl:h-[267px] 3xl:w-[410px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 183, "2xl": 207, "3xl": 267 },
      tops: { xl: 1205, "2xl": 1435, "3xl": 1645 },
    },
    {
      position:
        "absolute top-[1325px] 2xl:top-[1625px] 3xl:top-[1885px] right-0",
      container:
        "relative w-[350px] h-[207px] 2xl:w-[410px] 2xl:h-[297px] 3xl:h-[347px] 3xl:w-[520px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 207, "2xl": 297, "3xl": 347 },
      tops: { xl: 1325, "2xl": 1625, "3xl": 1885 },
    },
    {
      position:
        "absolute top-[1535px] left-20 2xl:left-[109px] 2xl:top-[1769px] 3xl:top-[2039px] 3xl:left-[110px]",
      container:
        "relative w-[420px] h-[250px] 2xl:w-[500px] 2xl:h-[312px] 3xl:h-[392px] 3xl:w-[630px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 250, "2xl": 312, "3xl": 392 },
      tops: { xl: 1455, "2xl": 1709, "3xl": 2009 },
    },
    {
      position:
        "absolute top-[1595px] 2xl:top-[2016px] 3xl:top-[2366px] right-0",
      container:
        "relative w-[270px] h-[189px] 2xl:w-[330px] 2xl:h-[235px] 3xl:h-[275px] 3xl:w-[410px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 189, "2xl": 235, "3xl": 275 },
      tops: { xl: 1595, "2xl": 2016, "3xl": 2366 },
    },
    {
      position:
        "absolute top-[1860px] 2xl:top-[2149px] 3xl:top-[2519px] left-0",
      container:
        "relative w-[270px] h-[189px] 2xl:w-[330px] 2xl:h-[235px] 3xl:h-[275px] 3xl:w-[410px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 189, "2xl": 235, "3xl": 275 },
      tops: { xl: 1759, "2xl": 2089, "3xl": 2499 },
    },
    {
      position:
        "absolute top-[2110px] 2xl:top-[2445px] 3xl:top-[2875px] left-0",
      container:
        "relative w-[270px] h-[189px] 2xl:w-[330px] 2xl:h-[235px] 3xl:h-[275px] 3xl:w-[410px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 189, "2xl": 235, "3xl": 275 },
      tops: { xl: 2005, "2xl": 2385, "3xl": 2855 },
    },
    {
      position:
        "absolute top-[1850px] right-20 2xl:top-[2310px] 3xl:top-[2730px] 2xl:right-[108px]",
      container:
        "relative w-[491px] h-[386px] 2xl:w-[581px] 2xl:h-[416px] 3xl:h-[496px] 3xl:w-[741px] overflow-hidden mb-3 sm:mb-4 border border-white",
      heights: { xl: 386, "2xl": 416, "3xl": 496 },
      tops: { xl: 1850, "2xl": 2310, "3xl": 2730 },
    },
  ];

  const facilityPositions = useMemo(() => {
    const positions: Array<{
      facility: FacilitiesSectionProps["data"]["Card"][0];
      position: string;
      container: string;
      heights: { xl: number; "2xl": number; "3xl": number };
      tops: { xl: number; "2xl": number; "3xl": number };
      left?: number;
      right?: number;
      widths?: { xl: number; "2xl": number; "3xl": number };
    }> = [];

    const maxPredefinedCount = 14;

    const sizePatterns = [
      { width: 420, height: 281, left: undefined, right: 0 },
      { width: 290, height: 183, left: 0, right: undefined },
      { width: 332, height: 221, left: undefined, right: 0 },
      { width: 440, height: 319, left: 80, right: undefined },
      { width: 425, height: 295, left: 0, right: undefined },
      { width: 425, height: 295, left: undefined, right: 0 },
      { width: 350, height: 207, left: undefined, right: 0 },
      { width: 420, height: 250, left: 80, right: undefined },
      { width: 270, height: 189, left: undefined, right: 0 },
      { width: 270, height: 189, left: 0, right: undefined },
      { width: 491, height: 386, left: undefined, right: 80 },
    ];

    let maxPredefinedBottomXl = 0;
    predefinedPositions.forEach((pos) => {
      const bottomXl = pos.tops.xl + pos.heights.xl;
      if (bottomXl > maxPredefinedBottomXl) {
        maxPredefinedBottomXl = bottomXl;
      }
    });

    const titleHeight = 50;
    let currentTop = maxPredefinedBottomXl + titleHeight + 40;
    const verticalSpacing = 80;
    let patternIndex = 0;
    let facilityIndex = 0;

    facilitiesData.forEach((facility) => {
      const imageUrl = getThumbnailUrl(facility);
      if (!imageUrl) return;

      if (
        facilityIndex < maxPredefinedCount &&
        facilityIndex < predefinedPositions.length
      ) {
        const predefined = predefinedPositions[facilityIndex];
        positions.push({
          facility,
          ...predefined,
        });
      } else {
        const pattern = sizePatterns[patternIndex % sizePatterns.length];
        patternIndex++;

        positions.push({
          facility,
          position: "absolute",
          container: `relative overflow-hidden mb-3 sm:mb-4 border border-white`,
          heights: {
            xl: pattern.height,
            "2xl": Math.round(pattern.height * 1.2),
            "3xl": Math.round(pattern.height * 1.4),
          },
          tops: {
            xl: currentTop,
            "2xl": currentTop + 50,
            "3xl": currentTop + 100,
          },
          left: pattern.left,
          right: pattern.right,
          widths: {
            xl: pattern.width,
            "2xl": Math.round(pattern.width * 1.2),
            "3xl": Math.round(pattern.width * 1.4),
          },
        });

        currentTop += pattern.height + titleHeight + verticalSpacing;
      }

      facilityIndex++;
    });

    return positions;
  }, [facilitiesData, getThumbnailUrl]);

  const containerHeights = useMemo(() => {
    const calculateMaxHeight = (breakpoint: "xl" | "2xl" | "3xl") => {
      if (facilityPositions.length === 0) return 0;

      let maxBottom = 0;
      const titleHeight = 50;
      facilityPositions.forEach((f) => {
        const top = f.tops?.[breakpoint] ?? f.tops?.xl ?? 0;
        const height = f.heights?.[breakpoint] ?? f.heights?.xl ?? 0;
        const bottom = top + height + titleHeight;
        if (bottom > maxBottom) {
          maxBottom = bottom;
        }
      });

      return maxBottom + 80;
    };

    return {
      xl: calculateMaxHeight("xl"),
      "2xl": calculateMaxHeight("2xl"),
      "3xl": calculateMaxHeight("3xl"),
    };
  }, [facilityPositions]);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getBreakpoint = useCallback((): "xl" | "2xl" | "3xl" => {
    if (windowWidth >= 1920) return "3xl";
    if (windowWidth >= 1536) return "2xl";
    if (windowWidth >= 1280) return "xl";
    return "xl";
  }, [windowWidth]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateHeight = () => {
      if (!containerRef.current) return;
      const breakpoint = getBreakpoint();
      const height = containerHeights[breakpoint] ?? containerHeights.xl ?? 0;
      containerRef.current.style.minHeight =
        height > 0 ? `${height}px` : "auto";
    };

    updateHeight();
    const timeoutId = setTimeout(updateHeight, 100);
    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateHeight);
    };
  }, [containerHeights, getBreakpoint]);

  return (
    <section className=" w-full bg-white py-15 md:pt-25 md:pb-10">
      <ContainerWidget>
        <div className="xl:hidden">
          <ScrollWidget animation="fadeUp" delay={0.1}>
            <div className="space-y-4 md:space-y-4 w-full mb-8 md:mb-12">
              <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl font-semibold md:font-normal text-black font-urbanist">
                {data?.Title}
              </h2>
              <HTMLWidget
                content={data?.Heading}
                className="font-area-variable font-normal text-lg xss:text-[24px] md:text-lg lg:text-xl text-black font-mulish"
                tag="p"
              />
              <HTMLWidget content={data?.Description || ""} tag="p" />
            </div>
          </ScrollWidget>

          <LightboxWidget images={lightboxImages}>
            {(openLightbox) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-6">
                {facilitiesData.map((facility, index) => {
                  const thumbnailUrl = getThumbnailUrl(facility);
                  if (!thumbnailUrl) return null;

                  const lightboxIndex = facilityToLightboxIndex.get(
                    facility.id,
                  );

                  return (
                    <ScrollWidget
                      key={facility.id}
                      animation="fadeUp"
                      delay={0.1 + index * 0.1}
                      duration={0.8}
                    >
                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="relative w-full aspect-4/3 overflow-hidden mb-3 sm:mb-4 border border-white cursor-pointer bg-transparent p-0 group"
                          aria-label={`View ${facility.Title || "Facility"} image in lightbox`}
                          onClick={() => {
                            if (lightboxIndex !== undefined) {
                              openLightbox(lightboxIndex);
                            }
                          }}
                        >
                          <ImageWidget
                            src={thumbnailUrl}
                            alt={facility.Title || "Facility"}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </button>
                        {facility.Title && (
                          <h3 className="text-left font-mulish font-bold text-black text-text-[20px] xss:text-[20px] sm:text-base md:text-lg leading-tight -mt-2">
                            {facility.Title}
                          </h3>
                        )}
                      </div>
                    </ScrollWidget>
                  );
                })}
              </div>
            )}
          </LightboxWidget>
        </div>

        <div
          ref={containerRef}
          className="hidden xl:block relative"
          style={{
            minHeight:
              (containerHeights.xl ?? 0) > 0
                ? `${containerHeights.xl}px`
                : "auto",
          }}
        >
          <ScrollWidget animation="fadeUp" delay={0.1}>
            <div className="space-y-4 md:space-y-4 w-full xl:max-w-[430px] 2xl:max-w-[510px] 3xl:max-w-[650px]">
              <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[64px] font-semibold md:font-normal text-black font-urbanist">
                {data?.Title}
              </h2>
              <HTMLWidget
                content={data?.Heading}
                className="font-area-variable font-normal text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-[32px] 2xl:text-[34px] 3xl:text-[40px] text-black font-mulish"
                tag="p"
              />
              <HTMLWidget content={data?.Description || ""} tag="p" />
            </div>
          </ScrollWidget>

          <LightboxWidget images={lightboxImages}>
            {(openLightbox) => (
              <>
                {facilityPositions.map((facilityPos, index) => {
                  const thumbnailUrl = getThumbnailUrl(facilityPos.facility);
                  if (!thumbnailUrl) return null;

                  const lightboxIndex = facilityToLightboxIndex.get(
                    facilityPos.facility.id,
                  );

                  const isPredefined =
                    facilityPos.position.includes("top-") ||
                    facilityPos.position.includes("left-") ||
                    facilityPos.position.includes("right-");

                  let dynamicStyle: React.CSSProperties = {};
                  let containerStyle: React.CSSProperties = {};

                  if (!isPredefined) {
                    const breakpoint = getBreakpoint();
                    const currentTop =
                      facilityPos.tops?.[breakpoint] ??
                      facilityPos.tops?.xl ??
                      0;
                    const currentHeight =
                      facilityPos.heights?.[breakpoint] ??
                      facilityPos.heights?.xl ??
                      0;
                    const currentWidth = facilityPos.widths?.[breakpoint];

                    dynamicStyle = {
                      top: `${currentTop}px`,
                      ...(facilityPos.left !== undefined && {
                        left: `${facilityPos.left}px`,
                      }),
                      ...(facilityPos.right !== undefined && {
                        right: `${facilityPos.right}px`,
                      }),
                    };

                    containerStyle = {
                      height: `${currentHeight}px`,
                      ...(currentWidth && { width: `${currentWidth}px` }),
                    };
                  }

                  return (
                    <div
                      key={facilityPos.facility.id || index}
                      className={facilityPos.position}
                      style={isPredefined ? undefined : dynamicStyle}
                    >
                      <ScrollWidget
                        animation="fadeUp"
                        delay={0.1 + index * 0.1}
                        duration={0.8}
                      >
                        <button
                          type="button"
                          className={`${facilityPos.container} cursor-pointer bg-transparent p-0 group`}
                          style={isPredefined ? undefined : containerStyle}
                          aria-label={`View ${facilityPos.facility.Title || "Facility"} image in lightbox`}
                          onClick={() => {
                            if (lightboxIndex !== undefined) {
                              openLightbox(lightboxIndex);
                            }
                          }}
                        >
                          <ImageWidget
                            src={thumbnailUrl}
                            alt={facilityPos.facility.Title || "Facility"}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </button>
                        {facilityPos.facility.Title && (
                          <h3 className="text-left font-mulish font-bold text-black text-sm xss:text-[20px] sm:text-base md:text-lg lg:text-[18px] 2xl:text-[18px] 3xl:text-[24px] leading-tight -mt-3">
                            {facilityPos.facility.Title}
                          </h3>
                        )}
                      </ScrollWidget>
                    </div>
                  );
                })}
              </>
            )}
          </LightboxWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FacilitiesSection;
