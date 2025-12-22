import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import type { OverviewData } from "./types";

const GallerySection = ({ data }: { data: OverviewData }) => {
  return (
    <section className="w-full bg-[#ECECEC] flex flex-col z-10! relative py-12 md:py-16 lg:py-20 pb-16 md:pb-26">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp" delay={0.1}>
          <div className="flex flex-col items-start md:items-center justify-start md:justify-center gap-2.5 md:gap-4.5 mb-8 md:mb-12 lg:mb-15">
            <h3 className="text-3xl font-normal xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl md:font-normal text-black font-urbanist text-left md:text-center">
              {data.Title}
            </h3>
            {data.Heading && (
              <p className="font-mulish font-normal text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl text-black">
                {data.Heading}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.Card.map((card) => {
              const imageUrl = Array.isArray(card.Image)
                ? card.Image.length > 0 && card.Image[0]?.url
                  ? getS3Url(card.Image[0].url)
                  : null
                : card.Image?.url
                  ? getS3Url(card.Image.url)
                  : null;

              if (!imageUrl) return null;

              return (
                <div key={card.id} className="flex flex-col">
                  <div className="relative w-full aspect-4/3 overflow-hidden">
                    <ImageWidget
                      src={imageUrl}
                      alt={card.Title || "Gallery"}
                      fill
                      className="object-cover 3xl:max-w-[300px] 3xl:max-h-[200.31px]"
                    />
                  </div>
                  {card.Title && (
                    <p className="text-sm xss:text-[16px] sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-base 3xl:text-[24px] font-semibold text-black font-urbanist mt-3 3xl:-mt-4">
                      {card.Title}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default GallerySection;
