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

interface TeamCard {
  id: number;
  Title: string;
  Description: string;
  Btn_txt: string;
  LongDescription: string | null;
  Btn_txt2: string | null;
  Url: string | null;
  Slug: string;
  Image: ImageData[];
}

interface TeamComponent {
  __component: "about.team";
  id: number;
  Title: string;
  Heading: string;
  Card: TeamCard[];
}

interface TeamViewSectionData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  about: TeamComponent[];
  pagination: {
    page: number;
    pageSize: number;
    totalCards: number;
    totalPages: number;
  };
}

interface ApiResponse {
  data: TeamViewSectionData;
}

interface TeamViewSectionProps {
  data: TeamViewSectionData | ApiResponse;
}

const TeamViewSection = ({ data }: TeamViewSectionProps) => {
  console.log("TeamViewSection data:", data);
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  // Helper function to extract data from either format
  const extractData = (inputData: TeamViewSectionData | ApiResponse): TeamViewSectionData => {
    return 'data' in inputData ? inputData.data : inputData;
  };
  
  const [currentData, setCurrentData] = useState<TeamViewSectionData>(extractData(data));
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const slug = pathname.split("/").pop() || "";

  const teamComponent = currentData?.about?.[0];
  const teamCard = teamComponent?.Card?.[0];
  const currentPage = currentData?.pagination?.page || 1;
  const totalPages = currentData?.pagination?.totalPages || 1;

  const memberName = teamCard?.Title || "Team Member";
  const portraitImage = teamCard?.Image?.[0];
  const biography = teamCard?.LongDescription || teamCard?.Description || "";
  const galleryImages = teamCard?.Image || [];

  console.log("Team Component:", teamComponent);
  console.log("Team Card:", teamCard);
  console.log("Member Name:", memberName);
  console.log("Portrait Image:", portraitImage);
  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);

  const lightboxImages = galleryImages
    .filter((image) => image?.url)
    .map((image) => ({
      src: getS3Url(image.url),
      alt: image?.name || "Team Member Image",
    }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentData(extractData(data));
  }, [data]);

  const fetchTeamData = async (page: number) => {
    if (!slug || isLoading) return;

    setIsLoading(true);
    try {
      const response = await clientAxios.get(
        `/about/team/${slug}?page=${page}`,
      );
      const responseData = response.data;
      console.log("API Response:", responseData);
      if (responseData) {
        const extractedData = extractData(responseData);
        setCurrentData(extractedData);
        setAnimationKey((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchTeamData(currentPage - 1);
    }
  };

  const handleNext = () => {
    fetchTeamData(currentPage + 1);
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="flex justify-end mb-6 fixed top-25 right-5">
          <ButtonWidget
            onClick={() => router.back()}
            type="button"
            className="orange-button-white flex border-none items-center gap-2 rounded-[60px] px-5 h-10 text-sm md:text-base font-bold transition-colors duration-300 font-mulish text-[15px] 3xl:text-[18px]"
            aria-label="Go back"
          >
            <ImageWidget
              src={OrangeArrowRight}
              alt="Back"
              className="w-5 h-5"
            />
            <span className="text-[#E97451]">Back</span>
          </ButtonWidget>
        </div>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-[2.5fr_3fr]">
        <div className="flex flex-col">
          <div className="flex flex-col sticky top-16 space-y-4  px-4 py-8 pb-0 md:pb-8 md:px-6 lg:px-8 xl:px-12 xl:pl-50 2xl:pl-58 2xl:pr-10 3xl:px-20 3xl:pl-74 pt-13">
            <ScrollWidget
              key={`title-${animationKey}`}
              animation="fadeUp"
              delay={0.1}
            >
              <h1 className="text-3xl font-urbanist text-[#E97451] xss:text-[24px] lg:text-[30px] 3xl:text-[40px] font-normal mb-6">
                {memberName}
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
                        alt={portraitImage.name || "Team Member Image"}
                        width={800}
                        height={1200}
                        className="object-cover w-full h-auto xss:h-[361px] xss:w-[361px] sm:w-full sm:h-auto"
                      />
                    </div>
                  </ScrollWidget>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="flex gap-4 w-full bg-[#E97451]/20 rounded-full p-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPage <= 1 || isLoading}
                  className={`flex items-center rounded-full justify-center h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                    currentPage <= 1 || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-[#FFD4CC]"
                  }`}
                  aria-label="Previous portrait"
                >
                  <ImageWidget
                    src={OrangeArrowRight}
                    alt="Previous"
                    className="w-5 h-5"
                  />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage >= 4 || isLoading}
                  className={`flex items-center rounded-full justify-center h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                    currentPage >= 4 || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-[#FFD4CC]"
                  }`}
                  aria-label="Next portrait"
                >
                  <ImageWidget
                    src={OrangeArrowRight}
                    alt="Next"
                    className="w-5 h-5 rotate-180"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#E97451]/20 md:pt-13 ">
          <div className="flex flex-col justify-center px-4 py-8 pb-4 md:pb-8 md:px-4 md:py-12 lg:px-6 lg:py-15 xl:px-10 xl:pr-50 2xl:pr-58 3xl:pr-74 3xl:py-15">
            {/* {teamCard.Description && (
              <ScrollWidget
                key={`description-${animationKey}`}
                animation="fadeUp"
                delay={0.4}
              >
                <div className="mb-8">
                  <HTMLWidget
                    content={teamCard?.Description || ""}
                    className="prose prose-sm md:prose-base max-w-none font-mulish text-sm xss:text-[16px] sm:text-base lg:text-[32px] 2xl:text-[32px] 3xl:text-[32px] font-normal text-black leading-normal"
                  />
                </div>
              </ScrollWidget>
            )} */}

          
            {biography && (
              <ScrollWidget
                key={`biography-${animationKey}`}
                animation="fadeUp"
                delay={0.5}
              >
                <div className="mb-8">
                  <HTMLWidget
                    content={biography}
                    className="prose prose-sm md:prose-base max-w-none font-mulish text-sm xss:text-[16px] sm:text-base lg:text-[15px] 2xl:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal"
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

export default TeamViewSection;
