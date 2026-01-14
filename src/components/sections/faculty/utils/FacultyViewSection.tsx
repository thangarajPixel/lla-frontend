"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LightboxWidget from "@/components/widgets/LightboxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { clientAxios } from "@/helpers/AxiosHelper";
import { getS3Url } from "@/helpers/ConstantHelper";
import { OrangeArrowRight } from "@/helpers/ImageHelper";

interface ImageData {
  id: number;
  name: string;
  url: string;
}

interface ViewCard {
  id: number;
  Description: string;
  Image: ImageData[];
}

interface FacultyCard {
  id: number;
  Title: string;
  Slug: string;
  Image: ImageData;
  ViewCard: ViewCard[];
}

type FacultyViewSectionData = {
  Card: FacultyCard[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    currentPosition: number;
    nextSlug: string;
    previousSlug: string;
    totalCards: number;
  };
};

interface FacultyViewSectionProps {
  data: FacultyViewSectionData;
  type: string;
}

const FacultyViewSection = ({ data, type }: FacultyViewSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [currentData, setCurrentData] = useState<FacultyViewSectionData>(data);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);

  const slug = pathname.split("/").pop() || "";

  const facultyCard = currentData?.Card?.[0];
  const viewCard = facultyCard?.ViewCard?.[0];
  const _totalPages = currentData?.pagination?.totalPages || 1;

  const facultyName = facultyCard?.Title || "Faculty Member";
  const portraitImage = facultyCard?.Image;
  const biography = viewCard?.Description || "";
  const galleryImages = viewCard?.Image || [];

  const lightboxImages = galleryImages
    .filter((image) => image?.url)
    .map((image) => ({
      src: getS3Url(image.url),
      alt: image?.name || "Gallery Image",
    }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const _fetchFacultyData = async (page: number) => {
    if (!slug || isLoading) return;

    setIsLoading(true);
    try {
      const response = await clientAxios.get(
        `/faculty/view/${type}/${slug}?page=${page}`,
      );
      const responseData = response.data.data;
      if (responseData) {
        setCurrentData(responseData);
        setCurrentPage(page);
        setAnimationKey((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    router.push(`/${type}/${data?.pagination?.previousSlug}`);
  };

  const handleNext = () => {
    router.push(`/${type}/${data?.pagination?.nextSlug}`);
  };

  return (
    <>
      {/* Back button - optimized spacing and alignment */}
      <div className="px-4 pt-4 pb-2 md:fixed md:top-25 md:left-auto md:right-5 md:z-50 md:p-0">
        <ButtonWidget
          onClick={() => router.push("/faculty")}
          type="button"
          className="orange-button-white flex border-none items-center gap-2 rounded-[60px] px-3 md:px-5 h-8 md:h-10 text-xs md:text-sm lg:text-base font-bold transition-colors duration-300 font-mulish text-[13px] md:text-[15px] 3xl:text-[18px] shadow-lg"
          aria-label="Go back"
        >
          <ImageWidget
            src={OrangeArrowRight}
            alt="Back"
            className="w-4 h-4 md:w-5 md:h-5"
          />
          <span className="text-[#E97451] sm:inline">Back</span>
        </ButtonWidget>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-[2.5fr_3fr]">
        <div className="flex flex-col">
          <div className="flex flex-col sticky top-16 space-y-4 px-4 py-4 pb-0 md:pb-8 md:px-6 lg:px-8 xl:px-12 xl:pl-50 2xl:pl-58 2xl:pr-10 3xl:px-20 3xl:pl-74 md:pt-13">
            <ScrollWidget
              key={`title-${animationKey}`}
              animation="fadeUp"
              delay={0.1}
            >
              <h1 className="text-3xl font-urbanist text-[#E97451] xss:text-[24px] lg:text-[30px] 3xl:text-[40px] font-normal mb-6">
                {facultyName}
              </h1>
            </ScrollWidget>

            <div className="relative w-full mb-6">
              <div className="space-y-4">
                {portraitImage?.url && (
                  <ScrollWidget
                    key={`image-${animationKey}`}
                    animation="fadeUp"
                    delay={0.3}
                  >
                    <div className="relative w-full overflow-hidden">
                      <ImageWidget
                        src={getS3Url(portraitImage.url)}
                        alt={portraitImage.name || "Faculty Image"}
                        width={800}
                        height={1200}
                        className="object-cover w-full h-auto xss:h-[361px] xss:w-[361px] sm:w-full sm:h-auto"
                      />
                    </div>
                  </ScrollWidget>
                )}
              </div>
            </div>
            <div>
              <div className="flex gap-2 sm:gap-4 w-full bg-[#E97451]/20 rounded-full p-1 sm:p-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  // disabled={currentPage <= 1 || isLoading}
                  className={`flex items-center rounded-full justify-center h-8 sm:h-10 md:h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                    isLoading  // currentPage <= 1 || 
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-[#FFD4CC]"
                  }`}
                  aria-label="Previous portrait"
                >
                  <ImageWidget
                    src={OrangeArrowRight}
                    alt="Previous"
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                  />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  // disabled={currentPage >= totalPages || isLoading}
                  className={`flex items-center rounded-full justify-center h-8 sm:h-10 md:h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                    isLoading // currentPage >= totalPages || 
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-[#FFD4CC]"
                  }`}
                  aria-label="Next portrait"
                >
                  <ImageWidget
                    src={OrangeArrowRight}
                    alt="Next"
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rotate-180"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[#E97451]/20 md:pt-18">
          <div className="flex flex-col justify-center px-4 py-8 pb-4 md:pb-8 md:px-4 md:py-12 lg:px-6 lg:py-13/5 xl:px-10 xl:pr-50 2xl:pr-58 3xl:pr-74 3xl:py-13.5">
            {biography && (
              <ScrollWidget
                key={`biography-${animationKey}`}
                animation="fadeUp"
                delay={0.5}
              >
                <div className="mb-8">
                  <HTMLWidget
                    content={biography}
                    className="font-mulish text-[16px] md:text-[17px] 2xl:text-[18px] font-normal text-black leading-[26px]"
                  />
                </div>
              </ScrollWidget>
            )}

            {galleryImages.length > 0 && (
              <ScrollWidget
                key={`gallery-${animationKey}`}
                animation="fadeUp"
                delay={0.7}
              >
                <div className="mt-auto">
                  <LightboxWidget images={lightboxImages}>
                    {(openLightbox) => (
                      <>
                        {isMounted ? (
                          <ResponsiveMasonry
                            columnsCountBreakPoints={{
                              350: 1,
                              640: 2,
                            }}
                          >
                            <Masonry gutter="24px">
                              {galleryImages.map(
                                (image: ImageData, index: number) => {
                                  if (!image?.url) return null;
                                  const imageAlt =
                                    image?.name || `Gallery ${index + 1}`;
                                  return (
                                    // biome-ignore lint/a11y/useSemanticElements: div needed for Masonry layout
                                    <div
                                      key={`gallery-${image.id || index}`}
                                      role="button"
                                      tabIndex={0}
                                      onClick={() => openLightbox(index)}
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === " "
                                        ) {
                                          e.preventDefault();
                                          openLightbox(index);
                                        }
                                      }}
                                      className="relative w-full overflow-hidden group cursor-pointer -mx-0.5"
                                      style={{ padding: "3px" }}
                                    >
                                      <div className="relative w-full overflow-hidden">
                                        <ImageWidget
                                          src={getS3Url(image.url)}
                                          alt={imageAlt}
                                          width={600}
                                          height={800}
                                          className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                          loading="lazy"
                                          sizes="(max-width: 640px) 100vw, 50vw"
                                        />
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </Masonry>
                          </ResponsiveMasonry>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {galleryImages.map(
                              (image: ImageData, index: number) => {
                                if (!image?.url) return null;
                                const imageAlt =
                                  image?.name || `Gallery ${index + 1}`;
                                return (
                                  // biome-ignore lint/a11y/useSemanticElements: div needed for grid layout
                                  <div
                                    key={`gallery-${image.id || index}`}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => openLightbox(index)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        openLightbox(index);
                                      }
                                    }}
                                    className="relative w-full overflow-hidden group cursor-pointer"
                                  >
                                    <div className="relative w-full overflow-hidden">
                                      <ImageWidget
                                        src={getS3Url(image.url)}
                                        alt={imageAlt}
                                        width={600}
                                        height={800}
                                        className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                      />
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </LightboxWidget>
                </div>
              </ScrollWidget>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyViewSection;
