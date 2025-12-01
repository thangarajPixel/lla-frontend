import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Building } from "@/helpers/ImageHelper";

const OtherInfoSection = () => {
  const data = {
    __component: "other-info-section",
    id: 1,
    Title: "Other Information",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    Bg_img: {
      id: 1,
      name: "Other Info Background",
      url: "",
    },
  };

  return (
    <section
      className="w-full h-screen md:bg-fixed bg-cover bg-right bg-no-repeat sm:py-20 py-10 3xl:h-[1043px] bg-[#F6F6F6]"
      style={{
        backgroundImage: `url(${data.Bg_img.url || Building.src})`,
      }}
    >
      <ContainerWidget>
        <ScrollWidget animation="slideRight">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                {data.Title}
              </h3>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                {data.Description}
              </p>
            </div>
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default OtherInfoSection;
