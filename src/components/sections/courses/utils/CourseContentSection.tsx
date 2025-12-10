import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import ImageLayout from "./ImageLayout";
import type { CourseContentData } from "./types";

const parseDuration = (
  duration: string,
): { heading: string; subHeading: string } => {
  const match = duration.match(/^(Duration:\s*)(.+)$/i);
  if (match) {
    return {
      heading: match[1].trim(),
      subHeading: match[2].trim(),
    };
  }
  return {
    heading: "Duration:",
    subHeading: duration,
  };
};

const CourseContentSection = ({ data }: { data: CourseContentData }) => {
  const durationParts = parseDuration(data.Duration ?? "");
  const headerData = {
    __component: "other-info-section",
    id: data.id,
    Title: data.Title,
    Heading: durationParts.heading,
    SubHeading: durationParts.subHeading,
    Description: data.Description,
  };

  const sectionsData = data.Content_card.map((card) => {
    const gridBreakpoint = "lg";
    const delay = 0.2;

    return {
      type: card.Type,
      section: card.Section,
      title: card.Title,
      description: card.Description,
      gridBreakpoint,
      delay,
      images: card.Image,
      OuterTitle: card.OuterTitle,
      OuterDescription: card.OuterDescription,
    };
  });

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16 mb-12">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-normal md:font-normal text-black font-urbanist">
                {headerData.Title}
              </h3>
              <p className="font-mulish font-normal text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-[40px] text-black">
                {headerData.Heading}
                {headerData.SubHeading && (
                  <span className="text-[#E97451] pl-2">
                    {headerData.SubHeading}
                  </span>
                )}
              </p>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal max-w-full md:max-w-[660px]">
                {headerData.Description}
              </p>
            </div>
          </div>
        </ScrollWidget>

        {sectionsData.map((section, index) => (
          <ScrollWidget
            key={`section-${data.Content_card[index]?.id || index}`}
            animation="fadeUp"
            delay={section.delay}
          >
            {section.OuterTitle && (
              <h3
                className={`text-3xl ${index === 0 ? "" : "mt-10"} xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-normal md:font-normal text-black font-urbanist`}
              >
                {section.OuterTitle}
              </h3>
            )}
            {section.OuterDescription && (
              <HTMLWidget
                content={section.OuterDescription}
                tag="p"
                className="mb-7 mt-2"
              />
            )}
            <div
              className={`grid grid-cols-1 ${section.gridBreakpoint === "md" ? "md:grid-cols-[58%_40%]" : "lg:grid-cols-[58%_40%]"} gap-6 bg-[#ECECEC] w-full p-8 pb-9 ${index > 0 ? "mt-8" : ""}`}
            >
              <div className="flex flex-col gap-4 w-full">
                <h3 className="font-mulish text-xl xss:text-[16px] text-[#E97451] font-normal 3xl:text-[24px]">
                  {section.section}
                </h3>
                <h2 className="font-urbanist text-[37px] xss:text-[24px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                  {section.title}
                </h2>
                {section.description && (
                  <HTMLWidget
                    content={section.description}
                    className="text-[16px] lg:text-[13px] 3xl:text-[18px] font-normal font-mulish"
                    tag="div"
                  />
                )}
              </div>
              <div className="relative">
                <ImageLayout type={section.type} images={section.images} />
              </div>
            </div>
          </ScrollWidget>
        ))}
      </ContainerWidget>
    </section>
  );
};

export default CourseContentSection;
