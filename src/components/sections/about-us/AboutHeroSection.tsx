import { Fragment } from "react/jsx-runtime";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { AboutBg } from "@/helpers/ImageHelper";

const AboutHeroSection = () => {
  return (
    <Fragment>
      <section className="w-full h-auto bg-white py-2">
        <ContainerWidget>
          <div className="flex flex-col items-start justify-start gap-2 md:gap-4">
            <ScrollWidget animation="fadeUp" delay={0.1}>
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                About
              </h3>
            </ScrollWidget>
            <ScrollWidget animation="slideLeft" delay={0.2}>
              <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[550px]">
                At Light & Life Academy, it is all about passion for
                <span className="text-[#E97451] ml-2">
                  {" "}
                  image making through photography.
                </span>
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.3}>
              <p className="text-[12px] lg:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[665px]">
                At about 2 centuries old, Photography is one of the youngest
                visual communication art forms, and yet, at the end of the
                90s, there was no reputed institution in India for structured
                learning of professional photography.
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.4}>
              <p className="text-[12px] lg:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[665px] mb-0">
                Iqbal Mohamed and Anuradha Iqbal - a couple with illustrious
                careers in advertising photography and advertising,
                respectively, were very aware of this gap when they nurtured
                many an aspiring photographer at their studio in Mumbai. They
                decided to take the plunge into photography education and so,
                in 2001, Light & Life Academy came to be.
              </p>
            </ScrollWidget>
          </div>
        </ContainerWidget>
      </section>
      <section
        className="z-50 w-full bg-cover bg-bottom bg-no-repeat min-h-[870px]  bg-white text-white"
        style={{ backgroundImage: `url(${AboutBg.src})` }}
      >
        <ContainerWidget>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-4">
            <ScrollWidget animation="fadeUp" delay={0.2}>
              <p className="text-[12px] lg:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[665px]">
                The objective was to provide affordable photography education
                of a high standard. Through ebbs and flows, they have worked
                tirelessly for the last 2 decades and inspired hundreds to
                discover and love the magic of photography
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.3}>
              <p className="text-[12px] lg:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[665px]">
                LLA has been driven by passion from the very beginning, with
                every aspect of the institution carefully designed - the
                location, the architecture and facilities. From the outset, it
                has aimed to balance the positives of a contemporary pedagogy
                with the ethos of a Gurukul. The approach is to ensure that
                each individual student learns photography at a conceptual
                level, at their own pace. The academy lays great emphasis in
                guiding individuals to develop their vision while nurturing
                their inner vision. This belief is symbolised in the LLA logo.
              </p>
            </ScrollWidget>
            <ScrollWidget animation="fadeUp" delay={0.4}>
              <p className="text-[12px] lg:text-[14px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[665px]">
                The Academy was fortunate to get enthusiastic support from
                industry leaders - Kodak India, Eastman Kodak USA,
                Calumet-USA, Photoquip-India, ZenTask-India, Gretag
                Imaging-Switzerland and LMW- Coimbatore at the time of
                inception.
              </p>
            </ScrollWidget>
          </div>
        </ContainerWidget>
      </section>
    </Fragment>
  );
};

export default AboutHeroSection;
