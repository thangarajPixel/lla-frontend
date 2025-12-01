import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { FounderDummy1 } from "@/helpers/ImageHelper";

const DirectorAcademicsSection = ({ data }: any) => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20 2xl:py-20">
      <ContainerWidget>
        <ScrollWidget delay={0.2}>
          <h2 className="font-urbanist font-normal text-center text-black text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            Director Academics
          </h2>
        </ScrollWidget>

        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-10 xl:gap-16 2xl:gap-70">
          {/* Text Content */}
          <ScrollWidget delay={0.3} className="w-full lg:w-1/2 space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-3 2xl:space-y-5">
            <h3 className="font-urbanist font-normal text-[#E97451] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
              {data?.Name || "Iqbal Mohamed"}
            </h3>
            
            <div className="space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-3">
              <p className="font-mulish font-regular font-normal text-black text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[15px] 2xl:text-[18px] leading-[22px] 2xl:leading-[26px]">
                {data?.Paragraph1 || "Iqbal Mohamed is the fulcrum of all things academic at LLA. He crafts every detail of the curriculum, re-inventing it every year, while mentoring the faculty and inspiring all who study at LLA"}
              </p>
              
              <p className="font-mulish font-regular font-normal  text-black text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[15px] 2xl:text-[18px] leading-[22px] 2xl:leading-[26px]">
                {data?.Paragraph2 || "As a founder and mentor of LLA, 'Iqbal Sir' as he's known fondly by his students, has been a beacon for all things photography. His deep knowledge of the art and science of photography and his innate desire to share his knowledge serves as the bedrock of the institution. He believes that everyone is inherently creative and can nurture their inner vision in the right environment."}
              </p>
              
              <p className="font-mulish font-regular font-normal text-black text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[15px] 2xl:text-[18px] leading-[22px] 2xl:leading-[26px]">
                {data?.Paragraph3 || "His vision for students are not just limited to the sessions conducted by him, he can be frequently seen outside his office, having conversations and conversations with students and faculty, sharing his experiences as photography, life and everything in between."}
              </p>
            </div>
             <OrangeButtonWidget content="Know More" />
          </ScrollWidget>

          {/* Image */}
          <ScrollWidget delay={0.4} className="w-full lg:w-1/2">
            <div className="pl-20 relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] 2xl:aspect-[5/6] max-w-[520px] mx-auto lg:max-w-none overflow-hidden shadow-lg">
              <ImageWidget
                src={data?.Image ? getS3Url(data.Image.url) : FounderDummy1}
                alt={data?.Name || "Director Academics"}
                fill
                className="object-cover"
              />
            </div>
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default DirectorAcademicsSection;
