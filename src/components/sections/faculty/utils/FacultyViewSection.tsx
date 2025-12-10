"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Dummy1, OrangeArrowRight } from "@/helpers/ImageHelper";

// TypeScript types based on the API response structure
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

interface FacultyPhotographyComponent {
  __component: "faculty.photography";
  id: number;
  Title: string;
  Heading: string;
  SubHeading: string;
  Description: string;
  Card: FacultyCard[];
}

type FacultyViewSectionData =
  | {
      Faculty?: FacultyPhotographyComponent[];
    }
  | FacultyPhotographyComponent[];

interface FacultyViewSectionProps {
  data: FacultyViewSectionData;
}

const FacultyViewSection = ({ data }: FacultyViewSectionProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const facultyArray = Array.isArray(data) ? data : data.Faculty || [];

  const facultyComponent = facultyArray[0];
  const facultyCard = facultyComponent?.Card?.[0];
  const viewCard = facultyCard?.ViewCard?.[0];

  const facultyName = facultyCard?.Title || "Faculty Member";
  const portraitImage = facultyCard?.Image;
  const biography =
    viewCard?.Description || facultyComponent?.Description || "";
  const galleryImages = viewCard?.Image || [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="flex flex-col sticky top-16 space-y-4  px-4 py-8 pb-0 md:pb-8 md:px-6 lg:px-8 xl:px-12 xl:pl-50 2xl:pl-58 2xl:pr-10 3xl:px-20 3xl:pl-74 pt-13">
            <h1 className="text-3xl font-urbanist text-[#E97451] xss:text-[24px] lg:text-[30px] 3xl:text-[40px] font-normal mb-6">
              {facultyName}
            </h1>

            <div className="relative w-full mb-6">
              <div className="space-y-4">
                {portraitImage ? (
                  <div className="relative w-full overflow-hidden">
                    <ImageWidget
                      src={
                        portraitImage.url ? getS3Url(portraitImage.url) : Dummy1
                      }
                      alt={portraitImage.name || "Faculty Image"}
                      width={800}
                      height={1200}
                      className="object-cover w-full h-auto xss:h-[361px] xss:w-[361px] sm:w-full sm:h-auto"
                    />
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Faculty Image"
                      width={800}
                      height={1200}
                      className="object-cover w-full h-auto xss:h-[361px] xss:w-[361px] sm:w-full sm:h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="flex gap-4 w-full bg-[#E97451]/20 rounded-full p-1.5">
                <button
                  type="button"
                  className={`flex items-center rounded-full justify-center h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all `}
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
                  className={`flex items-center rounded-full justify-center h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all
                    `}
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
            {biography && (
              <div className="mb-8">
                <HTMLWidget
                  content={biography}
                  className="prose prose-sm md:prose-base max-w-none font-mulish text-sm xss:text-[16px] sm:text-base lg:text-[15px] 2xl:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal"
                />
              </div>
            )}

            <div className="mb-8">
              {/* <LinkWidget
                href="https://www.behance.net/aneevrao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
              >
                <DribbbleIcon className="w-4 h-4 text-[#E97451]" />
                <span className="text-sm md:text-base 3xl:text-[20px] font-urbanist font-normal">
                  https://www.behance.net/aneevrao
                </span>
              </LinkWidget> */}
            </div>

            {galleryImages.length > 0 && (
              <div className="mt-auto">
                {isMounted ? (
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{
                      350: 1,
                      640: 2,
                    }}
                  >
                    <Masonry gutter="24px">
                      {galleryImages.map((image: ImageData, index: number) => {
                        const imageUrl = image?.url
                          ? getS3Url(image.url)
                          : Dummy1;
                        const imageAlt = image?.name || `Gallery ${index + 1}`;
                        return (
                          <div
                            key={`gallery-${image.id || index}`}
                            className="relative w-full overflow-hidden group cursor-pointer -mx-0.5"
                            style={{ padding: "3px" }}
                          >
                            <div className="relative w-full overflow-hidden">
                              <ImageWidget
                                src={imageUrl}
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
                      })}
                    </Masonry>
                  </ResponsiveMasonry>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {galleryImages.map((image: ImageData, index: number) => {
                      const imageUrl = image?.url
                        ? getS3Url(image.url)
                        : Dummy1;
                      const imageAlt = image?.name || `Gallery ${index + 1}`;
                      return (
                        <div
                          key={`gallery-${image.id || index}`}
                          className="relative w-full overflow-hidden group cursor-pointer"
                        >
                          <div className="relative w-full overflow-hidden">
                            <ImageWidget
                              src={imageUrl}
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
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyViewSection;
