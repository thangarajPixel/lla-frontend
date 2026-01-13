import AccordionWidget from "@/components/widgets/AccordionWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Dummy12 } from "@/helpers/ImageHelper";
import type { OtherInfoData } from "./types";

const OtherInfoSection = ({ data }: { data: OtherInfoData }) => {
  const items = data.Info
    ? data.Info.map((info) => ({
        value: `item-${info.id}`,
        title: info.Title,
        content: info.Description,
      }))
    : [];

  return (
    <section className="w-full min-h-[1100px] md:min-h-[700px] lg:min-h-[900px] xl:min-h-[1000px] 2xl:min-h-[1100px] 3xl:min-h-[1446px] bg-cover  bg-no-repeat bg-position-[bottom_left_-200px] md:bg-center sm:bg-position-center md:bg-fixed relative bg-[#ECECEC] py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat sm:bg-position-center md:hidden"
        style={{ backgroundImage: `url(${Dummy12.src})` }}
      />
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-no-repeat bg-center bg-fixed"
        style={{ backgroundImage: `url(${Dummy12.src})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #ECECEC 0%, #ECECEC 25%, rgba(236, 236, 236, 0.6) 45%, rgba(236, 236, 236, 0.3) 65%, rgba(236, 236, 236, 0.1) 80%, transparent 100%)",
        }}
      />
      <ContainerWidget>
        <ScrollWidget animation="fadeUp">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <div className="space-y-0">
              <h2 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[64px] font-normal md:font-normal text-black font-urbanist leading-[26px]!">
                {data.Title}
              </h2>
              <ParagraphWidget
                className={`max-w-[600px] ${data.Description ? "mt-5 md:mt-10" : "mt-7 md:mt-20"}`}
              >
                {data.Description}
              </ParagraphWidget>
            </div>
            {items.length > 0 && (
              <AccordionWidget
                type="single"
                collapsible
                defaultValue={items[0]?.value}
                items={items}
                columns={2}
                className="md:-mt-5"
              />
            )}
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default OtherInfoSection;
