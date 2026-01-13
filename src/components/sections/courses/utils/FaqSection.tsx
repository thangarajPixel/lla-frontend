import AccordionWidget from "@/components/widgets/AccordionWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import type { FaqData } from "./types";

const FaqSection = ({ data }: { data: FaqData }) => {
  const items = data.QA.map((qa) => ({
    value: `item-${qa.id}`,
    title: qa.Title,
    content: qa.Description,
  }));

  return (
    <section className="w-full  bg-cover  bg-no-repeat bg-position-[bottom_left_-200px] md:bg-center sm:bg-position-center md:bg-fixed relative bg-[#ECECEC] py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <h2 className="text-left md:text-center 3xl:text-[64px] text-3xl 2xl:text-[50px] md:leading-5 font-normal md:font-normal text-black font-urbanist">
              {data.Title}
            </h2>
            {items.length > 0 && (
              <AccordionWidget
                type="single"
                collapsible
                defaultValue={items[0]?.value}
                items={items}
                columns={2}
              />
            )}
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default FaqSection;
