import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Dummy1 } from "@/helpers/ImageHelper";

const GallerySection = () => {
  return (
    <section className="w-full bg-[#ECECEC] flex flex-col z-10! relative py-12 md:py-16 lg:py-20 pb-16 md:pb-26">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="flex flex-col items-center gap-2.5 md:gap-4.5 mb-8 md:mb-12 lg:mb-15">
            <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-semibold md:font-normal text-black font-urbanist text-center">
              Gallery
            </h3>
            <p className="font-area-variable font-semibold text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl text-black text-center">
              Gallery
              <span className="text-[#E97451] pl-2"> Light & Life Academy</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_) => (
              <div key={Math.random()} className="flex flex-col">
                <div className="relative w-full aspect-4/3 overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Gallery"
                    fill
                    className="object-cover 3xl:max-w-[300px] 3xl:max-h-[200.31px]"
                  />
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-base 3xl:text-[24px] font-semibold text-black font-urbanist mt-3 3xl:-mt-4">
                  Study under an industry-experienced faculty
                </p>
              </div>
            ))}
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default GallerySection;
