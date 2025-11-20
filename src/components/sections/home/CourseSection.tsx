import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Dummy1, Dummy2 } from "@/helpers/ImageHelper";

const CourseSection = () => {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white">
      <ContainerWidget>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
              Courses
            </h2>
            <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              Designed For
              <span className="text-[#E97451] ml-2">Immersive Learning</span>
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
              Here, learning is deliberate and layered, aimed at building strong
              conceptual foundations.
              <br className="hidden sm:block" /> Where skills are honed, ideas
              take shape, and observation becomes instinct.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 2xl:gap-6">
            <div className="space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6">
              <ScrollWidget animation="scale" delay={0.1}>
                <ParallaxWidget
                  speed={0.4}
                  className="relative w-full aspect-4/3 overflow-hidden"
                >
                  <ImageWidget
                    src={Dummy1}
                    alt="Professional Photography Course"
                    fill
                    className="object-cover"
                  />
                </ParallaxWidget>
              </ScrollWidget>
              <ScrollWidget animation="slideLeft" delay={0.3}>
                <ParallaxWidget
                  speed={-0.25}
                  className="space-y-3 md:space-y-3 lg:space-y-4 md:ml-[-20px] lg:ml-[-35px] xl:ml-[-64px] 3xl:ml-[-78px] md:mt-[-30px] lg:mt-[-45px] xl:mt-[-65px] 3xl:mt-[-79px] relative z-10 w-full md:max-w-[300px] lg:max-w-[340px] xl:max-w-[370px] 2xl:max-w-[370px] 3xl:max-w-[470px]"
                >
                  <h3 className="text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] 3xl:text-[40px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight">
                    PG Diploma in Professional Photography & Digital Production
                  </h3>
                  <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna.
                  </p>
                  <OrangeButtonWidget content="Discover Your Frame" />
                </ParallaxWidget>
              </ScrollWidget>
            </div>
            <div className="space-y-4 md:space-y-4 lg:space-y-5 xl:space-y-6 md:mt-28 lg:mt-26 xl:mt-16 2xl:mt-34 3xl:mt-44">
              <ScrollWidget animation="fadeDown" delay={0.2}>
                <ParallaxWidget
                  speed={0.35}
                  className="relative w-full aspect-4/3 overflow-hidden"
                >
                  <ImageWidget
                    src={Dummy2}
                    alt="Documentary & Corporate Filmmaking Course"
                    fill
                    className="object-cover"
                  />
                </ParallaxWidget>
              </ScrollWidget>
              <ScrollWidget animation="slideRight" delay={0.4}>
                <ParallaxWidget
                  speed={-0.15}
                  className="space-y-3 md:space-y-3 lg:space-y-4 md:ml-[-20px] lg:ml-[-35px] xl:ml-[-60px] 3xl:ml-[-73px] md:mt-[-30px] lg:mt-[-45px] xl:mt-[-65px] 3xl:mt-[-79px] relative z-10 w-full md:max-w-[320px] lg:max-w-[290px] xl:max-w-[370px] 2xl:max-w-[410px] 3xl:max-w-[500px]"
                >
                  <h3 className="text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] 3xl:text-[40px] font-bold text-black font-urbanist leading-tight md:leading-tight lg:leading-[32px] xl:leading-snug 2xl:leading-tight 3xl:leading-tight">
                    PG Diploma in Documentary & Corporate Filmmaking
                  </h3>
                  <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna.
                  </p>
                  <OrangeButtonWidget content="Discover Your Frame" />
                </ParallaxWidget>
              </ScrollWidget>
            </div>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default CourseSection;
