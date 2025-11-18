"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
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

const GallertSection = () => {
  const imageArray = [
    Dummy3,
    Dummy4,
    Dummy5,
    Dummy6,
    Dummy7,
    Dummy8,
    Dummy9,
    Dummy10,
  ];

  const galleryImages = Array(8)
    .fill(null)
    .map((_, idx) => ({
      id: `gallery-${idx}`,
      src: imageArray[idx],
    }));

  const [emblaRef1] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: false,
      dragFree: false,
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
      loop: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-24 2xl:py-24 3xl:py-38 max-w-[1920px] mx-auto lg:w-[90vw]">
      <div className="mb-6 md:hidden text-left pl-5 lg:text-center lg:pl-0">
        <h2 className="text-3xl font-normal text-black font-urbanist mb-2">
          Gallery
        </h2>
        <p className="font-area-variable font-semibold text-base text-black">
          From LLA to <span className="text-[#E97451] ml-2">the world</span>
        </p>
        <div className="mt-6 text-left lg:text-center md:hidden">
          <OrangeButtonWidget content="View More" />
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-5 gap-6">
        <div className="flex flex-col gap-6 mt-[50px]">
          <ParallaxWidget speed={7}>
            <ImageWidget
              src={Dummy3}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover mb-6"
            />
            <ImageWidget
              src={Dummy4}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover"
            />
          </ParallaxWidget>
        </div>
        <div className="flex flex-col gap-6 mt-[350px]">
          <ParallaxWidget speed={4}>
            <ImageWidget
              src={Dummy5}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover mb-6"
            />
            <ImageWidget
              src={Dummy6}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover"
            />
          </ParallaxWidget>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-end items-center gap-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
              Gallery
            </h2>
            <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              From LLA to
            </p>
            <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              <span className="text-[#E97451] ml-2">the world</span>
            </p>
            <div className="mt-6 text-left lg:text-center">
              <OrangeButtonWidget content="View More" />
            </div>
          </div>
          <div className="">
            <ImageWidget
              src={Dummy10}
              alt="Gallery"
              className="w-full min-h-[350px] mt-20 max-h-[250px] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-[350px]">
          <ParallaxWidget speed={4}>
            <ImageWidget
              src={Dummy8}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover mb-6"
            />
            <ImageWidget
              src={Dummy9}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover"
            />
          </ParallaxWidget>
        </div>
        <div className="flex flex-col gap-6 mt-[50px]">
          <ParallaxWidget speed={7}>
            <ImageWidget
              src={Dummy7}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover mb-6"
            />
            <ImageWidget
              src={Dummy3}
              alt="Gallery"
              className="w-full max-h-[250px] object-cover"
            />
          </ParallaxWidget>
        </div>
      </div>

      <div className="lg:hidden space-y-4 overflow-hidden">
        <div className="relative overflow-hidden">
          <div
            ref={emblaRef1}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-4 touch-pan-x">
              {galleryImages.map((item) => (
                <div
                  key={`row1-${item.id}`}
                  className="relative flex-[0_0_45vw] aspect-square overflow-hidden min-w-0"
                >
                  <ImageWidget
                    src={item.src}
                    alt="Gallery"
                    fill
                    className="object-cover"
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
          >
            <div className="flex gap-4 touch-pan-x">
              {galleryImages.map((item) => (
                <div
                  key={`row2-${item.id}`}
                  className="relative flex-[0_0_45vw] aspect-square overflow-hidden min-w-0"
                >
                  <ImageWidget
                    src={item.src}
                    alt="Gallery"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallertSection;
