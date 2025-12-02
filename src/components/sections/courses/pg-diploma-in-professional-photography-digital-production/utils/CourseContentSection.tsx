import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";

const CourseContentSection = () => {
  const data = {
    __component: "other-info-section",
    id: 1,
    Title: "Course Content",
    Heading: "Duration:",
    SubHeading: "1 Year",
    Description:
      "This course is meticulously structured and is designed to optimise time and resources with a faster turnaround. It is totally immersive. The schedule is densely packed. It is assumed that the student will be very passionate, highly motivated and totally committed to getting the best out of this course.",
  };

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                {data.Title}
              </h3>
              <p className="font-area-variable font-semibold text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-[40px] text-black">
                {data.Heading}
                {data.SubHeading && (
                  <span className="text-[#E97451] pl-2">{data.SubHeading}</span>
                )}
              </p>
              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal max-w-full md:max-w-[660px]">
                {data.Description}
              </p>
            </div>
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default CourseContentSection;
