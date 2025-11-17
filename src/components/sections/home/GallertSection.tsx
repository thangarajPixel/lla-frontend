import ImageWidget from "@/components/widgets/ImageWidget";
import OrangeButtonWidget from "@/components/widgets/OrangeButtonWidget";
import { Gallery } from "@/helpers/ImageHelper";

const GallertSection = () => {
  const galleryImages = Array(8)
    .fill(null)
    .map((_, idx) => ({
      id: `gallery-${idx}`,
      src: Gallery,
      firstId: `gallery-${idx}-first`,
      secondId: `gallery-${idx}-second`,
    }));

  const duplicatedImages = [
    ...galleryImages.map((item) => ({ ...item, uniqueId: item.firstId })),
    ...galleryImages.map((item) => ({ ...item, uniqueId: item.secondId })),
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 max-w-[1920px] mx-auto lg:w-[90vw]">
      <div className="mb-6 md:hidden text-left pl-5 lg:text-center lg:pl-0">
        <h2 className="text-3xl font-normal text-black font-urbanist mb-2">
          Gallery
        </h2>
        <p className="font-area-variable font-semibold text-base text-black">
          From LLA to <span className="text-[#E97451] ml-2">the world</span>
        </p>
        <div className="mt-6 text-left lg:text-center md:hidden">
          <OrangeButtonWidget content="View More" />
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-5 gap-9 2xl:gap-6">
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <div />
        <div className="flex flex-col justify-end items-center gap-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[80px] font-normal text-black font-urbanist">
            Gallery
          </h2>
          <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
            From LLA to
          </p>
          <p className="font-area-variable font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-[40px] text-black">
            <span className="text-[#E97451] ml-2">the world</span>
          </p>
        </div>
        <div />
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <div className="text-center flex items-start justify-center">
          <OrangeButtonWidget content="View More" />
        </div>
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <div />
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <div>
          <ImageWidget
            src={Gallery}
            alt="Gallery"
            className="w-full min-h-[350px] mt-20 max-h-[250px] object-cover"
          />
        </div>
        <ImageWidget
          src={Gallery}
          alt="Gallery"
          className="w-full max-h-[250px] object-cover"
        />
        <div />
      </div>

      <div className="lg:hidden space-y-4 overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-left gap-4">
            {duplicatedImages.map((item) => (
              <div
                key={`row1-${item.uniqueId}`}
                className="relative shrink-0 w-[45vw] aspect-square overflow-hidden"
              >
                <ImageWidget
                  src={item.src}
                  alt="Gallery"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {duplicatedImages.map((item) => (
              <div
                key={`row1-duplicate-${item.uniqueId}`}
                className="relative shrink-0 w-[45vw] aspect-square overflow-hidden"
              >
                <ImageWidget
                  src={item.src}
                  alt="Gallery"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-right gap-4">
            {duplicatedImages.map((item) => (
              <div
                key={`row2-${item.uniqueId}`}
                className="relative shrink-0 w-[45vw] aspect-square overflow-hidden"
              >
                <ImageWidget
                  src={item.src}
                  alt="Gallery"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {duplicatedImages.map((item) => (
              <div
                key={`row2-duplicate-${item.uniqueId}`}
                className="relative shrink-0 w-[45vw] aspect-square overflow-hidden"
              >
                <ImageWidget
                  src={item.src}
                  alt="Gallery"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallertSection;
