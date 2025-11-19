import { Fragment } from "react/jsx-runtime";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { AboutBg } from "@/helpers/ImageHelper";

const AboutHeroSection = () => {
  return (
    <Fragment>

      {/* ---------------- SECTION 1 ---------------- */}
      <section
        className="
          w-full bg-white py-2 
          h-auto 
          sm:min-h-[300px]
          md:min-h-[380px]
          lg:min-h-[450px]
          xl:min-h-[500px]
          2xl:min-h-[580px]
          3xl:min-h-[660px]
          4xl:min-h-[2228px]
        "
      >
        <ContainerWidget>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-4">

            {/* Heading */}
            <ScrollWidget animation="fadeUp" delay={0.1}>
              <h3 className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                xl:text-7xl 2xl:text-[70px] 3xl:text-[80px] 4xl:text-[95px]
                font-normal text-black font-urbanist
              ">
                About
              </h3>
            </ScrollWidget>

            {/* Sub heading */}
            <ScrollWidget animation="slideLeft" delay={0.2}>
              <p className="
                font-area-variable font-semibold 
                text-base md:text-lg lg:text-xl xl:text-2xl 
                2xl:text-3xl 3xl:text-[40px] 4xl:text-[48px] 
                text-black 
                sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] 
                xl:max-w-[550px] 2xl:max-w-[650px] 3xl:max-w-[700px] 4xl:max-w-[900px]
              ">
                At Light & Life Academy, it is all about passion for
                <span className="text-[#E97451] ml-2">
                  image making through photography.
                </span>
              </p>
            </ScrollWidget>

            {/* Paragraph 1 */}
            <ScrollWidget animation="fadeUp" delay={0.3}>
              <p className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              ">
                At about 2 centuries old, Photography is one of the youngest
                visual communication art forms, and yet, at the end of the 90s,
                there was no reputed institution in India for structured
                learning of professional photography.
              </p>
            </ScrollWidget>

            {/* Paragraph 2 */}
            <ScrollWidget animation="fadeUp" delay={0.4}>
              <p className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              ">
                Iqbal Mohamed and Anuradha Iqbal - a couple with illustrious
                careers in advertising photography and advertising, respectively,
                were very aware of this gap when they nurtured many an aspiring
                photographer at their studio in Mumbai. They decided to take the
                plunge into photography education and so, in 2001, Light & Life
                Academy came to be.
              </p>
            </ScrollWidget>

            {/* Paragraph 3 */}
            <ScrollWidget animation="fadeUp" delay={0.2}>
              <p className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              ">
                The objective was to provide affordable photography education of
                a high standard. Through ebbs and flows, they have worked
                tirelessly for the last 2 decades and inspired hundreds to
                discover and love the magic of photography.
              </p>
            </ScrollWidget>

            {/* Paragraph 4 */}
            <ScrollWidget animation="fadeUp" delay={0.3}>
              <p className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              ">
                LLA has been driven by passion from the very beginning, with every aspect
                of the institution carefully designed - the location, the architecture and facilities.
                From the outset, it has aimed to balance the positives of a contemporary pedagogy
                with the ethos of a Gurukul...
              </p>
            </ScrollWidget>

          </div>
        </ContainerWidget>
      </section>

      {/* ---------------- SECTION 2 ---------------- */}
      <section
        className="
          z-50 w-full bg-cover bg-bottom bg-no-repeat 
          min-h-[600px] 
          lg:min-h-[580px]
          xl:min-h-[700px] 
          2xl:min-h-[800px]
          3xl:min-h-[1100px]
          4xl:min-h-[1304px]
          bg-white text-white
        "
        style={{ backgroundImage: `url(${AboutBg.src})` }}
      >
        <ContainerWidget>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-4">
            <ScrollWidget animation="fadeUp" delay={0.4}>
              <p className="
                text-[12px] sm:text-[13px] lg:text-[14px] 
                xl:text-[16px] 2xl:text-[17px] 3xl:text-[18px] 4xl:text-[20px]
                font-normal text-black leading-normal 
                w-full 
                md:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] 
                3xl:max-w-[900px] 4xl:max-w-[1100px]
              ">
                The Academy was fortunate to get enthusiastic support from
                industry leaders - Kodak India, Eastman Kodak USA, Calumet-USA,
                Photoquip-India, ZenTask-India, Gretag Imaging-Switzerland and
                LMW-Coimbatore at the time of inception.
              </p>
            </ScrollWidget>
          </div>
        </ContainerWidget>
      </section>
    </Fragment>
  );
};

export default AboutHeroSection;
