"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Dummy1 } from "@/helpers/ImageHelper";
import type { ImageData, MenuData } from "./types";

const OverviewSection = ({ data }: { data: MenuData }) => {
  const aboutImages: ImageData[] = data.Image ? data.Image : [];
  const [currentIndices, setCurrentIndices] = useState([0, 1, 2]);
  const [variant, setVariant] = useState<"default" | "variant-2" | "variant-3">(
    "default",
  );

  useEffect(() => {
    if (aboutImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndices((prev) => {
        const maxIndex = Math.max(0, aboutImages.length - 1);

        return [
          Math.min(prev[0], maxIndex),
          Math.min(prev[1], maxIndex),
          Math.min(prev[2], maxIndex),
        ];
      });

      setVariant((prev) => {
        if (prev === "default") return "variant-2";
        if (prev === "variant-2") return "variant-3";
        return "default";
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [aboutImages.length]);

  const getImageUrl = (index: number) => {
    if (aboutImages[index]) {
      return getS3Url(aboutImages[index].url);
    }
    return Dummy1;
  };
  const [emblaRef] = useEmblaCarousel(
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
    <section className="w-full bg-white flex flex-col items-center justify-center relative  py-10 sm:py-30 3xl:py-35">
      <ContainerWidget>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-2.5 2xl:gap-5 3xl:gap-[30px]">
          <div className="flex flex-col gap-4.5 md:-mt-15">
            <div className="self-start">
              <ButtonWidget
                className="text-[20px] xss:text-[16px] p-5 3xl:text-[24px] 
              font-mulish w-full rounded-full bg-[#E97451]/20 
              border border-[#E97451] text-black hover:bg-[#E97451]/20"
              >
                {data.Duration}
              </ButtonWidget>
            </div>
            <HTMLWidget
              content={data.Title}
              tag="h2"
              className="font-urbanist font-normal text-[23px] leading-10 sxx:leading-8 
            xss:text-[32px] md:leading-12 sm:text-5xl 3xl:text-[64px]
             text-black 2xxl:leading-16"
            />

            <div className="block xl:hidden w-full overflow-hidden mt-4 sm:mt-6">
              <div
                ref={emblaRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-3 sm:gap-4">
                  {aboutImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative flex-[0_0_80vw] sm:flex-[0_0_75vw] min-w-0 overflow-hidden"
                    >
                      <ImageWidget
                        src={getS3Url(image.url)}
                        alt={image.name}
                        width={361}
                        height={358}
                        className="object-cover object-right w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {data?.Description && (
              <HTMLWidget
                content={data.Description}
                tag="p"
                className="text-[16px] lg:text-[17px] 3xl:text-[18px] font-normal text-black leading-normal max-w-full"
              />
            )}
            {data.Btn_txt && (
              <div className="self-start">
                <LinkWidget href="/admission" className="w-full">
                  <OrangeButtonWidget content={data.Btn_txt} />
                </LinkWidget>
              </div>
            )}
          </div>
          <ScrollWidget delay={0.1} animation="fadeUp">
            <div className="hidden xl:block">
              <div
                className={`frame-39 property-1-${variant} relative h-[650px] -mt-10 box-border`}
              >
                {aboutImages[currentIndices[0]] && (
                  <div
                    className={`rectangle-79 absolute object-cover transition-all duration-500 ${
                      variant === "variant-2"
                        ? "opacity-50 xl:w-[250px] xl:h-[270px] xl:left-[360px] 2xl:w-[300px] 2xl:h-[322px] 2xl:left-[440px] top-0 z-10 3xl:w-[396px] 3xl:h-[392px] 3xl:left-[520px] 3xl:top-6"
                        : variant === "variant-3"
                          ? "xl:w-[400px] xl:h-[390px] xl:top-20 2xl:w-[500px] 2xl:h-[494px] 2xl:top-[90px] left-0 top-[65px] z-20 3xl:w-[630px] 3xl:h-[624px] 3xl:top-[104px]"
                          : "opacity-50 xl:w-[300px] xl:h-[300px] xl:left-[180px] xl:top-[286px] 2xl:w-[344px] 2xl:h-[340px] 2xl:left-[300px] 2xl:top-[336px] z-10 3xl:w-[444px] 3xl:left-[330px] 3xl:h-[440px] 3xl:top-[436px]"
                    }`}
                  >
                    <ImageWidget
                      src={getImageUrl(currentIndices[0])}
                      alt={aboutImages[currentIndices[0]].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {aboutImages[currentIndices[1]] && (
                  <div
                    className={`rectangle-80 absolute object-cover transition-all duration-500 ${
                      variant === "variant-2"
                        ? "xl:w-[400px] xl:h-[390px] xl:top-20 2xl:w-[500px] 2xl:h-[494px] 2xl:top-[90px] left-0 top-[65px] z-20 3xl:w-[630px] 3xl:h-[624px] 3xl:top-[104px]"
                        : variant === "variant-3"
                          ? "opacity-50 xl:w-[300px] xl:h-[300px] xl:left-[180px] xl:top-[286px] 2xl:w-[344px] 2xl:h-[340px] 2xl:left-[300px] 2xl:top-[336px] z-10 3xl:w-[444px] 3xl:left-[330px] 3xl:h-[440px] 3xl:top-[436px]"
                          : "opacity-50 xl:w-[250px] xl:h-[270px] xl:left-[360px] 2xl:w-[300px] 2xl:h-[322px] 2xl:left-[440px] top-0 z-10 3xl:w-[396px] 3xl:h-[392px] 3xl:left-[520px] 3xl:top-6"
                    }`}
                  >
                    <ImageWidget
                      src={getImageUrl(currentIndices[1])}
                      alt={aboutImages[currentIndices[1]].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {aboutImages[currentIndices[2]] && (
                  <div
                    className={`rectangle-78 absolute object-cover transition-all duration-500 ${
                      variant === "variant-2"
                        ? "opacity-50 xl:w-[300px] xl:h-[300px] xl:left-[180px] xl:top-[286px] 2xl:w-[344px] 2xl:h-[340px] 2xl:left-[300px] 2xl:top-[336px] z-10 3xl:w-[444px] 3xl:left-[330px] 3xl:h-[440px] 3xl:top-[436px]"
                        : variant === "variant-3"
                          ? "opacity-50 xl:w-[250px] xl:h-[270px] xl:left-[360px] 2xl:w-[300px] 2xl:h-[322px] 2xl:left-[440px] top-0 z-10 3xl:w-[396px] 3xl:h-[392px] 3xl:left-[520px] 3xl:top-6"
                          : "xl:w-[400px] xl:h-[390px] xl:top-20 2xl:w-[500px] 2xl:h-[494px] 2xl:top-[90px] left-0 top-[65px] z-20 3xl:w-[630px] 3xl:h-[624px] 3xl:top-[104px]"
                    }`}
                  >
                    <ImageWidget
                      src={getImageUrl(currentIndices[2])}
                      alt={aboutImages[currentIndices[2]].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default OverviewSection;
