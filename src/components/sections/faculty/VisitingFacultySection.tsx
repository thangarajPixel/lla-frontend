import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { VisitingFacultySectionProps } from "./utils/faculty";

const VisitingFacultySection = ({ data }: VisitingFacultySectionProps) => {
  return (
    <section className="w-full bg-[#ECECEC] py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20 2xl:py-22 3xl:py-25">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-18 2xl:mb-20 3xl:mb-20">
            <h2 className=" text-left md:text-center font-urbanist font-normal text-black text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] 3xl:text-[58px] mb-2 3xl:mb-4">
              {data?.Title}
            </h2>
            <p className="font-mulish text-left md:text-center ledding-normal text-[24px] sm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[30px] 3xl:text-[40px] mb-2 sm:mb-4 3xl:mb-4">
              {data?.Heading}{" "}
              <span className="text-[#E97451]">{data?.SubHeading}</span>
            </p>
            <p className=" text-left md:text-center font-mulish text-black text-[16px] sm:text-[14px] md:text-[12px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px] 3xl:text-[18px] max-w-[280px] s:max-w-[320px] m:max-w-[350px] xss:max-w-[370px] xs:max-w-[450px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] xl:max-w-[700px] 2xl:max-w-[750px] 3xl:max-w-[770px] mx-auto">
              {data?.Description}
            </p>
          </div>
        </ScrollWidget>
        <div className="grid grid-cols-1 s:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 gap-2 s:gap-2 m:gap-2 xss:gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-8.5">
          {data?.Card?.map((member, index) => (
            <ScrollWidget key={member.id} delay={0.1 * (index + 1)}>
              <div className="flex flex-col items-start group cursor-pointer">
                <div className="relative w-full aspect-square overflow-hidden mb-3 sm:mb-4 3xl:mb-5 transition-transform duration-300 group-hover:scale-105">
                  <ImageWidget
                    src={getS3Url(member.Image.url)}
                    alt={member.Image.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-left font-mulish font-bold text-black text-[13px] s:text-[14px] m:text-[14px] xss:text-[15px] xs:text-[15px] sm:text-[16px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[24px]">
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

export default VisitingFacultySection;
