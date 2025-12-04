import ContainerWidget from "@/components/widgets/ContainerWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import ImageLayout from "./ImageLayout";

const CourseContentSection = () => {
  const headerData = {
    __component: "other-info-section",
    id: 1,
    Title: "Course Content",
    Heading: "Duration:",
    SubHeading: "1 Year",
    Description:
      "This course is meticulously structured and is designed to optimise time and resources with a faster turnaround. It is totally immersive. The schedule is densely packed. It is assumed that the student will be very passionate, highly motivated and totally committed to getting the best out of this course.",
  };

  const sectionsData = [
    {
      type: 1,
      section: "A",
      title: "Professional Photography Part 1",
      description: null,
      listItems: [
        "The course begins with an in-depth study of the fundamentals involved in creating an image.",
        {
          label: "Understanding the Camera: ",
          text: "Technical Aspects, Creative Possibilities and Limitations",
        },
        {
          label: "Aesthetics of Photography: ",
          text: "A study of colour and composition and how it impacts an image",
        },
        {
          label: "History of Photography: ",
          text: "How the process of creating images has evolved over the years and along with it the aesthetics. (An appreciation session)",
        },
        {
          label: "Natural Light: ",
          text: "An in-depth study of natural light and its qualities. The many different ways in which light adds mood and dimension to an image",
        },
        {
          label: "Moonlight & Astrophotography: ",
          text: "A study of how images can be made in moonlight and how the night sky can be captured through photographs",
        },
        {
          label: "Filters: ",
          text: "The use of filters & their applications in manipulating images captured by the camera",
        },
        {
          label: "Post Production Part 1: ",
          text: "Essentials of processing RAW files and image editing",
        },
        "Every area of study will be covered through lectures, slideshows, and demos (Wherever required), followed by time-bound assignments with critique (Individual/Group) and grading.",
      ],
      gridBreakpoint: "md",
      delay: 0.2,
    },
    {
      type: 2,
      section: "B",
      title: "Professional Photography Part 2",
      description:
        "This section will give students an in-depth and conceptual understanding of artificial light sources and their applications.",
      listItems: [
        {
          label: "Portable Flash (Basic and Advanced): ",
          text: "Exploring the technical and creative possibilities with portable flash.",
        },
        {
          label: "Studio Part 1 (Introduction): ",
          text: "Understanding technical aspects and usage of Studio Lights, Light Modifying Accessories & Grip Equipment.",
        },
        {
          label: "Studio Part 2 (Advanced): ",
          text: "An in-depth exploration of lighting concepts used in still life, product and people photography.",
        },
        {
          label: "Studio Part 3 (Conceptual Photography): ",
          text: "Conceptualising and executing images, keeping the brand/narrative in mind.",
        },
        {
          label: "Post Production Part 2: ",
          text: "Image editing, compositing and basics of retouching.",
        },
        "Every topic (above) will be covered through lectures, visual presentations, and demos, followed by time-bound assignments with critique and grading.",
        {
          label: "Medium format cameras: ",
          text: "Understanding the possibilities and limitations offered by medium format cameras through hands-on experience.",
        },
        {
          label: "Tilt-Shift lenses: ",
          text: "Understanding the different movements possible with tilt-shift lenses and their applications in various areas of photography. (A workshop)",
        },
        {
          label: "Aerial & Drone Photography: ",
          text: "Understanding the techniques of photographing subjects from an aerial point of view. (A workshop)",
        },
      ],
      gridBreakpoint: "lg",
      delay: 0.4,
    },
    {
      type: 3,
      section: "C",
      title: "Professional Photography Part 1",
      description: null,
      listItems: [
        "The course begins with an in-depth study of the fundamentals involved in creating an image.",
        {
          label: "Understanding the Camera: ",
          text: "Technical Aspects, Creative Possibilities and Limitations",
        },
        {
          label: "Aesthetics of Photography: ",
          text: "A study of colour and composition and how it impacts an image",
        },
        {
          label: "History of Photography: ",
          text: "How the process of creating images has evolved over the years and along with it the aesthetics. (An appreciation session)",
        },
        {
          label: "Natural Light: ",
          text: "An in-depth study of natural light and its qualities. The many different ways in which light adds mood and dimension to an image",
        },
        {
          label: "Moonlight & Astrophotography: ",
          text: "A study of how images can be made in moonlight and how the night sky can be captured through photographs",
        },
        {
          label: "Filters: ",
          text: "The use of filters & their applications in manipulating images captured by the camera",
        },
        {
          label: "Post Production Part 1: ",
          text: "Essentials of processing RAW files and image editing",
        },
        "Every area of study will be covered through lectures, slideshows, and demos (Wherever required), followed by time-bound assignments with critique (Individual/Group) and grading.",
      ],
      gridBreakpoint: "lg",
      delay: 0.2,
    },
    {
      type: 4,
      section: "D",
      title: "Professional Photography Part 2",
      description:
        "This section will give students an in-depth and conceptual understanding of artificial light sources and their applications.",
      listItems: [
        {
          label: "Portable Flash (Basic and Advanced): ",
          text: "Exploring the technical and creative possibilities with portable flash.",
        },
        {
          label: "Studio Part 1 (Introduction): ",
          text: "Understanding technical aspects and usage of Studio Lights, Light Modifying Accessories & Grip Equipment.",
        },
        {
          label: "Studio Part 2 (Advanced): ",
          text: "An in-depth exploration of lighting concepts used in still life, product and people photography.",
        },
        {
          label: "Studio Part 3 (Conceptual Photography): ",
          text: "Conceptualising and executing images, keeping the brand/narrative in mind.",
        },
        {
          label: "Post Production Part 2: ",
          text: "Image editing, compositing and basics of retouching.",
        },
        "Every topic (above) will be covered through lectures, visual presentations, and demos, followed by time-bound assignments with critique and grading.",
        {
          label: "Medium format cameras: ",
          text: "Understanding the possibilities and limitations offered by medium format cameras through hands-on experience.",
        },
        {
          label: "Tilt-Shift lenses: ",
          text: "Understanding the different movements possible with tilt-shift lenses and their applications in various areas of photography. (A workshop)",
        },
        {
          label: "Aerial & Drone Photography: ",
          text: "Understanding the techniques of photographing subjects from an aerial point of view. (A workshop)",
        },
      ],
      gridBreakpoint: "lg",
      delay: 0.4,
    },
    {
      type: 5,
      section: "E",
      title: "Professional Photography Part 2",
      description:
        "This section will give students an in-depth and conceptual understanding of artificial light sources and their applications.",
      listItems: [
        {
          label: "Portable Flash (Basic and Advanced): ",
          text: "Exploring the technical and creative possibilities with portable flash.",
        },
        {
          label: "Studio Part 1 (Introduction): ",
          text: "Understanding technical aspects and usage of Studio Lights, Light Modifying Accessories & Grip Equipment.",
        },
        {
          label: "Studio Part 2 (Advanced): ",
          text: "An in-depth exploration of lighting concepts used in still life, product and people photography.",
        },
        {
          label: "Studio Part 3 (Conceptual Photography): ",
          text: "Conceptualising and executing images, keeping the brand/narrative in mind.",
        },
        {
          label: "Post Production Part 2: ",
          text: "Image editing, compositing and basics of retouching.",
        },
        "Every topic (above) will be covered through lectures, visual presentations, and demos, followed by time-bound assignments with critique and grading.",
        {
          label: "Medium format cameras: ",
          text: "Understanding the possibilities and limitations offered by medium format cameras through hands-on experience.",
        },
        {
          label: "Tilt-Shift lenses: ",
          text: "Understanding the different movements possible with tilt-shift lenses and their applications in various areas of photography. (A workshop)",
        },
        {
          label: "Aerial & Drone Photography: ",
          text: "Understanding the techniques of photographing subjects from an aerial point of view. (A workshop)",
        },
      ],
      gridBreakpoint: "lg",
      delay: 0.4,
    },
    {
      type: 6,
      section: "F",
      title: "Professional Photography Part 1",
      description: null,
      listItems: [
        "The course begins with an in-depth study of the fundamentals involved in creating an image.",
        {
          label: "Understanding the Camera: ",
          text: "Technical Aspects, Creative Possibilities and Limitations",
        },
        {
          label: "Aesthetics of Photography: ",
          text: "A study of colour and composition and how it impacts an image",
        },
        {
          label: "History of Photography: ",
          text: "How the process of creating images has evolved over the years and along with it the aesthetics. (An appreciation session)",
        },
        {
          label: "Natural Light: ",
          text: "An in-depth study of natural light and its qualities. The many different ways in which light adds mood and dimension to an image",
        },
        {
          label: "Moonlight & Astrophotography: ",
          text: "A study of how images can be made in moonlight and how the night sky can be captured through photographs",
        },
        {
          label: "Filters: ",
          text: "The use of filters & their applications in manipulating images captured by the camera",
        },
        {
          label: "Post Production Part 1: ",
          text: "Essentials of processing RAW files and image editing",
        },
        "Every area of study will be covered through lectures, slideshows, and demos (Wherever required), followed by time-bound assignments with critique (Individual/Group) and grading.",
      ],
      gridBreakpoint: "lg",
      delay: 0.2,
    },
    {
      type: 7,
      section: "G",
      title: "Professional Photography Part 1",
      description: null,
      listItems: [
        "The course begins with an in-depth study of the fundamentals involved in creating an image.",
        {
          label: "Understanding the Camera: ",
          text: "Technical Aspects, Creative Possibilities and Limitations",
        },
        {
          label: "Aesthetics of Photography: ",
          text: "A study of colour and composition and how it impacts an image",
        },
        {
          label: "History of Photography: ",
          text: "How the process of creating images has evolved over the years and along with it the aesthetics. (An appreciation session)",
        },
        {
          label: "Natural Light: ",
          text: "An in-depth study of natural light and its qualities. The many different ways in which light adds mood and dimension to an image",
        },
        {
          label: "Moonlight & Astrophotography: ",
          text: "A study of how images can be made in moonlight and how the night sky can be captured through photographs",
        },
        {
          label: "Filters: ",
          text: "The use of filters & their applications in manipulating images captured by the camera",
        },
        {
          label: "Post Production Part 1: ",
          text: "Essentials of processing RAW files and image editing",
        },
        "Every area of study will be covered through lectures, slideshows, and demos (Wherever required), followed by time-bound assignments with critique (Individual/Group) and grading.",
      ],
      gridBreakpoint: "lg",
      delay: 0.2,
    },
    {
      type: 8,
      section: "H",
      title: "Professional Photography Part 1",
      description: null,
      listItems: [
        "The course begins with an in-depth study of the fundamentals involved in creating an image.",
        {
          label: "Understanding the Camera: ",
          text: "Technical Aspects, Creative Possibilities and Limitations",
        },
        {
          label: "Aesthetics of Photography: ",
          text: "A study of colour and composition and how it impacts an image",
        },
        {
          label: "History of Photography: ",
          text: "How the process of creating images has evolved over the years and along with it the aesthetics. (An appreciation session)",
        },
        {
          label: "Natural Light: ",
          text: "An in-depth study of natural light and its qualities. The many different ways in which light adds mood and dimension to an image",
        },
        {
          label: "Moonlight & Astrophotography: ",
          text: "A study of how images can be made in moonlight and how the night sky can be captured through photographs",
        },
        {
          label: "Filters: ",
          text: "The use of filters & their applications in manipulating images captured by the camera",
        },
        {
          label: "Post Production Part 1: ",
          text: "Essentials of processing RAW files and image editing",
        },
        "Every area of study will be covered through lectures, slideshows, and demos (Wherever required), followed by time-bound assignments with critique (Individual/Group) and grading.",
      ],
      gridBreakpoint: "lg",
      delay: 0.2,
    },
    {
      type: 9,
      section: "I",
      title: "Professional Photography Part 2",
      description:
        "This section will give students an in-depth and conceptual understanding of artificial light sources and their applications.",
      listItems: [
        {
          label: "Portable Flash (Basic and Advanced): ",
          text: "Exploring the technical and creative possibilities with portable flash.",
        },
        {
          label: "Studio Part 1 (Introduction): ",
          text: "Understanding technical aspects and usage of Studio Lights, Light Modifying Accessories & Grip Equipment.",
        },
        {
          label: "Studio Part 2 (Advanced): ",
          text: "An in-depth exploration of lighting concepts used in still life, product and people photography.",
        },
        {
          label: "Studio Part 3 (Conceptual Photography): ",
          text: "Conceptualising and executing images, keeping the brand/narrative in mind.",
        },
        {
          label: "Post Production Part 2: ",
          text: "Image editing, compositing and basics of retouching.",
        },
        "Every topic (above) will be covered through lectures, visual presentations, and demos, followed by time-bound assignments with critique and grading.",
        {
          label: "Medium format cameras: ",
          text: "Understanding the possibilities and limitations offered by medium format cameras through hands-on experience.",
        },
        {
          label: "Tilt-Shift lenses: ",
          text: "Understanding the different movements possible with tilt-shift lenses and their applications in various areas of photography. (A workshop)",
        },
        {
          label: "Aerial & Drone Photography: ",
          text: "Understanding the techniques of photographing subjects from an aerial point of view. (A workshop)",
        },
      ],
      gridBreakpoint: "lg",
      delay: 0.4,
    },
    {
      type: 10,
      section: "J",
      title: "Professional Photography Part 2",
      description:
        "This section will give students an in-depth and conceptual understanding of artificial light sources and their applications.",
      listItems: [
        {
          label: "Portable Flash (Basic and Advanced): ",
          text: "Exploring the technical and creative possibilities with portable flash.",
        },
        {
          label: "Studio Part 1 (Introduction): ",
          text: "Understanding technical aspects and usage of Studio Lights, Light Modifying Accessories & Grip Equipment.",
        },
        {
          label: "Studio Part 2 (Advanced): ",
          text: "An in-depth exploration of lighting concepts used in still life, product and people photography.",
        },
        {
          label: "Studio Part 3 (Conceptual Photography): ",
          text: "Conceptualising and executing images, keeping the brand/narrative in mind.",
        },
        {
          label: "Post Production Part 2: ",
          text: "Image editing, compositing and basics of retouching.",
        },
        "Every topic (above) will be covered through lectures, visual presentations, and demos, followed by time-bound assignments with critique and grading.",
        {
          label: "Medium format cameras: ",
          text: "Understanding the possibilities and limitations offered by medium format cameras through hands-on experience.",
        },
        {
          label: "Tilt-Shift lenses: ",
          text: "Understanding the different movements possible with tilt-shift lenses and their applications in various areas of photography. (A workshop)",
        },
        {
          label: "Aerial & Drone Photography: ",
          text: "Understanding the techniques of photographing subjects from an aerial point of view. (A workshop)",
        },
      ],
      gridBreakpoint: "lg",
      delay: 0.4,
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28">
      <ContainerWidget>
        <ScrollWidget animation="fadeUp">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16 mb-12">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
                {headerData.Title}
              </h3>
              <p className="font-area-variable font-semibold text-lg xss:text-[24px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-[40px] text-black">
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
            key={section.section}
            animation="fadeUp"
            delay={section.delay}
          >
            <div
              className={`grid grid-cols-1 ${section.gridBreakpoint === "md" ? "md:grid-cols-[58%_40%]" : "lg:grid-cols-[58%_40%]"} gap-6 bg-[#ECECEC] w-full p-8 pb-9 ${index > 0 ? "mt-8" : ""}`}
            >
              <div className="flex flex-col gap-4 w-full">
                <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                  Section {section.section}
                </h3>
                <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-[16px] lg:text-[13px] 3xl:text-[18px] font-normal text-black">
                    {section.description}
                  </p>
                )}
                <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                  {section.listItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {typeof item === "string" ? (
                        item
                      ) : (
                        <>
                          <span className="text-[#E97451]">{item.label}</span>
                          {item.text}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={
                  section.type === 2 ||
                  section.type === 4 ||
                  section.type === 5 ||
                  section.type === 9 ||
                  section.type === 10
                    ? "relative"
                    : ""
                }
              >
                <ImageLayout type={section.type} />
              </div>
            </div>
          </ScrollWidget>
        ))}
      </ContainerWidget>
    </section>
  );
};

export default CourseContentSection;
