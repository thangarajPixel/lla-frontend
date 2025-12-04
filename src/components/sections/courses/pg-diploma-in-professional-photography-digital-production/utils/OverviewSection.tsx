"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Dummy1 } from "@/helpers/ImageHelper";

const staticData = {
  Heading: "PG Diploma in Professional",
  SubHeading: "Photography & Digital Production",
  Description:
    "The communication landscape has undergone a profound transformation – a surge in visual content - both photography and videography. In this evolving reality, there is a growing need for talent, proficient in both photography and video and capable of creating exceptional communication pieces. Recognising this demand, Light & Life Academy has crafted a course aligned with current industry expectations.",
  SubDescription:
    "Graduates of this course will go beyond creating high-end professional images and will be capable of creating an entire gamut of visual assets for different mediums, from still images for various platforms to videos for social media.",
  Btn_txt: "Get In Touch",
  Image: [
    {
      id: 1,
      name: "Course Image 1",
      url: "/uploads/Ajit_SN_1_e1951838fa.png",
    },
    {
      id: 2,
      name: "Course Image 2",
      url: "/uploads/Rectangle_47_1_0683982b42.png",
    },
    {
      id: 3,
      name: "Course Image 3",
      url: "/uploads/Rectangle_48_f12d80e4ad.png",
    },
  ],
};

const OverviewSection = () => {
  const data = staticData;
  const aboutImages = data.Image || [];
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
    <section className="w-full bg-white flex flex-col items-center justify-center z-40 relative pt-30 py-10 sm:py-20 sm:pt-30 3xl:h-[1048px]">
      <ContainerWidget>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-0">
          <div className="flex flex-col gap-4.5 justify-center md:-mt-15">
            <div className="self-start">
              <ButtonWidget className="text-[20px] p-5 3xl:text-[24px] font-mulish w-full rounded-full bg-[#E97451]/20 border border-[#E97451] text-black hover:bg-[#E97451]/20">
                Duration1 Year
              </ButtonWidget>
            </div>
            <p className="font-urbanist font-normal text-[30px] leading-14 xss:text-[34px] sm:text-5xl 3xl:text-[64px] text-black">
              {data.Heading}
              {data.SubHeading && (
                <>
                  <br className="hidden sm:block" />
                  <span className="text-[#E97451] ml-2 sm:ml-0">
                    {data.SubHeading}
                  </span>
                </>
              )}
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[400px]">
              {data.Description ||
                "In thought, in learning, and in spirit, what began as Iqbal Mohamed's dream to establish India's first professional photography institute has grown into a community that continues to explore, question, and create with purpose."}
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[400px]">
              {data.SubDescription ||
                "Graduates of this course will go beyond creating high-end professional images and will be capable of creating an entire gamut of visual assets for different mediums, from still images for various platforms to videos for social media."}
            </p>
            <div className="self-start">
              <LinkWidget href="/admission" className="w-full">
                <OrangeButtonWidget content={data.Btn_txt || "Apply Now"} />
              </LinkWidget>
            </div>
          </div>
          <ScrollWidget delay={0.1} animation="fadeUp">
            <div className="hidden xl:block 3xl:ml-30">
              <div
                className={`frame-39 property-1-${variant} relative h-[650px] -mt-10 box-border`}
              >
                {aboutImages[currentIndices[0]] && (
                  <div
                    className={`rectangle-79 absolute object-cover transition-all duration-500 ${
                      variant === "variant-2"
                        ? "opacity-50 xl:w-[250px] xl:h-[250px] xl:left-[280px] 2xl:w-[300px] 2xl:h-[300px] 2xl:left-[330px] top-0 z-10 3xl:w-[410px] 3xl:h-[271px] 3xl:left-[280px]"
                        : variant === "variant-3"
                          ? "xl:w-[420px] xl:h-[420px] 2xl:w-[500px] 2xl:h-[500px] left-0 top-[65px] z-20 3xl:w-[740px] 3xl:h-[493px] 3xl:left-[-140px]"
                          : "opacity-50 xl:w-[300px] xl:h-[300px] xl:left-[180px] 2xl:w-[350px] 2xl:h-[350px] 2xl:left-[210px] top-[260px] z-10 3xl:w-[541px] 3xl:h-[360px] 3xl:top-[380px]"
                    }`}
                  >
                    <ImageWidget
                      src={getImageUrl(currentIndices[0])}
                      alt={aboutImages[currentIndices[0]].name || "About"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {aboutImages[currentIndices[1]] && (
                  <div
                    className={`rectangle-80 absolute object-cover transition-all duration-500 ${
                      variant === "variant-2"
                        ? "xl:w-[420px] xl:h-[420px] 2xl:w-[500px] 2xl:h-[500px] left-0 top-[65px] z-20 3xl:w-[740px] 3xl:h-[493px] 3xl:left-[-140px]"
                        : variant === "variant-3"
                          ? "opacity-50 xl:w-[300px] xl:h-[300px] xl:left-[180px] 2xl:w-[350px] 2xl:h-[350px] 2xl:left-[210px] top-[260px] z-10 3xl:w-[541px] 3xl:h-[360px] 3xl:top-[380px]"
                          : "opacity-50 xl:w-[250px] xl:h-[250px] xl:left-[280px] 2xl:w-[300px] 2xl:h-[300px] 2xl:left-[330px] top-0 z-10 3xl:w-[410px] 3xl:h-[271px] 3xl:left-[280px]"
                    }`}
                  >
                    <ImageWidget
                      src={getImageUrl(currentIndices[1])}
                      alt={aboutImages[currentIndices[1]].name || "About"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {aboutImages[currentIndices[2]] && (
                  <div
                    className={`rectangle-78 absolute object-cover transition-all duration-500 ${
                      variant === "variant-2"
                        ? "opacity-50 xl:w-[300px] xl:h-[300px] xl:left-[180px] 2xl:w-[350px] 2xl:h-[350px] 2xl:left-[210px] top-[260px] z-10 3xl:w-[541px] 3xl:h-[360px] 3xl:top-[380px]"
                        : variant === "variant-3"
                          ? "opacity-50 xl:w-[250px] xl:h-[250px] xl:left-[280px] 2xl:w-[300px] 2xl:h-[300px] 2xl:left-[330px] top-0 z-10 3xl:w-[410px] 3xl:h-[271px] 3xl:left-[280px]"
                          : "xl:w-[420px] xl:h-[420px] 2xl:w-[500px] 2xl:h-[500px] left-0 top-[65px] z-20 3xl:w-[740px] 3xl:h-[493px] 3xl:left-[-140px]"
                    }`}
                  >
                    <ImageWidget
                      src={getImageUrl(currentIndices[2])}
                      alt={aboutImages[currentIndices[2]].name || "About"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="block xl:hidden w-full overflow-hidden mt-4 sm:mt-6">
              <div
                ref={emblaRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-3 sm:gap-4 touch-pan-x">
                  {aboutImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative flex-[0_0_80vw] sm:flex-[0_0_75vw] min-w-0 aspect-4/3 overflow-hidden"
                    >
                      <ImageWidget
                        src={getS3Url(image.url)}
                        alt={image.name || "About"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default OverviewSection;
