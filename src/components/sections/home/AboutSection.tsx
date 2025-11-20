import ContainerWidget from "@/components/widgets/ContainerWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";

const AboutSection = () => {
  return (
    <section className="w-full h-screen bg-[#ECECEC] flex items-center justify-center z-40 relative">
      <ContainerWidget>
      <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <div className="space-y-3.5 md:space-y-3 lg:space-y-5">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
              About LLA
              </h3>
              <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              Guided by Light for <br className="hidden sm:block" /> 
                <span className="text-[#E97451]">25 Years</span>
              </p>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[450px]">
              In thought, in learning, and in spirit, what began as Iqbal Mohamed’s dream to establish India’s first professional photography institute has grown into a community that continues to explore, question, and create with purpose.
              </p>
              <OrangeButtonWidget content="Step into the LLA" />
            </div>
          </div>

      </ContainerWidget>
    </section>
  );
};

export default AboutSection;
