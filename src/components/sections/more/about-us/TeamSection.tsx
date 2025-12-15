import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { TeamSectionProps } from "./utils/about-us";
import HTMLWidget from "@/components/widgets/HTMLWidget";

const TeamSection = ({ data }: TeamSectionProps) => {
  const facultyData = [
    {
      id: data?.Card[0]?.id,
      name: data?.Card[0]?.Title,
      description: data?.Card[0]?.Description,
      imageUrl: getS3Url(data?.Card[0]?.Image[0]?.url),
      Btn_txt: data?.Card[0]?.Btn_txt,
      className: "mt-0 md:mt-0 lg:mt-15 xl:mt-15 2xl:mt-15 3xl:mt-20 4xl:mt-25",
    },
    {
      id: data?.Card[1]?.id,
      name: data?.Card[1]?.Title,
      description: data?.Card[1]?.Description,
      imageUrl: getS3Url(data?.Card[1]?.Image[0]?.url),
      Btn_txt: data?.Card[1]?.Btn_txt,
      className: "mt-0 md:mt-0 lg:mt-45 xl:mt-45 2xl:mt-45 3xl:mt-50 4xl:mt-55",
    },
    {
      id: data?.Card[2]?.id,
      name: data?.Card[2]?.Title,
      description: data?.Card[2]?.Description,
      imageUrl: getS3Url(data?.Card[2]?.Image[0]?.url),
      Btn_txt: data?.Card[2]?.Btn_txt,
    },
    {
      id: data?.Card[3]?.id,
      name: data?.Card[3]?.Title,
      description: data?.Card[3]?.Description,
      imageUrl: getS3Url(data?.Card[3]?.Image[0]?.url),
      Btn_txt: data?.Card[3]?.Btn_txt,
      className:
        " mt-0 md:mt-0 lg:mt-15 xl:mt-15 2xl:mt-15 3xl:mt-20 4xl:mt-25",
    },
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20 xl:py-20 2xl:py-28 3xl:py-32 4xl:py-36">
      <ContainerWidget>
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-5 2xl:space-y-6 3xl:space-y-7 4xl:space-y-20">
          <ScrollWidget delay={0.1}>
            <h3
              className="
              font-urbanist font-normal text-black
              text-left sm:text-center
              text-2xl sm:text-3xl md:text-[32px] lg:text-[40px]
              xl:text-[48px] 2xl:text-[64px] 3xl:text-[64px] 4xl:text-[64px]
            "
            >
              {data.Title}
            </h3>
             {/* <HTMLWidget
                  content={data.Heading}
                   className=" font-area-variable font-semibold text-black 
              text-left sm:text-center
              text-base sm:text-lg md:text-xl lg:text-2xl 
              xl:text-3xl 2xl:text-[32px] 3xl:text-[40px] 4xl:text-[45px]
              max-w-[1100px] mx-auto"
                     tag="p"
                  /> */}
          </ScrollWidget>
        </div>
        <div className="py-7 pb-9 sm sm:py-8 md:py-14 lg:py-12 xl:py-12 2xl:py-16 3xl:py-20 4xl:py-15">
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4
            2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-4
            gap-2 sm:gap-4 md:gap-8 lg:gap-4 xl:gap-4
            2xl:gap-5 3xl:gap-6 4xl:gap-7"
          >
            {facultyData.map((faculty) => (
              <ScrollWidget key={faculty.id} animation="scale" delay={0.1}>
                <div
                  className={`${faculty.className} group min-w-[171px] max-w-[360px]  bg-white
                            hover:bg-[#E97451]/20 cursor-pointer
                            transition-colors duration-500 ease-out
                            px-2 py-2 flex flex-col
                            min-h-[300px] xs:min-h-[310px] sm:min-h-[310px] md:min-h-[300px] lg:min-h-[300px]
                            xl:min-h-[340px] 2xl:min-h-[410px] 3xl:min-h-[480px] 4xl:min-h-[500px]`}
                >
                  <ParallaxWidget speed={-0.1}>
                    <div className="aspect-square overflow-hidden  w-[170px] h-[171px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px] 2xl:w-[300px] 2xl:h-[302px] 3xl:w-[300px] 3xl:h-[302px]">
                      <ImageWidget
                        src={faculty.imageUrl}
                        alt="Faculty"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </ParallaxWidget>
                  <h5
                    className="
                    font-mulish font-bold text-black 
                    mt-3 leading-6
                    text-[13px] sm:text-[16px] lg:text-[19px] 2xl:text-[19px] 3xl:text-[24px] 4xl:text-[24px]"
                  >
                    {faculty.name}
                  </h5>
                  <p
                    className="font-mulish text-black font-regular
                    text-[13px] md:text-[17px] 3xl:text-[18px] 4xl:text-[18px] my-2"
                  >
                    {faculty.description}
                  </p>
                  <div className="mt-2 self-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <OrangeButtonWidget content={faculty.Btn_txt} />
                  </div>
                </div>
              </ScrollWidget>
            ))}
          </div>
        </div>
        <div
          className="bg-[#ECECEC] py-5 sm:py-5 md:py-6 lg:py-5 xl:py-5 2xl:py-7 3xl:py-9 4xl:py-11 
        px-4 sm:px-5 md:px-6 lg:px-5 xl:px-5 2xl:px-7 3xl:px-9 4xl:px-11"
        >
          <ScrollWidget delay={0.2} animation="fadeUp">
            <div
              className="relative w-full 
                h-[150px] sm:h-[380px] md:h-[300px] 
                lg:h-[300px] xl:h-[430px] 2xl:h-[520px] 
                3xl:h-[600px] 4xl:h-[430px]"
              style={{
                maxWidth: "1242px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <ImageWidget
                src={getS3Url(data.Frame.Image[0].url)}
                alt="Team"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3  pt-3">
              <h5
                className="font-urbanist font-regular text-[#E97451] text-left
                  text-[24px] sm:text-[24px] md:text-[24px] lg:text-[24px] 
                  xl:text-[30px] 2xl:text-[40px] 3xl:text-[40px] 4xl:text-[40px]"
              >
                {data.Frame.Title}
              </h5>
              <p className="font-mulish text-[16px] md:text-[17px] 3xl:text-[18px] font-normal text-black leading-normal">
                {data.Frame.Description}
              </p>
            </div>
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default TeamSection;
