"use client";

import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LightboxWidget from "@/components/widgets/LightboxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";

type FacilitiesSectionProps = {
  data: {
    Title: string;
    Heading: string;
    SubHeading: string | null;
    Card: Array<{
      id: number;
      Title: string;
      Image: {
        id: number;
        name: string;
        url: string;
      };
      Thumbnail?: {
        id: number;
        name: string;
        url: string;
      } | null;
    }>;
  };
};

const FacilitiesSection = ({ data }: FacilitiesSectionProps) => {
  const facilitiesData = data?.Card || [];

  const lightboxImages = facilitiesData
    .filter((facility) => facility?.Image?.url)
    .map((facility) => ({
      src: getS3Url(facility.Image.url),
      alt: facility?.Image?.name || facility?.Title || "",
    }));

  const facilityToLightboxIndex = new Map<number, number>();
  let lightboxIndex = 0;
  facilitiesData.forEach((facility, index) => {
    if (facility?.Image?.url) {
      facilityToLightboxIndex.set(index, lightboxIndex);
      lightboxIndex++;
    }
  });

  const getDisplayImageUrl = (
    facility: FacilitiesSectionProps["data"]["Card"][0],
  ) => {
    if (facility?.Thumbnail?.url) {
      return getS3Url(facility.Thumbnail.url);
    }
    if (facility?.Image?.url) {
      return getS3Url(facility.Image.url);
    }
    return "";
  };

  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16 xl:py-16 2xl:py-16 3xl:py-28 relative z-20">
      <ContainerWidget>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
          <ScrollWidget animation="fadeUp" delay={0.1}>
            <div className="space-y-4 md:space-y-4 w-full md:max-w-[650px]">
              <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[64px] font-semibold md:font-normal text-black font-urbanist">
                {data?.Title}
              </h2>
              <p className="font-area-variable font-normal text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-[32px] 2xl:text-[34px] 3xl:text-[40px] text-black font-mulish">
                {data?.Heading}{" "}
                {data?.SubHeading && (
                  <span className="text-[#E97451]">{data.SubHeading}</span>
                )}
              </p>
            </div>
          </ScrollWidget>

          <LightboxWidget images={lightboxImages}>
            {(openLightbox) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {facilitiesData.map((facility, index) => {
                  const lightboxIndex = facilityToLightboxIndex.get(index);

                  return (
                    <ScrollWidget
                      key={facility.id || index}
                      animation="fadeUp"
                      delay={0.1 * (index + 1)}
                    >
                      <div className="flex flex-col items-start">
                        <div
                          {...(facility?.Image?.url
                            ? {
                                role: "button",
                                tabIndex: 0,
                                onClick: (
                                  e: React.MouseEvent<HTMLDivElement>,
                                ) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (
                                    lightboxIndex !== undefined &&
                                    facility?.Image?.url
                                  ) {
                                    openLightbox(lightboxIndex);
                                  }
                                },
                                onKeyDown: (
                                  e: React.KeyboardEvent<HTMLDivElement>,
                                ) => {
                                  if (
                                    (e.key === "Enter" || e.key === " ") &&
                                    lightboxIndex !== undefined &&
                                    facility?.Image?.url
                                  ) {
                                    e.preventDefault();
                                    openLightbox(lightboxIndex);
                                  }
                                },
                              }
                            : {})}
                          className={`relative w-full min-h-[240px] max-h-[280px] 3xl:w-[410px] 3xl:h-[280px] 3xl:aspect-auto overflow-hidden mb-3 sm:mb-4 border border-white ${
                            facility?.Image?.url
                              ? "cursor-pointer hover:opacity-90 transition-opacity"
                              : ""
                          }`}
                        >
                          <ImageWidget
                            src={getDisplayImageUrl(facility)}
                            alt={
                              facility?.Thumbnail?.name ||
                              facility?.Image?.name ||
                              facility?.Title ||
                              ""
                            }
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-left font-mulish font-bold text-black text-sm xss:text-[20px] sm:text-base md:text-lg lg:text-[18px] 2xl:text-[18px] 3xl:text-[24px] leading-tight -mb-2">
                          {facility?.Title}
                        </h4>
                      </div>
                    </ScrollWidget>
                  );
                })}
              </div>
            )}
          </LightboxWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FacilitiesSection;
