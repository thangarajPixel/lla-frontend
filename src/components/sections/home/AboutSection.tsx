import ContainerWidget from "@/components/widgets/ContainerWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import { Dummy1 } from "@/helpers/ImageHelper";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#ECECEC] flex items-center justify-center z-40 relative pt-[300px] pb-60">
      <ContainerWidget>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
          <div className="space-y-3.5 md:space-y-3 lg:space-y-5">
            <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
              About LLA
            </h3>
            <p className="font-area-variable font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
              Guided by Light for <br className="hidden sm:block" />
              <span className="text-[#E97451]">25 Years</span>
            </p>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[450px]">
              In thought, in learning, and in spirit, what began as Iqbal
              Mohamed's dream to establish India's first professional
              photography institute has grown into a community that continues to
              explore, question, and create with purpose.
            </p>
            <OrangeButtonWidget content="Step into the LLA" />
          </div>
          <div>
             <ImageWidget src={Dummy1} alt="About 3" className="absolute w-[300px] h-[250px] mt-[-200px] ml-[150px] object-cover opacity-40" />
             <ImageWidget src={Dummy1} alt="About 1"  className="w-[500px] h-[350px] ml-[-100px] object-cover relative z-10" />
             <ImageWidget src={Dummy1} alt="About 2"  className="absolute w-[420px] h-[280px] mt-[-150px] ml-[80px] object-cover opacity-40" />
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default AboutSection;
