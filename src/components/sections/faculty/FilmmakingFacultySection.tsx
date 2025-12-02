import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { FilmmakingFacultySectionProps } from "./utils/faculty";



const FilmmakingFacultySection = ({
  data,
}: FilmmakingFacultySectionProps) => {
  return (
    <section className="w-full bg-white py-4 sm:py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-20 3xl:py-25">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-18 3xl:mb-20">
            <h2 className="font-urbanist font-normal text-black text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] 3xl:text-[64px] mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-11 3xl:mb-12">
              {data?.Title}
            </h2>
            <div className="space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-7 3xl:space-y-8 max-w-[280px] s:max-w-[320px] m:max-w-[350px] xss:max-w-[370px] xs:max-w-[450px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1100px] 3xl:max-w-[1290px] mx-auto">
              {data?.Description?.map((paragraph, index) => {
                const text = paragraph.children[0]?.text;
                if (!text) return null;
                return (
                  <p
                    key={index}
                    className="font-mulish text-black text-[13px] sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[18px] leading-normal"
                  >
                    {text}
                  </p>
                );
              })}
            </div>
          </div>
        </ScrollWidget>

        <div className="grid grid-cols-1 s:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 gap-2 s:gap-2 m:gap-2 xss:gap-2 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-8.5">
          {data?.Card?.map((member, index) => (
            <ScrollWidget key={member.id} delay={0.1 * (index + 1)}>
              <div className="flex flex-col items-center group">
                <div className="relative w-full aspect-square overflow-hidden mb-3 sm:mb-4 3xl:mb-5 transition-transform duration-300 group-hover:scale-105">
                  <ImageWidget
                    src={getS3Url(member.Image.url)}
                    alt={member.Image.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="font-mulish font-medium text-black text-[13px] s:text-[14px] m:text-[14px] xss:text-[15px] xs:text-[15px] sm:text-[16px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[21px] text-center">
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
