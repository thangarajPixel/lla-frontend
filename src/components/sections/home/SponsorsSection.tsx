import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import {
  SponsorsDummy1,
  SponsorsDummy2,
  SponsorsDummy3,
  SponsorsDummy4,
  SponsorsDummy5,
  SponsorsDummy6,
} from "@/helpers/ImageHelper";

const SponsorsSection = () => {
  const Images = [
    SponsorsDummy1,
    SponsorsDummy2,
    SponsorsDummy3,
    SponsorsDummy4,
    SponsorsDummy5,
    SponsorsDummy6,
  ];
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white">
      <ContainerWidget>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            <ParallaxWidget
              speed={0.3}
              className="space-y-2 md:space-y-3 lg:space-y-4"
            >
              <h2 className="text-left md:text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist mb-4">
                Our Sponsors
              </h2>
              <p className="text-left md:text-center text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] font-normal text-black mb-4">
                Lorem ipsum dolor
                <span className="text-[#E97451] font-bold">
                  sit amet, consectetur
                </span>
              </p>
              <p className="text-left md:text-center text-base text-[16px] lg:text-[14px] 3xl:text-[24px] font-normal text-black leading-normal sm:mx-auto md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[900px] 3xl:max-w-[1000px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </p>
            </ParallaxWidget>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-7 2xl:gap-6">
            {Images.map((src, index) => (
              <div
                key={index}
                className="space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6"
              >
                <ScrollWidget animation="scale" delay={0.1}>
                  <ParallaxWidget
                    speed={0.4}
                    className="relative w-full h-0 pb-[75%] aspect-[4/3] overflow-hidden"
                  >
                    <ImageWidget
                      src={src}
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
