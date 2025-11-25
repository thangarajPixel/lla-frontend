import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Dummy1, Dummy2 } from "@/helpers/ImageHelper";
import type { CourseSectionProps } from "./utils/home";

type AnimationType =
  | "fadeIn"
  | "fadeUp"
  | "fadeDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "rotate";

const CourseSection = ({ data }: CourseSectionProps) => {
  const animations: Array<{
    image: AnimationType;
    content: AnimationType;
    delay: { image: number; content: number };
  }> = [
    {
      image: "scale",
      content: "slideLeft",
      delay: { image: 0.1, content: 0.3 },
    },
    {
      image: "fadeDown",
      content: "slideRight",
      delay: { image: 0.2, content: 0.4 },
    },
  ];

  const parallaxSpeeds = [
    { image: 0.4, content: -0.25 },
    { image: 0.35, content: -0.15 },
  ];

  const contentClasses = [
    "space-y-3 md:space-y-3 lg:space-y-4 md:ml-[-20px] lg:ml-[-35px] xl:ml-[-64px] 3xl:ml-[-78px] md:mt-[-30px] lg:mt-[-45px] xl:mt-[-65px] 3xl:mt-[-79px] relative z-10 w-full md:max-w-[300px] lg:max-w-[340px] xl:max-w-[370px] 2xl:max-w-[370px] 3xl:max-w-[470px]",
    "space-y-3 md:space-y-3 lg:space-y-4 md:ml-[-20px] lg:ml-[-35px] xl:ml-[-60px] 3xl:ml-[-73px] md:mt-[-30px] lg:mt-[-45px] xl:mt-[-65px] 3xl:mt-[-79px] relative z-10 w-full md:max-w-[320px] lg:max-w-[290px] xl:max-w-[370px] 2xl:max-w-[410px] 3xl:max-w-[500px]",
  ];

  const cardContainerClasses = [
    "space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6",
    "space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6 md:mt-28 lg:mt-26 xl:mt-16 2xl:mt-34 3xl:mt-44",
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white">
      <ContainerWidget>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
              {data.Title || "Courses"}
            </h2>
            <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              {data.Heading}
              {data.SubHeading && (
                <span className="text-[#E97451] ml-2">{data.SubHeading}</span>
              )}
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[650px]">
              {data.Description ||
                "Here, learning is deliberate and layered, aimed at building strong conceptual foundations."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 2xl:gap-6">
            {data?.Card?.map((card, index) => (
              <div
                key={card.id}
                className={
                  cardContainerClasses[index] || cardContainerClasses[0]
                }
              >
                <ScrollWidget
                  animation={animations[index]?.image || "scale"}
                  delay={animations[index]?.delay.image || 0.1}
                >
                  <ParallaxWidget
                    speed={parallaxSpeeds[index]?.image || 0.4}
                    className="relative w-full aspect-4/3 overflow-hidden"
                  >
                    <ImageWidget
                      src={
                        getS3Url(card?.Image?.[0]?.url) ||
                        (index === 0 ? Dummy1 : Dummy2)
                      }
                      alt={card?.Title}
                      fill
                      className="object-cover"
                    />
                  </ParallaxWidget>
                </ScrollWidget>
                <ScrollWidget
                  animation={animations[index]?.content || "slideLeft"}
                  delay={animations[index]?.delay.content || 0.3}
                >
                  <ParallaxWidget
                    speed={parallaxSpeeds[index]?.content || -0.25}
                    className={contentClasses[index] || contentClasses[0]}
                  >
                    <h3 className="text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] 3xl:text-[40px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight">
                      {card.Title}
                    </h3>
                    <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
                      {card.Description}
                    </p>
                    <OrangeButtonWidget
                      content={card.Btn_txt || "Discover Your Frame"}
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

export default CourseSection;
