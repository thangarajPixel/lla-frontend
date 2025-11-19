import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ParallaxWidget from "@/components/widgets/ParallaxWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { TeamDummy4, TeamGroupDummy } from "@/helpers/ImageHelper";

const TeamSection = () => {
  const facultyData = [
    {
      id: "faculty-0",
      name: "Kavitha Swaminathan",
      description: "(Manager, Academics)",
    },
    {
      id: "faculty-1",
      name: "Nithya JB",
      description: "(Manager Operations)",
    },
    {
      id: "faculty-2",
      name: "Devaraj",
      description: "(Manager, Accounts)",
    },
    {
      id: "faculty-3",
      name: "Rajendran",
      description: "(Equipment and Store Supervisor)",
    },
  ];
  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-14 xl:py-14 2xl:py-20 3xl:py-24 4xl:py-28">
      <ContainerWidget>
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
        <div
          className="bg-white  px-2
    py-5 xs:py-5 sm:py-5 md:py-6 lg:py-5 xl:py-5 2xl:py-7 3xl:py-9 4xl:py-11"
        >
          <div
            className="
      grid 
      grid-cols-1 
      xs:grid-cols-1
      sm:grid-cols-2 
      md:grid-cols-4
      lg:grid-cols-4
      xl:grid-cols-4
      2xl:grid-cols-4
      3xl:grid-cols-4
      4xl:grid-cols-4
      gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-10 3xl:gap-12 4xl:gap-14
    "
          >
            {facultyData.slice(0, 4).map((faculty, index) => (
              <ScrollWidget
                key={faculty.id}
                animation="scale"
                delay={0.1 + index * 0.1}
              >
                <div
                  className="bg-white group hover:bg-[#E97451]/20 cursor-pointer px-2 py-2 
     h-[300px] xs:h-[300px] sm:h-[300px] md:h-[300px] lg:h-[300px] xl:h-[300px] 
     2xl:h-[300px] 3xl:h-[392px] 3xl:w-[300px]  
     flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-2 xl:gap-2 2xl:gap-2 3xl:gap-4 4xl:gap-6"
                >
                  <ParallaxWidget speed={0.3}>
                    <div className="w-full aspect-square sm:aspect-auto">
                      <ImageWidget
                        src={TeamDummy4}
                        alt="Faculty"
                        className="object-cover mb-2"
                      />
                    </div>
                  </ParallaxWidget>
                  <h3
                    className="
              font-urbanist font-bold text-black leading-tight 
              text-lg sm:text-[12px] md:text-[14px] lg:text-[16px]
              xl:text-[18px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px]
            "
                  >
                    {faculty.name}
                  </h3>
                  <p
                    className="
              font-mulish text-black font-normal leading-relaxed line-clamp-2
              text-sm sm:text-[10px] md:text-[10px] lg:text-[12px]
              xl:text-[14px] 2xl:text-[18px] 3xl:text-[22px] 4xl:text-[24px]
              overflow-hidden text-ellipsis
            "
                  >
                    {faculty.description}
                  </p>

                  <div className="self-start mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <OrangeButtonWidget content="Know More" />
                  </div>
                </div>
              </ScrollWidget>
            ))}
          </div>
        </div>

        <div
          className="bg-[#ECECEC] py-5 sm:py-5 md:py-6 lg:py-5 xl:py-5 2xl:py-7 3xl:py-9 4xl:py-11 
        px-4 sm:px-5 md:px-6 lg:px-5 xl:px-5 2xl:px-7 3xl:px-9 4xl:px-11"
        >
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
