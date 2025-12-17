"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useState } from "react";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import { getS3Url, splitIntoTwoArrays } from "@/helpers/ConstantHelper";
import {
  Dummy3,
  Dummy4,
  Dummy5,
  Dummy6,
  Dummy7,
  Dummy8,
  Dummy9,
  Dummy10,
} from "@/helpers/ImageHelper";
import type { GallerySectionProps } from "./utils/campus";

const GallertSection = ({ data }: GallerySectionProps) => {
  const verticalImages = data.Vertical_Image || [];
  const galleryImages = data.Image || [];

  const imageChunks = useMemo(() => {
    return splitIntoTwoArrays(galleryImages);
  }, [galleryImages]);

  const [randomIndices, setRandomIndices] = useState<number[]>(() => {
    return Array.from({ length: 9 }, (_, i) => i);
  });

  const [randomVerticalImageIndex, setRandomVerticalImageIndex] =
    useState<number>(0);

  useEffect(() => {
    const initializeIndices = () => {
      if (galleryImages.length > 9) {
        const shuffled = [...galleryImages]
          .map((_, index) => index)
          .sort(() => Math.random() - 0.5);
        setRandomIndices(shuffled.slice(0, 9));
      } else {
        setRandomIndices(
          Array.from(
            { length: Math.min(9, galleryImages.length) },
            (_, i) => i,
          ),
        );
      }
    };

    initializeIndices();

    const changeOneImage = () => {
      if (galleryImages.length === 0) return;

      setRandomIndices((prevIndices) => {
        const newIndices = [...prevIndices];
        const randomPosition = Math.floor(Math.random() * 9);

        const availableIndices = Array.from(
          { length: galleryImages.length },
          (_, i) => i,
        ).filter((index) => !prevIndices.includes(index));

        let randomImageIndex: number;
        if (availableIndices.length > 0) {
          randomImageIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
        } else {
          randomImageIndex = Math.floor(Math.random() * galleryImages.length);
        }

        newIndices[randomPosition] = randomImageIndex;
        return newIndices;
      });
    };

    const interval = setInterval(changeOneImage, 1000);

    return () => clearInterval(interval);
  }, [galleryImages]);

  useEffect(() => {
    if (verticalImages.length === 0) return;

    const initializeVerticalImage = () => {
      const randomIndex = Math.floor(Math.random() * verticalImages.length);
      setRandomVerticalImageIndex(randomIndex);
    };

    initializeVerticalImage();

    const changeVerticalImage = () => {
      if (verticalImages.length === 0) return;
      const randomIndex = Math.floor(Math.random() * verticalImages.length);
      setRandomVerticalImageIndex(randomIndex);
    };

    const interval = setInterval(changeVerticalImage, 2000);

    return () => clearInterval(interval);
  }, [verticalImages]);

  const getImageUrl = (position: number) => {
    const actualIndex = randomIndices[position] ?? position;
    if (galleryImages[actualIndex]) {
      return getS3Url(galleryImages[actualIndex].url);
    }
    const fallbackImages = [
      Dummy3,
      Dummy4,
      Dummy5,
      Dummy6,
      Dummy7,
      Dummy8,
      Dummy9,
      Dummy10,
    ];
    return fallbackImages[position % fallbackImages.length];
  };

  const getVerticalImageUrl = () => {
    if (verticalImages[randomVerticalImageIndex]) {
      return getS3Url(verticalImages[randomVerticalImageIndex].url);
    }
    return "";
  };

  const [emblaRef1] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: true,
      dragFree: false,
      direction: "rtl",
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const [emblaRef2] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: true,
      dragFree: false,
      direction: "ltr",
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  if (data?.Image?.length === 0) return null;
  return (
    <section className="bg-[#ECECEC]">
      <div className="w-full py-8 md:py-12 lg:py-16 xl:py-24 2xl:py-24 3xl:py-38 max-w-[1920px] mx-auto lg:w-[90vw]">
        <div className="mb-6 md:hidden text-left px-5 lg:text-center lg:pl-0">
          <h2 className="text-3xl xss:text-[32px] font-normal text-black font-urbanist mb-2">
            {data.Title}
          </h2>
          {data?.Heading && <HTMLWidget content={data?.Heading} tag="p" />}
          <div className="mt-6 text-left lg:text-center md:hidden">
            <LinkWidget href="/gallery" className="w-full">
              <OrangeButtonWidget content={data.Btn_txt || "View More"} />
            </LinkWidget>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-5 gap-6 3xl:gap-0">
          <div className="flex flex-col gap-6 mt-[50px]">
            <ParallaxWidget speed={7}>
              <div className="relative w-full aspect-4/3 mb-6 3xl:mb-11 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(0)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(1)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
            </ParallaxWidget>
          </div>
          <div className="flex flex-col gap-6 mt-[350px] z-5 relative">
            <ParallaxWidget speed={4}>
              <div className="relative w-full aspect-4/3 mb-6 3xl:mb-11 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(2)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(3)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
            </ParallaxWidget>
          </div>
          <div className="flex flex-col gap-6 z-1 relative">
            <div className="flex flex-col justify-end  items-center gap-2">
              <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist mb-6">
                {data.Title || "Gallery"}
              </h2>
              {data?.Heading && (
                <HTMLWidget
                  content={data?.Heading}
                  tag="p"
                  className="font-mulish text-center relative min-w-[500px]"
                />
              )}
              <div className="mt-6 text-left lg:text-center">
                <LinkWidget href="/nilgiris" className="w-full">
                  <OrangeButtonWidget content={data.Btn_txt || "View More"} />
                </LinkWidget>
              </div>
            </div>
            <div className="relative w-full aspect-2/3 mt-20 overflow-hidden">
              <ImageWidget
                src={getVerticalImageUrl()}
                alt="Gallery"
                fill
                className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-[350px] z-5 relative">
            <ParallaxWidget speed={4}>
              <div className="relative w-full aspect-4/3 mb-6 3xl:mb-11 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(4)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(5)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
            </ParallaxWidget>
          </div>
          <div className="flex flex-col gap-6 mt-[50px]">
            <ParallaxWidget speed={7}>
              <div className="relative w-full aspect-4/3 mb-6 3xl:mb-11 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(6)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <ImageWidget
                  src={getImageUrl(8)}
                  alt="Gallery"
                  fill
                  className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                />
              </div>
            </ParallaxWidget>
          </div>
        </div>

        <div className="lg:hidden space-y-4 overflow-hidden">
          <div className="relative overflow-hidden">
            <div
              ref={emblaRef1}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              dir="rtl"
            >
              <div className="flex gap-4 touch-pan-x pl-5 pr-5">
                {imageChunks[0]?.map((image) => (
                  <div
                    key={`row1-${image.id}`}
                    className="relative flex-[0_0_45vw] aspect-square overflow-hidden min-w-0"
                  >
                    <ImageWidget
                      src={getS3Url(image.url)}
                      alt={image.name || "Gallery"}
                      fill
                      className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={emblaRef2}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              dir="ltr"
            >
              <div className="flex gap-4 touch-pan-x pl-5 pr-5">
                {imageChunks[1]?.map((image) => (
                  <div
                    key={`row2-${image.id}`}
                    className="relative flex-[0_0_45vw] aspect-square overflow-hidden min-w-0"
                  >
                    <ImageWidget
                      src={getS3Url(image.url)}
                      alt={image.name || "Gallery"}
                      fill
                      className="object-cover 3xl:max-w-[300px] 3xl:max-h-[300px] 3xl:min-w-[300px] 3xl:min-h-[300px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallertSection;
