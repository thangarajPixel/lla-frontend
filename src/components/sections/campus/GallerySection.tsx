"use client";

import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { getS3Url, splitIntoTwoArrays } from "@/helpers/ConstantHelper";
import type { GallerySectionProps } from "./utils/campus";

const GallertSection = ({ data }: GallerySectionProps) => {
  const galleryImages = data.Image || [];

  const imageChunks = useMemo(() => {
    return splitIntoTwoArrays(galleryImages);
  }, [galleryImages]);

  if (galleryImages.length === 0) return null;

  return (
    <section className="bg-[#ECECEC]">
      <div className="w-full py-8 md:py-12 lg:py-16 xl:py-24 2xl:py-24 3xl:py-38">
        <div className="flex flex-col gap-6 z-1 relative">
          <div className="flex flex-col justify-start items-start px-6 md:px-0 md:items-center gap-2">
            <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist mb-4">
              {data.Title}
            </h2>
            {data?.Heading && (
              <HTMLWidget
                content={data?.Heading}
                tag="p"
                className="font-mulish text-left md:text-center relative md:max-w-[800px]"
              />
            )}
            <div className="my-4 text-left lg:text-center">
              <LinkWidget href="/nilgiris" className="w-full">
                <OrangeButtonWidget content={data.Btn_txt || "View More"} />
              </LinkWidget>
            </div>
          </div>
          <div className="space-y-6 overflow-hidden">
            {imageChunks[0] && imageChunks[0].length > 0 && (
              <Marquee direction="right" speed={50} pauseOnHover>
                {imageChunks[0].map((image) => (
                  <div
                    key={`row1-${image.id}`}
                    className="relative min-w-[250px] max-w-[250px] 3xl:min-w-[300px] 3xl:max-w-[300px] aspect-square overflow-hidden mx-3 shrink-0"
                  >
                    <ImageWidget
                      src={getS3Url(image.url)}
                      alt={image.name || "Gallery"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </Marquee>
            )}
            {imageChunks[1] && imageChunks[1].length > 0 && (
              <Marquee direction="left" speed={50} pauseOnHover>
                {imageChunks[1].map((image) => (
                  <div
                    key={`row2-${image.id}`}
                    className="relative min-w-[250px] max-w-[250px] 3xl:min-w-[300px] 3xl:max-w-[300px] aspect-square overflow-hidden mx-3 shrink-0"
                  >
                    <ImageWidget
                      src={getS3Url(image.url)}
                      alt={image.name || "Gallery"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </Marquee>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallertSection;
