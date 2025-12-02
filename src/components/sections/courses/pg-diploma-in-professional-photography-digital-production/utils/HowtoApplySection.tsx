import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Apply1, Apply2, Apply3 } from "@/helpers/ImageHelper";

const steps = [
  {
    number: "01",
    image: Apply1,
    title: "Complete the Online application process",
    description:
      "Fill in the application form with all the required details. If your application has been shortlisted, you will be called for a personal interview at the LLA Campus",
  },
  {
    number: "02",
    image: Apply2,
    title: "Personal Interview",
    description:
      "This will be held on campus. It is a half-day process. Details will be shared via email.",
  },
  {
    number: "03",
    image: Apply3,
    title: "Offer of Admission",
    description:
      "After the personal interview, if you have been selected, the offer of admission letter will be handed over. Our student affairs manager will take you through the process in detail.",
  },
];

const HowtoApplySection = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-16 lg:py-20 3xl:py-24">
      <ContainerWidget>
        <div className="flex flex-col items-center gap-8 md:gap-12 lg:gap-16">
          <ScrollWidget delay={0.1} animation="fadeUp">
            <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
              How To Apply
            </h2>
          </ScrollWidget>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {steps.map((step, index) => {
              return (
                <ScrollWidget
                  key={step.number}
                  delay={0.2 + index * 0.1}
                  animation="fadeUp"
                >
                  <div className="relative flex flex-col border border-[#E97451] bg-white px-4 py-2 pb-4 3xl:p-6 min-h-[280px]">
                    <div className="absolute top-6 right-6 lg:top-6 lg:right-6">
                      <span className="text-[#E97451]/20 font-urbanist text-5xl sm:text-[60px] 3xl:text-[80px] font-normal leading-none">
                        {step.number}
                      </span>
                    </div>
                    <div className="relative mb-4 lg:mb-6 w-18 h-18 flex items-center justify-center">
                      <ImageWidget
                        src={step.image}
                        alt={step.title}
                        className="w-[60px] h-[60px] 3xl:w-[80px] 3xl:h-[80px] object-contain"
                      />
                    </div>

                    <h3 className="text-[#E97451] font-urbanist text-lg sm:text-[18px] 3xl:text-[24px] font-normal mb-3 pr-16 lg:pr-20">
                      {step.title}
                    </h3>

                    <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal max-w-full md:max-w-[760px]">
                      {step.description}
                    </p>
                  </div>
                </ScrollWidget>
              );
            })}
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default HowtoApplySection;
