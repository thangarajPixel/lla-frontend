import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { SponsorsSectionProps } from "./utils/home";

const SponsorsSection = ({ data }: SponsorsSectionProps) => {
  const sponsors = data.Image;
  if (data?.Image?.length === 0) return null;
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white">
      <ContainerWidget>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
          <div className="space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-6 2xl:space-y-8 3xl:space-y-10">
            <h2 className="text-left xss:text-[32px] md:text-center text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16 3xl:mb-20">
              {data.Title}
            </h2>
          </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
            gap-6 
          "
          >
            {sponsors?.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="flex items-center justify-center"
              >
                <ScrollWidget animation="fadeUp" delay={0.1 + index * 0.05}>
                  {/* <div className="relative w-[160px] h-[63px]  sm:w-[171px] sm:h-[63px] md:w-[171px] md:h-[75px] lg:w-[160px] lg:h-[65px] xl:w-[130px] xl:h-[70px] 2xl:w-[165px] 2xl:h-[70px] 3xl:w-[260px] 3xl:h-[130px] overflow-hidden"> */}
                  <ImageWidget
                    src={getS3Url(sponsor.url)}
                    alt={sponsor.name}
                    // fill
                    width={10}
                    height={10}
                    className="w-full h-full"
                  />
                  {/* </div> */}
                </ScrollWidget>
              </div>
            ))}
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default SponsorsSection;
