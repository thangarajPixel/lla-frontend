import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { cn } from "@/lib/utils";
import ImageLayout from "./ImageLayout";
import type { CourseContentData, ImageData } from "./types";

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

const CourseContentSection = ({
  data,
  isHeaderVisible,
}: {
  data: CourseContentData;
  isHeaderVisible?: boolean;
}) => {
  const durationParts = parseDuration(data.Duration ?? "");
  const headerData = {
    __component: "other-info-section",
    id: data.id,
    Title: data.Title,
    Heading: durationParts.heading,
    SubHeading: durationParts.subHeading,
    Description: data.Description,
  };

  const groupedSections = data.Content_card.reduce(
    (groups, card) => {
      const gridBreakpoint = "lg";
      const delay = 0.2;

      const sectionData = {
        id: card.id,
        type: card.Type,
        section: card.Section,
        title: card.Title,
        description: card.Description,
        gridBreakpoint,
        delay,
        images: card.Image,
      };

      if (card.OuterTitle) {
        groups.push({
          OuterTitle: card.OuterTitle,
          OuterDescription: card.OuterDescription,
          sections: [sectionData],
        });
      } else {
        if (groups.length === 0) {
          groups.push({
            OuterTitle: null,
            OuterDescription: null,
            sections: [sectionData],
          });
        } else {
          groups[groups.length - 1].sections.push(sectionData);
        }
      }

      return groups;
    },
    [] as Array<{
      OuterTitle: string | null;
      OuterDescription: string | null;
      sections: Array<{
        id: number;
        type: string;
        section: string | null;
        title: string | null;
        description: string;
        gridBreakpoint: string;
        delay: number;
        images: ImageData[] | null;
      }>;
    }>,
  );

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16 mb-12">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[64px] font-normal md:font-normal text-black font-urbanist">
                {headerData.Title}
              </h3>
              <h3 className="font-mulish font-normal text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-[40px] text-black">
                {headerData.Heading}
                {headerData.SubHeading && (
                  <span className="text-[#E97451] pl-2">
                    {headerData.SubHeading}
                  </span>
                )}
              </h3>
              <HTMLWidget
                content={headerData.Description}
                tag="p"
                className="font-mulish text-[16px] md:text-[17px] 2xl:text-[18px] font-normal text-black leading-[26px]"
              />
            </div>
          </div>
        </ScrollWidget>

        {groupedSections.map((group, groupIndex) => (
          <div
            key={
              group.OuterTitle || `group-${group.sections[0]?.id ?? groupIndex}`
            }
            className="w-full"
          >
            {group.OuterTitle && (
              <div
                className={cn(
                  "bg-white pb-1 pt-4 2xxl:pt-10 -mt-12 md:sticky z-30 transition-all duration-500",
                  isHeaderVisible
                    ? "top-0"
                    : "top-16 xl:top-16 2xl:top-18 3xl:top-22",
                )}
              >
                <h3
                  className={`text-3xl ${!group.OuterDescription && "mb-4"} xss:text-[32px] md:text-[36px] font-normal md:font-normal text-black font-urbanist`}
                >
                  {group.OuterTitle}
                </h3>
                {group.OuterDescription && (
                  <HTMLWidget
                    content={group.OuterDescription}
                    tag="p"
                    className="mb-7 mt-2"
                  />
                )}
              </div>
            )}
            {group.sections.map((section, sectionIndex) => (
              <div
                key={`section-${section.id || sectionIndex}`}
                className={cn(
                  `w-full md:sticky ${group.OuterDescription ? "top-66" : "top-40"} z-10 transition-all duration-500`,
                  isHeaderVisible && "top-25",
                )}
              >
                <div
                  id={`course-content-${section.id || sectionIndex}`}
                  className={`md:sticky  ${sectionIndex === group.sections.length - 1 && "mb-20 md:mb-18"} ${group.OuterDescription ? "top-32" : "top-20"} z-10  grid grid-cols-1 ${section.gridBreakpoint === "md" ? "md:grid-cols-[58%_40%]" : "lg:grid-cols-[58%_40%]"} gap-6 bg-[#ECECEC] min-h-[600px] 3xl:min-h-[750px] w-full p-8 pb-9 ${sectionIndex > 0 ? "mt-8" : ""} `}
                >
                  <div className="flex flex-col gap-4 w-full">
                    {section.section && (
                      <h3 className="font-mulish text-xl xss:text-[16px] text-[#E97451] font-normal 3xl:text-[24px]">
                        {section.section}
                      </h3>
                    )}
                    {section.title && (
                      <h2 className="font-urbanist text-[24px] leading-[32px] md:leading-[48px] xss:text-[24px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                        {section.title}
                      </h2>
                    )}
                    {section.description && (
                      <HTMLWidget
                        content={section.description}
                        className="font-normal font-mulish ul-image text-[16px] leading-[24px]!"
                        tag="div"
                      />
                    )}
                  </div>
                  <div className="relative">
                    <ImageLayout
                      type={section.type}
                      images={section.images ?? undefined}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </ContainerWidget>
    </section>
  );
};

export default CourseContentSection;
