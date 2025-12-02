import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { FilmmakingFacultySectionProps } from "./utils/faculty";

const FilmmakingFacultySection = ({ data }: FilmmakingFacultySectionProps) => {
  return (
    <section className="w-full bg-white py-4 sm:py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-20 3xl:py-25">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <div className="text-left md:text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-18 3xl:mb-20">
            <h2 className="font-urbanist font-normal text-black text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] 3xl:text-[64px] mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-11 3xl:mb-12">
              {data?.Title}
            </h2>
            <div className="space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-5 2xl:space-y-5 3xl:space-y-6 max-w-[280px] s:max-w-[320px] m:max-w-[350px] xss:max-w-[370px] xs:max-w-[450px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1100px] 3xl:max-w-[1290px] mx-auto">
              {data?.Description?.map((paragraph, type) => {
                const text = paragraph.children[0]?.text;
                if (!text) return null;
                return (
                  <p
                    key={type}
                    className="font-mulish text-black text-[16px] sm:text-[16px] md:text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal"
                  >
                    {text}
                  </p>
                );
              })}
            </div>
          </div>
        </ScrollWidget>

        <div className="grid grid-cols-1 s:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 gap-4 s:gap-4 m:gap-4 xss:gap-4 xs:gap-5 sm:gap-5 md:gap-5 lg:gap-6 xl:gap-5 2xl:gap-8 3xl:gap-8.5">
          {data?.Card?.map((member, index) => (
            <ScrollWidget key={member.id} delay={0.1 * (index + 1)}>
              <div className="flex flex-col items-left group">
                <div className="relative w-full aspect-square overflow-hidden mb-3 sm:mb-4 3xl:mb-5 transition-transform duration-300 group-hover:scale-105">
                  <ImageWidget
                    src={getS3Url(member.Image.url)}
                    alt={member.Image.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="font-mulish font-bold text-black text-[13px] s:text-[14px] m:text-[14px] xss:text-[15px] xs:text-[15px] sm:text-[16px] md:text-[16px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[23px]">
                  {member.Title}
                </h3>
              </div>
            </ScrollWidget>
          ))}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FilmmakingFacultySection;
