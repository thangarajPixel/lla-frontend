"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Dummy1 } from "@/helpers/ImageHelper";

const aboutData = [
  {
    id: 1,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Dummy1,
  },
  {
    id: 2,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Dummy1,
  },
  {
    id: 3,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Dummy1,
  },
  {
    id: 4,
    title: "The 25th Year Begins",
    description: "A special anniversary celebration at LLA.",
    image: Dummy1,
  },
];

const AboutSection = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      loop: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  return (
    <section className="w-full bg-[#ECECEC] flex flex-col items-center justify-center z-40 relative py-15 md:pt-[280px] md:pb-[220px]">
      <ContainerWidget>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
          <div className="flex flex-col gap-5">
            <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
              About LLA
            </h3>
            <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              Guided by Light for <br className="hidden sm:block" />
              <span className="text-[#E97451]">25 Years</span>
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[450px]">
              In thought, in learning, and in spirit, what began as Iqbal
              Mohamed's dream to establish India's first professional
              photography institute has grown into a community that continues to
              explore, question, and create with purpose.
            </p>
            <div className="self-start">
              <OrangeButtonWidget content="Step into the LLA" />
            </div>
          </div>
          <ScrollWidget delay={0.1} animation="fadeUp">
            <div className="hidden xl:block  relative">
              <div className="relative">
                <div className="relative top">
                  <ImageWidget
                    src={Dummy1}
                    alt="About 3"
                    className="absolute w-[200px] h-[160px] md:w-[250px] md:h-[200px] lg:w-[280px] lg:h-[230px] xl:w-[300px] xl:h-[250px] mt-[-150px] md:mt-[-170px] lg:mt-[-180px] xl:mt-[-190px] 2xl:mt-[-200px] ml-[100px] md:ml-[120px] lg:ml-[140px] xl:ml-[150px] object-cover opacity-40"
                  />
                </div>
                <div className="relative">
                  <ImageWidget
                    src={Dummy1}
                    alt="About 1"
                    className="w-[320px] h-[240px] md:w-[400px] md:h-[280px] lg:w-[450px] lg:h-[320px] xl:w-[500px] xl:h-[350px] ml-[-60px] md:ml-[-80px] lg:ml-[-90px] xl:ml-[-60px] 2xl:ml-[-100px] object-cover relative z-10"
                  />
                </div>
                <div className="relative">
                  <ImageWidget
                    src={Dummy1}
                    alt="About 2"
                    className="absolute w-[260px] h-[200px] md:w-[340px] md:h-[240px] lg:w-[380px] lg:h-[260px] xl:w-[420px] xl:h-[280px] mt-[-120px] md:mt-[-135px] lg:mt-[-140px] xl:mt-[-145px] 2xl:mt-[-150px] ml-[50px] md:ml-[65px] lg:ml-[75px] xl:ml-[80px] object-cover opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="block xl:hidden w-full overflow-hidden mt-4 sm:mt-6">
              <div
                ref={emblaRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-3 sm:gap-4 touch-pan-x">
                  {aboutData.map((card) => (
                    <div
                      key={card.id}
                      className="flex-[0_0_80vw] sm:flex-[0_0_75vw] min-w-0"
                    >
                      <ImageWidget
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default AboutSection;
