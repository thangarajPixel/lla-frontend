import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { FacultyHeroSectionProps } from "./utils/faculty";

const FacultyHeroSection = ({ data }: FacultyHeroSectionProps) => {
  return (
    <section className="max-h-[1000px] w-full bg-[#ECECEC] overflow-hidden  py-2 sm:py-8 md:py-10 lg:py-12 xl:py-10 2xl:py-16 3xl:py-20 3xl:pb-10">
      <ContainerWidget>
        <div className="pb-[80px] flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-6 ">
          <ScrollWidget delay={0.3}>
            <div className="space-y-3 pt-10">
              <h2 className="font-urbanist  font-regular font-normal text-black text-[32px] md:text-[48px] 3xl:text-[64px]">
                {data.Title}
              </h2>
              {data?.Heading && (
                <HTMLWidget
                  content={data.Heading}
                  className="font-area-variable font-semibold text-[24px] md:text-[30px] 3xl:text-[40px] text-black leading-tight"
                  tag="p"
                />
              )}
              <ParagraphWidget className="text-left mt-6">
                {data.Description}
              </ParagraphWidget>
            </div>
          </ScrollWidget>
          <div className="flex flex-row gap-4 xss:gap-3 xs:gap-5 column-gap:2 sm:gap-6 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 3xl:gap-7 ">
            <div className="flex flex-col gap-3 md:gap-5  lg:gap-5 xl:gap-5 2xl:gap-5 3xl:gap-7 pt-25  sm:pt-30 lg:pt-35">
              {data.Image?.slice(0, 2).map(
                ({ url }: { url: string }, index: number) => (
                  <ScrollWidget key={url} delay={0.4 + index * 0.3}>
                    <div
                      className="relative group h-[110px] w-[110px] s:h-[85px] s:w-[85px] xss:h-[108px] xss:w-[109px] xs:h-[130px] xs:w-[130px]  sm:h-[140px] sm:w-[140px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[120px] xl:h-[150px] xl:w-[150px]
                        2xl:h-[170px] 2xl:w-[170px] 3xl:h-[190px] 3xl:w-[190px]  overflow-hidden cursor-pointer"
                    >
                      <ImageWidget
                        src={getS3Url(url)}
                        alt="Faculty"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </ScrollWidget>
                ),
              )}
            </div>
            <div className="flex flex-col gap-3 md:gap-5 lg:gap-5 xl:gap-5  2xl:gap-5 3xl:gap-7 pt-10  sm:pt-15 lg:pt-18">
              {data.Image?.slice(2, 4).map(
                ({ url }: { url: string }, index: number) => (
                  <ScrollWidget key={url} delay={0.5 + index * 0.3}>
                    <div
                      className="relative group h-[100px] w-[100px] s:h-[85px] s:w-[85px] xss:h-[108px] xss:w-[109px] xs:h-[130px] xs:w-[130px]  sm:h-[140px] sm:w-[140px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[120px] xl:h-[150px] xl:w-[150px]
                        2xl:h-[170px] 2xl:w-[170px] 3xl:h-[190px] 3xl:w-[190px]  overflow-hidden cursor-pointer"
                    >
                      <ImageWidget
                        src={getS3Url(url)}
                        alt="Faculty"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </ScrollWidget>
                ),
              )}
            </div>
            <div className="flex flex-col gap-3 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 3xl:gap-7">
              {data.Image?.slice(4, 7).map(
                ({ url }: { url: string }, index: number) => (
                  <ScrollWidget key={url} delay={0.6 + index * 0.3}>
                    <div
                      className="relative group h-[100px] w-[100px] s:h-[85px] s:w-[85px] xss:h-[108px] xss:w-[109px]  xs:h-[130px] xs:w-[130px] sm:h-[140px] sm:w-[140px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[120px] xl:h-[150px] xl:w-[150px]
                        2xl:h-[170px] 2xl:w-[170px] 3xl:h-[190px] 3xl:w-[190px]  overflow-hidden cursor-pointer"
                    >
                      <ImageWidget
                        src={getS3Url(url)}
                        alt="Faculty"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </ScrollWidget>
                ),
              )}
            </div>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FacultyHeroSection;
