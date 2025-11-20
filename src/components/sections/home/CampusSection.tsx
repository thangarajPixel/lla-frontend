import ContainerWidget from "@/components/widgets/ContainerWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Building } from "@/helpers/ImageHelper";

const CampusSection = () => {
  return (
    <section
      className="w-full h-screen bg-fixed bg-cover bg-bottom bg-no-repeat sm:py-20 py-10"
      style={{
        backgroundImage: `url(${Building.src})`,
      }}
    >
      <ContainerWidget>
        <ScrollWidget animation="slideRight">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <div className="space-y-3.5 md:space-y-3 lg:space-y-5">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
                Campus
              </h3>
              <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
                Deliberately Designed,
                <span className="text-[#E97451] ml-2">Endlessly Inspiring</span>
              </p>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
                Every space is thoughtfully built to nurture learning. The
                campus invites reflection, exploration, and creativity at every
                turn.
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
