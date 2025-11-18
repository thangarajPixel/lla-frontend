import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { FounderDummy1, FounderDummy2 } from "@/helpers/ImageHelper";
import ImageWidget from "@/components/widgets/ImageWidget";

const FounderSection = () => {
  return (
    <section className="w-full bg-[#ECECEC] py-8 md:py-12 lg:py-15 xl:py-15 2xl:py-20 3xl:py-24">
      <ContainerWidget>
        <div className="text-center space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-5 2xl:space-y-14 3xl:space-y-16">
          <ScrollWidget delay={0.1}>
            <h3
              className="font-urbanist font-normal text-black text-left md:text-center lg:text-center
              text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
              2xl:text-7xl 3xl:text-[80px]"
            >
              Founders
            </h3>
          </ScrollWidget>
          <ScrollWidget delay={0.1}>
            <p
              className="font-area-variable font-semibold text-black  text-left md:text-center lg:text-center
              text-base md:text-lg lg:text-xl xl:text-2xl 
              2xl:text-3xl 3xl:text-[40px]
              sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[550px]
              mx-auto"
            >
              Lorem ipsum
              <span className="text-[#E97451] ml-2">dolor sit amet,</span>
            </p>
          </ScrollWidget>
        </div>
        <div className="mt-5 md:mt-13 space-y-10 md:space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 items-center lg:max-w-[900px]">
            <ScrollWidget delay={0.2}>
              <div className="space-y-4 lg:max-w-[376px]">
                <h4 className="font-urbanist text-2xl md:text-3xl font-semibold text-[#E97451]">
                  Iqbal Mohamed
                </h4>
                <p className="text-[12px] lg:text-[13px] 3xl:text-[18px] font-normal font-mulish text-black leading-normal w-full md:max-w-[665px] mb-2">
                  Iqbal Mohamed is a visual artist and a mentor to many
                  generations of storytellers. His dedication to the craft, a
                  deep desire to unravel the meaning of life and humility is an
                  inspiration to many. He believes that everyone has the power
                  to change the world by seeing it differently.
                </p>
                <p className="text-[12px] lg:text-[13px] 3xl:text-[18px] font-normal font-mulish text-black leading-normal w-full md:max-w-[665px] mb-2">
                  After a graduation in history and political science and then
                  an MBA, Iqbal decided to follow his passion, photography. His
                  first step was to study professional photography at the
                  renowned Brooks Institute of Photography, ​California, USA. He
                  followed it up working with some of the celebrated
                  professional photographers in Hollywood like Dick Zimmerman,
                  Bill Werts & Jay Silverman. Iqbal then came back to India in
                  1988, amongst the first to do so, to make a career in
                  professional photography.
                </p>
                <OrangeButtonWidget content="Know More" />
              </div>
            </ScrollWidget>
            <ScrollWidget delay={0.3}>
              <div className="w-full max-h-[520px] lg:max-h-[600px] lg:flex lg:justify-start">
                <ImageWidget
                  src={FounderDummy1}
                  alt="Founder"
                  width={500}
                  height={600}
                  className="w-[300px] h-[400px] object-cover"
                />
              </div>
            </ScrollWidget>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-15 items-center">
            <ScrollWidget delay={0.3}>
              <div className="w-full max-h-[520px] lg:max-h-[600px] lg:flex lg:justify-end ">
                <ImageWidget
                  src={FounderDummy2}
                  alt="Founder"
                  width={500}
                  height={600}
                  className="w-[300px] h-[380px] object-cover"
                />
              </div>
            </ScrollWidget>
            <ScrollWidget delay={0.2}>
              <div className="space-y-4  md:pl-5 lg:pl-10  lg:max-w-[416px]">
                <h4 className="font-urbanist text-2xl md:text-3xl font-semibold text-[#E97451]">
                  Anuradha Iqbal
                </h4>
                <p className=" font-mulish text-[12px] lg:text-[13px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[665px] mb-2">
                  Anuradha Iqbal, is the co-founder and director of LLA. She
                  holds a postgraduate degree in Economics from Mumbai
                  University and a Diploma in Advertising & Marketing. Her
                  career started in the field of Advertising where she was in
                  charge of handling brands like Godrej, Taj group of Hotels,
                  Amul, Philips, Ciba Geigy, etc. and grew to become the head of
                  FCB Ulka in Bangalore. Along the way, Anuradha helped create
                  many memorable and award winning campaigns.
                </p>
                <p className=" font-mulish text-[12px] lg:text-[13px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[665px] mb-2">
                  Advertising campaigns brought Anuradha and Iqbal Mohamed
                  together. In due course, she was handling operations, planning
                  and business development for Iqbal Mohamed Photography and
                  together they reached greater heights.
                </p>
                <OrangeButtonWidget content="Know More" />
              </div>
            </ScrollWidget>
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default FounderSection;
