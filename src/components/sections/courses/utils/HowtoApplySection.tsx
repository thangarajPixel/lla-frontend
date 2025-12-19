import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { HowToApplyData } from "./types";

const HowtoApplySection = ({ data }: { data: HowToApplyData }) => {
  return (
    <section className="w-full bg-white py-10 sm:py-16 lg:py-20 3xl:py-24">
      <ContainerWidget>
        <div className="flex flex-col items-start md:items-center gap-8">
          <ScrollWidget delay={0.1} animation="fadeUp">
            <h2 className="text-3xl font-urbanist font-normal xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[64px] md:font-normal text-black font-urbanist text-left md:text-center">
              {data.Title}
            </h2>
          </ScrollWidget>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {data.Card.map((card, index) => {
              // const stepNumber = String(index + 1).padStart(2, "0");
              return (
                <ScrollWidget
                  key={card.id}
                  delay={0.2 + index * 0.1}
                  animation="fadeUp"
                >
                  <div className="relative flex flex-col border border-[#E97451] bg-white px-4 py-4 3xl:p-6 min-h-[280px]">
                    {/* <div className="absolute top-6 right-6 lg:top-6 lg:right-6">
                      <span className="text-[#E97451]/20 font-urbanist text-5xl sm:text-[60px] 3xl:text-[80px] font-normal leading-none">
                        {stepNumber}
                      </span>
                    </div> */}
                    {card.Icon && (
                      <div className="relative mb-4 lg:mb-6 w-18 h-18 flex items-center justify-center">
                        <ImageWidget
                          src={getS3Url(card.Icon.url)}
                          alt={card.Heading}
                          width={card.Icon.width || 80}
                          height={card.Icon.height || 80}
                          className="w-[60px] h-[60px] xss:w-[80px] xss:h-[80px] 3xl:min-w-[80px] 3xl:min-h-[80px] object-contain"
                        />
                      </div>
                    )}

                    <h3 className="text-[#E97451] font-urbanist text-[24px] sm:text-[18px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[24px] font-normal mb-3 pr-16 lg:pr-20">
                      {card.Heading}
                    </h3>

                    {card.Description && (
                      <HTMLWidget
                        content={card.Description}
                        tag="p"
                        className="font-mulish text-[16px] xss:text-[16px] 2xxl:text-[18px] 3xl:text-[18px] font-normal text-black leading-normal max-w-full md:max-w-[760px]"
                      />
                    )}
                  </div>
                </ScrollWidget>
              );
            })}
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default HowtoApplySection;
