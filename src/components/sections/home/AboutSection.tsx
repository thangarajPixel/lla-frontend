"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Dummy1 } from "@/helpers/ImageHelper";
import type { AboutSectionProps } from "./utils/home";

const AboutSection = ({ data }: AboutSectionProps) => {
  const aboutImages = data.Image || [];

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
    <section className="w-full bg-[#ECECEC] flex flex-col items-center justify-center z-40 relative py-15 lg:pt-[280px] lg:pb-[220px]">
      <ContainerWidget>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 2xl:gap-18">
          <div className="flex flex-col gap-4.5">
            <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
              {data.Title || "About LLA"}
            </h3>
            <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              {data.Heading}
              {data.SubHeading && (
                <>
                  <br className="hidden sm:block" />
                  <span className="text-[#E97451]">{data.SubHeading}</span>
                </>
              )}
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[400px]">
              {data.Description ||
                "In thought, in learning, and in spirit, what began as Iqbal Mohamed's dream to establish India's first professional photography institute has grown into a community that continues to explore, question, and create with purpose."}
            </p>
            <div className="self-start">
              <OrangeButtonWidget
                content={data.Btn_txt || "Step into the LLA"}
              />
            </div>
          </div>
          <ScrollWidget delay={0.1} animation="fadeUp">
            <div className="hidden xl:block  relative">
              <div className="relative">
                {aboutImages[1] && (
                  <div className="relative top">
                    <div className="absolute w-[200px] h-[160px] md:w-[250px] md:h-[200px] lg:w-[280px] lg:h-[230px] xl:w-[300px] xl:h-[250px] mt-[-150px] md:mt-[-170px] lg:mt-[-180px] xl:mt-[-190px] 2xl:mt-[-200px] ml-[100px] md:ml-[120px] lg:ml-[140px] xl:ml-[150px] opacity-40">
                      <ImageWidget
                        src={getImageUrl(1)}
                        alt={aboutImages[1].name || "About 3"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                {aboutImages[2] && (
                  <div className="relative">
                    <div className="w-[320px] h-[240px] md:w-[400px] md:h-[280px] lg:w-[450px] lg:h-[320px] xl:w-[500px] xl:h-[350px] ml-[-60px] md:ml-[-80px] lg:ml-[-90px] xl:ml-[-60px] 2xl:ml-[-100px] relative z-10">
                      <ImageWidget
                        src={getImageUrl(2)}
                        alt={aboutImages[2].name || "About 1"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                {aboutImages[1] && (
                  <div className="relative">
                    <div className="absolute w-[260px] h-[200px] md:w-[340px] md:h-[240px] lg:w-[380px] lg:h-[260px] xl:w-[420px] xl:h-[280px] mt-[-120px] md:mt-[-135px] lg:mt-[-140px] xl:mt-[-145px] 2xl:mt-[-150px] ml-[50px] md:ml-[65px] lg:ml-[75px] xl:ml-[80px] opacity-40">
                      <ImageWidget
                        src={getImageUrl(1)}
                        alt={aboutImages[1].name || "About 2"}
                        fill
                        className="object-cover"
                      />
                    </div>
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

export default AboutSection;
