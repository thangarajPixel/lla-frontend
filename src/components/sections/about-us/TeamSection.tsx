import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import {
  TeamGroupDummy,
} from "@/helpers/ImageHelper";

const TeamSection = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-14 xl:py-14 2xl:py-20 3xl:py-24 4xl:py-28">
      <ContainerWidget>
        {/* TITLE + SUBTITLE */}
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-6 2xl:space-y-12 3xl:space-y-16 4xl:space-y-20">
          <ScrollWidget delay={0.1}>
            <h3
              className="
                font-urbanist font-normal text-black 
                text-left sm:text-center
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                xl:text-6xl 2xl:text-[70px] 3xl:text-[80px] 4xl:text-[90px]
              "
            >
              The Team
            </h3>
          </ScrollWidget>

          <ScrollWidget delay={0.1}>
            <p
              className="
                font-area-variable font-semibold text-black 
                text-left sm:text-center
                text-base sm:text-lg md:text-xl lg:text-2xl 
                xl:text-3xl 2xl:text-[32px] 3xl:text-[40px] 4xl:text-[45px]
                sm:max-w-[480px] md:max-w-[650px] lg:max-w-[750px] xl:max-w-[850px]
                2xl:max-w-[900px] 3xl:max-w-[1000px] 4xl:max-w-[1100px]
                mx-auto mb-8
              "
            >
              Lorem ipsum
              <span className="text-[#E97451] ml-2">dolor sit amet,</span>
            </p>
          </ScrollWidget>
        </div>

        {/* IMAGE + CONTENT */}
        <div className="bg-[#ECECEC] py-5 sm:py-5 md:py-6 lg:py-5 xl:py-5 2xl:py-7 3xl:py-9 4xl:py-11 
        px-4 sm:px-5 md:px-6 lg:px-5 xl:px-5 2xl:px-7 3xl:px-9 4xl:px-11">
          <ScrollWidget delay={0.5} animation="fadeUp">
            <div
              className="
                relative w-full 
                h-[320px] sm:h-[380px] md:h-[420px] 
                lg:h-[400px] xl:h-[430px] 2xl:h-[520px] 
                3xl:h-[600px] 4xl:h-[554.1231px]
              "
              style={{
                maxWidth: "1242px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <ImageWidget
                src={TeamGroupDummy}
                alt="Team"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-5 py-4">
              <h5
                className="
                  font-urbanist font-normal text-[#E97451] text-left
                  text-xl sm:text-xl md:text-xl lg:text-2xl 
                  xl:text-3xl 2xl:text-[55px] 3xl:text-[70px] 4xl:text-[80px]
                "
              >
                Akkas & Annas
              </h5>

              <p
                className="
                  font-mulish font-normal text-black leading-normal
                  text-xs sm:text-sm md:text-base lg:text-[15px] 
                  xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px]
                  w-full
                "
              >
                The Akkas and Annas form the backbone of the LLA family. They
                ensure that the campus is in pristine condition and do their
                best to ensure the students are well fed. They embody the spirit
                of the Nilgiris and its people – welcoming, generous and jovial.
                It’s no surprise that they are the most popular folks on campus.
              </p>
            </div>
          </ScrollWidget>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default TeamSection;
