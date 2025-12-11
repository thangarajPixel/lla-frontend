import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import LinkWidget from "@/components/widgets/LinkWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { CampusSectionProps } from "./utils/home";

const CampusSection = ({ data }: CampusSectionProps) => {
  if (data?.Title === null) return null;
  return (
    <section
      className="w-full h-screen md:bg-fixed bg-cover bg-right bg-no-repeat sm:py-20 py-10 3xl:h-[1043px] bg-[#F6F6F6]"
      style={{
        backgroundImage: `url(${getS3Url(data?.Bg_img?.url)})`,
      }}
    >
      <ContainerWidget>
        <ScrollWidget animation="slideRight">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                {data.Title}
              </h3>
              <HTMLWidget
                content={data.Heading}
                className="font-area-variable font-semibold text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black"
                tag="p"
              />
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                {data.Description}
              </p>
              {data.Btn_txt && (
                <LinkWidget href="/campus" className="w-full">
                  <OrangeButtonWidget content={data.Btn_txt} />
                </LinkWidget>
              )}
            </div>
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default CampusSection;
