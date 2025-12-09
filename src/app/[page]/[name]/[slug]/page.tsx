"use client";

import useEmblaCarousel from "embla-carousel-react";
import { DribbbleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import {
  Dummy1,
  Dummy2,
  Dummy3,
  OrangeArrowRight,
} from "@/helpers/ImageHelper";

const samplePortraitImages = [Dummy1, Dummy1, Dummy1];

const sampleGalleryImages = [
  { src: Dummy3, alt: "Gallery 1" },
  { src: Dummy1, alt: "Gallery 2" },
  { src: Dummy2, alt: "Gallery 3" },
  { src: Dummy1, alt: "Gallery 4" },
  { src: Dummy1, alt: "Gallery 5" },
  { src: Dummy3, alt: "Gallery 6" },
  { src: Dummy1, alt: "Gallery 7" },
  { src: Dummy1, alt: "Gallery 8" },
  { src: Dummy1, alt: "Gallery 9" },
];

const sampleBiography = `Taking a stroll through Parry’s Corner in Chennai on his 16th birthday, Aneev chanced upon an antique camera store. A couple of tantrums later, and with the promise of better exam results, he walked out with an old Olympus OM 10 and a slightly disgruntled father in tow. Three years later he enrolled into Light & Life Academy. After graduating in 2007, he spent some time working as a photo-editor in Bangalore and then decided to move to Mumbai.`;
const sampleBiography2 = `Aneev Rao is currently a portrait and fashion photographer. Aneev’s work has been featured in Vogue, Cosmopolitan, Marie Claire, Grazia, Harper’s Bazaar, People.`;

const View = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

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
              Aneev Rao
            </h1>

            <div className="relative w-full mb-6">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {samplePortraitImages.map((image, index) => (
                    <div
                      key={`portrait-${String(image)}-${index}`}
                      className="flex-[0_0_100%] min-w-0"
                    >
                      <div className="relative w-full overflow-hidden">
                        <ImageWidget
                          src={image}
                          alt={`Portrait ${index + 1}`}
                          width={800}
                          height={1200}
                          className="object-cover w-full h-auto xss:h-[361px] xss:w-[361px] sm:w-full sm:h-auto"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex gap-4 w-full bg-[#E97451]/20 rounded-full p-1.5">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className={`flex items-center rounded-full justify-center h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                    !canScrollPrev
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
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
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className={`flex items-center rounded-full justify-center h-12 flex-1 border-2 border-[#FFD4CC] bg-white transition-all ${
                    !canScrollNext
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
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
            <div className="mb-8">
              <div className="prose prose-sm md:prose-base max-w-none">
                <p className="font-mulish text-sm xss:text-[16px] sm:text-base lg:text-[15px] 2xl:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal">
                  {sampleBiography}
                </p>
                <p className="font-mulish text-sm xss:text-[16px] sm:text-base lg:text-[15px] 2xl:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal mt-3">
                  {sampleBiography2}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <LinkWidget
                href="https://www.behance.net/aneevrao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
              >
                <DribbbleIcon className="w-4 h-4 text-[#E97451]" />
                <span className="text-sm md:text-base 3xl:text-[20px] font-urbanist font-normal">
                  https://www.behance.net/aneevrao
                </span>
              </LinkWidget>
            </div>

            <div className="mt-auto">
              {isMounted ? (
                <ResponsiveMasonry
                  columnsCountBreakPoints={{
                    350: 1,
                    640: 2,
                  }}
                >
                  <Masonry gutter="24px">
                    {sampleGalleryImages.map((image, index) => (
                      <div
                        key={`${image.alt}-${index}`}
                        className="relative w-full overflow-hidden group cursor-pointer -mx-0.5"
                        style={{ padding: "3px" }}
                      >
                        <div className="relative w-full overflow-hidden">
                          <ImageWidget
                            src={image.src}
                            alt={image.alt}
                            width={600}
                            height={800}
                            className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sampleGalleryImages.map((image, index) => (
                    <div
                      key={`${image.alt}-${index}`}
                      className="relative w-full overflow-hidden group cursor-pointer"
                    >
                      <div className="relative w-full overflow-hidden">
                        <ImageWidget
                          src={image.src}
                          alt={image.alt}
                          width={600}
                          height={800}
                          className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
