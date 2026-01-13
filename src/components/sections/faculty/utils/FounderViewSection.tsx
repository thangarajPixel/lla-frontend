"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { OrangeArrowRight, Website } from "@/helpers/ImageHelper";

interface ImageData {
  id: number;
  name: string;
  url: string;
}

interface DescriptionBlock {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

interface ViewCard {
  id: number;
  Link: string;
  Image: ImageData[];
}

interface FounderCard {
  id: number;
  Heading: string;
  Description: DescriptionBlock[];
  Btn_txt: string;
  Slug: string;
  Image: ImageData;
  ViewCard: ViewCard;
}

interface FounderComponent {
  __component: "about.founder";
  id: number;
  Title: string;
  Heading: string;
  SubHeading: string;
  Founder_card: FounderCard[];
}

interface FounderViewSectionProps {
  data: FounderComponent;
}

const FounderViewSection = ({ data }: FounderViewSectionProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const founderCard = data.Founder_card[0];
  const founderName = founderCard?.Heading;
  const portraitImage = founderCard?.Image;
  const viewCard = founderCard?.ViewCard;
  const portfolioLink = viewCard?.Link;
  const biography = founderCard?.Description?.map((block) =>
    block.children?.map((child) => child.text).join(""),
  ).join("<br><br>");

  const galleryImages: ImageData[] = viewCard?.Image;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  if (!data || !data.Founder_card || data.Founder_card.length === 0) {
    return null;
  }

  return (
    <>
      {/* Back button - optimized spacing and alignment */}
      <div className="px-4 pt-4 pb-2 md:fixed md:top-25 2xl:top-28 md:left-auto md:right-5 md:z-50 md:p-0">
        <ButtonWidget
          onClick={() => router.back()}
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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex flex-col sticky top-16 space-y-4 px-4 py-4 pb-0 md:pb-8 md:px-6 lg:px-8 xl:px-12 pl-4 sm:pl-10 lg:pl-25 xl:pl-52 2xl:pl-70 2xl:pr-10 3xl:px-20 3xl:pl-74 md:pt-13">
            {founderName && (
              <h1 className="text-3xl font-urbanist text-[#E97451] xss:text-[24px] lg:text-[30px] 3xl:text-[40px] font-normal mb-6">
                {founderName}
              </h1>
            )}

            {portraitImage?.url && (
              <div className="relative w-full mb-6">
                <div className="space-y-4">
                  <div className="relative w-full overflow-hidden">
                    <ImageWidget
                      src={getS3Url(portraitImage.url)}
                      alt={portraitImage.name || founderName}
                      width={520}
                      height={700}
                      className="object-cover w-[360px] h-[480px] xs:w-[420px] xs:h-[530px] sm:w-[400px] sm:h-[500px] md:w-[340px] md:h-[460px]  lg:w-[361px] lg:h-[484px]  xl:w-[361px] xl:h-[484px]  2xl:w-[420px] 2xl:h-[560px] 3xl:w-[410px] 3xl:h-[549px] 4xl:w-[450px] 4xl:h-[600px] "
                    />
                  </div>
                </div>
              </div>
            )}
            {portfolioLink && (
              <div className="mb-8 flex items-center gap-2">
                <ImageWidget
                  src={Website}
                  alt="Icon"
                  width={30}
                  height={30}
                  className="object-cover "
                />
                <a
                  href={
                    portfolioLink.startsWith("http")
                      ? portfolioLink
                      : `https://${portfolioLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm md:text-base 3xl:text-[20px] font-urbanist font-normal text-[#E97451]">
                    {portfolioLink}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-[#E97451]/20 md:pt-13">
          <div className="flex flex-col justify-center px-4 py-8 pb-4 md:pb-8 md:px-4 md:py-12 lg:px-6 lg:py-13.5 xl:px-10 xl:pr-50 2xl:pr-58 3xl:pr-74 3xl:py-13.5">
            {biography && (
              <div className="mb-8">
                <HTMLWidget
                  content={biography}
                  className="font-mulish text-[16px] md:text-[17px] 2xl:text-[18px] font-normal text-black leading-[26px]"
                />
              </div>
            )}
            {galleryImages && galleryImages.length > 0 && (
              <div className="mt-auto">
                {isMounted ? (
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{
                      350: 1,
                      768: 1,
                      1024: 2,
                    }}
                  >
                    <Masonry gutter="32px">
                      {galleryImages.map((image: ImageData, index: number) => {
                        if (!image?.url) return null;
                        const imageUrl = getS3Url(image.url);
                        const imageAlt =
                          image?.name || `${founderName} Gallery ${index + 1}`;
                        return (
                          <div
                            key={`gallery-${image.id || index}`}
                            aria-hidden
                            className="relative w-full overflow-hidden group cursor-pointer"
                            onClick={() => setSelectedImage(imageUrl)}
                          >
                            <div className="relative w-full aspect-auto overflow-hidden">
                              <ImageWidget
                                src={imageUrl}
                                alt={imageAlt}
                                width={800}
                                height={600}
                                className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </Masonry>
                  </ResponsiveMasonry>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {galleryImages.map((image: ImageData, index: number) => {
                      if (!image?.url) return null;
                      const imageUrl = getS3Url(image.url);
                      const imageAlt =
                        image?.name || `${founderName} Gallery ${index + 1}`;
                      return (
                        <div
                          key={`gallery-${image.id || index}`}
                          aria-hidden
                          className="relative w-full overflow-hidden group cursor-pointer"
                          onClick={() => setSelectedImage(imageUrl)}
                        >
                          <div className="relative w-full aspect-auto overflow-hidden rounded-lg">
                            <ImageWidget
                              src={imageUrl}
                              alt={imageAlt}
                              width={800}
                              height={600}
                              className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div
          aria-hidden
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
              aria-label="Close image"
            >
              ×
            </button>
            <ImageWidget
              src={selectedImage}
              alt="Full size gallery image"
              width={1200}
              height={800}
              className="object-contain max-w-full max-h-[75vh] md:max-h-[90vh] w-auto h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FounderViewSection;
