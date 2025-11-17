import ContainerWidget from "@/components/widgets/ContainerWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Building } from "@/helpers/ImageHelper";

const CampusSection = () => {
  return (
    <section
      className="w-full h-screen bg-fixed bg-cover bg-bottom bg-no-repeat py-20"
      style={{
        backgroundImage: `url(${Building.src})`,
      }}
    >
      <ContainerWidget>
        <ScrollWidget animation="slideRight">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <div className="space-y-2 md:space-y-3 lg:space-y-5">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                Campus
              </h3>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] font-normal text-black">
                Lorem ipsum dolor
                <span className="text-[#E97451] font-normal">
                  {" "}
                  sit amet, consectetur{" "}
                </span>
              </p>
              <p className="text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-base 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <OrangeButtonWidget content="Experience the View" />
            </div>
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default CampusSection;
