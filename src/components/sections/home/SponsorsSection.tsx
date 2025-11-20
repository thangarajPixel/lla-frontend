import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import {
  SponsorsDummy1,
  SponsorsDummy2,
  SponsorsDummy3,
  SponsorsDummy4,
  SponsorsDummy5,
  SponsorsDummy6,
} from "@/helpers/ImageHelper";
import type { SponsorsSectionProps } from "./utils/home";

const SponsorsSection = ({ data }: SponsorsSectionProps) => {
  const sponsors = data.Image || [];
  const fallbackImages = [
    { id: "sponsor-dummy-1", image: SponsorsDummy1 },
    { id: "sponsor-dummy-2", image: SponsorsDummy2 },
    { id: "sponsor-dummy-3", image: SponsorsDummy3 },
    { id: "sponsor-dummy-4", image: SponsorsDummy4 },
    { id: "sponsor-dummy-5", image: SponsorsDummy5 },
    { id: "sponsor-dummy-6", image: SponsorsDummy6 },
  ];
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white">
      <ContainerWidget>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
          <div className="space-y-2 md:space-y-3 lg:space-y-8 xl:space-y-10">
            <ParallaxWidget
              speed={0.5}
              className="space-y-2 md:space-y-3 lg:space-y-8 xl:space-y-10"
            >
              <h2 className="text-left md:text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist mb-10">
                {data.Title || "Our Sponsors"}
              </h2>
            </ParallaxWidget>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-7 2xl:gap-6 3xl:gap-8">
            {sponsors.length > 0
              ? sponsors.map((sponsor, index) => (
                  <div
                    key={sponsor.id}
                    className="space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6"
                  >
                    <ScrollWidget animation="scale" delay={0.1 + index * 0.05}>
                      <ParallaxWidget
                        speed={0.5 + index * 0.1}
                        className="relative w-full h-0 pb-[75%] aspect-4/3 overflow-hidden"
                      >
                        <ImageWidget
                          src={getS3Url(sponsor.url)}
                          alt={sponsor.name || `Sponsor ${sponsor.id}`}
                          fill
                          className="object-scale-down"
                        />
                      </ParallaxWidget>
                    </ScrollWidget>
                  </div>
                ))
              : fallbackImages.map((item, index) => (
                  <div
                    key={item.id}
                    className="space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6"
                  >
                    <ScrollWidget animation="scale" delay={0.1 + index * 0.05}>
                      <ParallaxWidget
                        speed={0.5 + index * 0.1}
                        className="relative w-full h-0 pb-[75%] aspect-4/3 overflow-hidden"
                      >
                        <ImageWidget
                          src={item.image}
                          alt={`Sponsor ${index + 1}`}
                          fill
                          className="object-scale-down"
                        />
                      </ParallaxWidget>
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
