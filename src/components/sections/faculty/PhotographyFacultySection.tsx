import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { PhotographyFacultySectionProps } from "./utils/faculty";

const PhotographyFacultySection = ({
  data,
}: PhotographyFacultySectionProps) => {
  return (
    <section className="w-full bg-[#ECECEC] py-8 sm:py-20 sm:pb-25  3xl:py-30">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-18 2xl:mb-20 3xl:mb-20">
            <h2 className=" text-left md:text-center font-urbanist font-normal text-black text-[32px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] 3xl:text-[64px mb-2 3xl:mb-4">
              {data?.Title}
            </h2>
            <ParagraphWidget className=" text-left md:text-center   max-w-[280px] s:max-w-[320px] m:max-w-[350px] xss:max-w-[370px] xs:max-w-[450px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] xl:max-w-[700px] 2xl:max-w-[750px] 3xl:max-w-[770px] mx-auto">
              {data?.Description}
            </ParagraphWidget>
          </div>
        </ScrollWidget>
        <div className="grid grid-cols-1 s:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 gap-5 md:gap-5">
          {data?.Card?.map((member, index) => (
            <ScrollWidget key={member.id} delay={0.1 * (index + 1)}>
              <LinkWidget href={`/photography/${member.Slug}`}>
                <div className="flex flex-col items-start group">
                  <div className="relative w-full aspect-square overflow-hidden mb-3 sm:mb-4 3xl:mb-5 transition-transform duration-300 group-hover:scale-105">
                    <ImageWidget
                      src={getS3Url(member.Image.url)}
                      alt={member.Image.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-left font-mulish font-bold text-black text-[13px] s:text-[14px] m:text-[14px] xss:text-[15px] xs:text-[15px] sm:text-[16px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[24px] -mb-1.5">
                    {member.Title}
                  </h3>
                </div>
              </LinkWidget>
            </ScrollWidget>
          ))}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default PhotographyFacultySection;
