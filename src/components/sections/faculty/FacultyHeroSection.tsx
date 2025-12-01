import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { FacultyHeroSectionProps } from "./utils/faculty";

const FacultyHeroSection = ({ data }: FacultyHeroSectionProps) => {
  return (
    <section className="max-h-[1000px] w-full bg-[#ECECEC] overflow-hidden  py-2 sm:py-8 md:py-10 lg:py-12 xl:py-10 2xl:py-16 3xl:py-20">
      <ContainerWidget>
        <div className="pb-[80px] flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-6 ">
          <ScrollWidget delay={0.3}>
            <div className="space-y-2 pt-10">
              <h2 className="font-urbanist  font-regular font-normal text-black text-[32px] sm:text-[36px] md:text-[36px] lg:text-[48px] xl:text-[48px] 2xl:text-[60px] 3xl:text-[64px]">
                {data.Title}
              </h2>
               <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[40px] font-regular font-mulish  text-black w-full md:max-w-[600px] 3xl:max-w-[976px] 3xl:leading-[48px]">
                  {data.Heading}
                  <span className="text-[#E97451] ml-2"> {data.SubHeading} </span>
                </p>
              <p className="font-mulish text-black text-[14px] md:text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[18px]">
                {data.Description}
              </p>
            </div>
          </ScrollWidget>
          <ScrollWidget delay={0.4}>
            <div className="flex flex-row gap-4 xss:gap-8 xs:gap-5 column-gap:2 sm:gap-6 md:gap-8 lg:gap-10 ">
              <div className="flex flex-col gap-3 pt-25  sm:pt-30 lg:pt-35">
                {data.Image?.slice(0, 2).map(({ url }: { url: string }) => (
                  <div
                    key={url}
                    className="relative  h-[100px] w-[100px]  sm:h-[140px] sm:w-[140px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[120px] xl:h-[130px] xl:w-[130px]
                        2xl:h-[190px] 2xl:w-[190px] 3xl:h-[190px] 3xl:w-[190px]  overflow-hidden"
                  >
                    <ImageWidget
                      src={getS3Url(url)}
                      alt="Faculty"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-10  sm:pt-15 lg:pt-18">
                {data.Image?.slice(2, 4).map(({ url }: { url: string }) => (
                  <div
                    key={url}
                    className="relative h-[100px] w-[100px]  sm:h-[140px] sm:w-[140px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[120px] xl:h-[130px] xl:w-[130px]
                        2xl:h-[190px] 2xl:w-[190px] 3xl:h-[190px] 3xl:w-[190px]  overflow-hidden"
                  >
                    <ImageWidget
                      src={getS3Url(url)}
                      alt="Faculty"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {data.Image?.slice(4, 7).map(({ url }: { url: string }) => (
                  <div
                    key={url}
                    className="relative h-[100px] w-[100px]  sm:h-[140px] sm:w-[140px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[120px] xl:h-[130px] xl:w-[130px]
                        2xl:h-[190px] 2xl:w-[190px] 3xl:h-[190px] 3xl:w-[190px]  overflow-hidden"
                  >
                    <ImageWidget
                      src={getS3Url(url)}
                      alt="Faculty"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FacultyHeroSection;
