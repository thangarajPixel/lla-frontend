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
      className:
        "mt-0 md:mt-15 lg:mt-15 xl:mt-15 2xl:mt-15 3xl:mt-20 4xl:mt-25",
    },
    {
      id: "faculty-1",
      name: "Nithya JB",
      description: "(Manager Operations)",
      className:
        "mt-0 md:mt-45 lg:mt-45 xl:mt-45 2xl:mt-45 3xl:mt-50 4xl:mt-55",
    },
    { id: "faculty-2", name: "Devaraj", description: "(Manager, Accounts)" },
    {
      id: "faculty-3",
      name: "Rajendran",
      description: "(Equipment and Store Supervisor)",
      className:
        " mt-0 md:mt-15 lg:mt-15 xl:mt-15 2xl:mt-15 3xl:mt-20 4xl:mt-25",
    },
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 3xl:py-32 4xl:py-36">
      <ContainerWidget>
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12 3xl:space-y-16 4xl:space-y-20">
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

          <ScrollWidget delay={0.15}>
            <p
              className="
              font-area-variable font-semibold text-black 
              text-left sm:text-center
              text-base sm:text-lg md:text-xl lg:text-2xl 
              xl:text-3xl 2xl:text-[32px] 3xl:text-[40px] 4xl:text-[45px]
              max-w-[1100px] mx-auto
            "
            >
              Lorem ipsum{" "}
              <span className="text-[#E97451] ml-2">dolor sit amet,</span>
            </p>
          </ScrollWidget>
        </div>

        <div className="py-8 pb-9 sm sm:py-8 md:py-10 lg:py-12 xl:py-12 2xl:py-16 3xl:py-20 4xl:py-24">
          <div
            className="
            grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4
            2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-4
            gap-4 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4
            2xl:gap-5 3xl:gap-6 4xl:gap-7
          "
          >
            {facultyData.map((faculty) => (
              <ScrollWidget key={faculty.id} animation="scale" delay={0.1}>
                <div
                  className={`
                            ${faculty.className}
                            group
                            bg-white
                            hover:bg-[#E97451]/20 cursor-pointer
                            transition-colors duration-500 ease-out
                            px-3 py-3 flex flex-col
                            h-[250px] sm:h-[300px] md:h-[450px] lg:h-[300px]
                            xl:h-[340px] 2xl:h-[400px] 3xl:h-[450px] 4xl:h-[500px]
                          `}
                >
                  <ParallaxWidget speed={-0.1}>
                    <div className="w-full aspect-square overflow-hidden">
                      <ImageWidget
                        src={TeamDummy4}
                        alt="Faculty"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </ParallaxWidget>

                  <h3
                    className="
                    font-urbanist font-bold text-black 
                    mt-3 leading-tight
                    text-[12px] sm:text-lg md:text-xl lg:text-[20px]
                    xl:text-[16px] 2xl:text-[24px] 3xl:text-[26px] 4xl:text-[28px]
                  "
                  >
                    {faculty.name}
                  </h3>

                  <p
                    className="
                    font-mulish text-black
                    text-[10px] sm:text-sm md:text-base lg:text-[12px]
                    xl:text-[12px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px]
                  "
                  >
                    {faculty.description}
                  </p>

                  <div className="self-start mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <OrangeButtonWidget
                      className="h-7 sm:h-8 md:h-9 lg:h-7 xl:h-7 
                    2xl:h-10 3xl:h-11 4xl:h-12 
                    w-25 sm:w-24 md:w-28 lg:w-20 xl:w-20 
                    2xl:w-32 3xl:w-36 4xl:w-40
                    text-[10px] sm:text-sm md:text-base lg:text-[12px] xl:text-[12px] 2xl:text-[18px] 
                    3xl:text-[20px] 4xl:text-[22px]"
                      content="Know More"
                    />
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
          <ScrollWidget delay={0.2} animation="fadeUp">
            <div
              className="
                relative w-full 
                h-[150px] sm:h-[380px] md:h-[420px] 
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
