import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { Dummy1 } from "@/helpers/ImageHelper";

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
          <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14 3xl:space-y-16 mb-12">
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

        <ScrollWidget animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section A
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 1
              </h2>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  The course begins with an in-depth study of the fundamentals
                  involved in creating an image.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Understanding the Camera:{" "}
                  </span>
                  Technical Aspects, Creative Possibilities and Limitations
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aesthetics of Photography:{" "}
                  </span>
                  A study of colour and composition and how it impacts an image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    History of Photography:{" "}
                  </span>
                  How the process of creating images has evolved over the years
                  and along with it the aesthetics. (An appreciation session)
                </li>
                <li>
                  <span className="text-[#E97451]">Natural Light: </span>An
                  in-depth study of natural light and its qualities. The many
                  different ways in which light adds mood and dimension to an
                  image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Moonlight & Astrophotography:{" "}
                  </span>
                  A study of how images can be made in moonlight and how the
                  night sky can be captured through photographs
                </li>
                <li>
                  <span className="text-[#E97451]">Filters: </span>The use of
                  filters & their applications in manipulating images captured
                  by the camera
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 1:{" "}
                  </span>
                  Essentials of processing RAW files and image editing
                </li>
                <li>
                  Every area of study will be covered through lectures,
                  slideshows, and demos (Wherever required), followed by
                  time-bound assignments with critique (Individual/Group) and
                  grading.
                </li>
              </ul>
            </div>
            <div>
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 md:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden md:block relative w-full">
                <div className="absolute top-0 right-10 w-full aspect-231/347 max-w-[231px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-[217px] left-0 w-full aspect-480/282 max-w-[480px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section B
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 2
              </h2>
              <p className="text-[16px] lg:text-[13px] 3xl:text-[18px] font-normal text-black">
                This section will give students an in-depth and conceptual
                understanding of artificial light sources and their
                applications.
              </p>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  <span className="text-[#E97451]">
                    Portable Flash (Basic and Advanced):{" "}
                  </span>
                  Exploring the technical and creative possibilities with
                  portable flash.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 1 (Introduction):{" "}
                  </span>
                  Understanding technical aspects and usage of Studio Lights,
                  Light Modifying Accessories & Grip Equipment.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 2 (Advanced):{" "}
                  </span>
                  An in-depth exploration of lighting concepts used in still
                  life, product and people photography.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 3 (Conceptual Photography):{" "}
                  </span>
                  Conceptualising and executing images, keeping the
                  brand/narrative in mind.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 2:{" "}
                  </span>
                  Image editing, compositing and basics of retouching.
                </li>
                <li>
                  Every topic (above) will be covered through lectures, visual
                  presentations, and demos, followed by time-bound assignments
                  with critique and grading.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Medium format cameras:{" "}
                  </span>
                  Understanding the possibilities and limitations offered by
                  medium format cameras through hands-on experience.
                </li>
                <li>
                  <span className="text-[#E97451]">Tilt-Shift lenses: </span>
                  Understanding the different movements possible with tilt-shift
                  lenses and their applications in various areas of photography.
                  (A workshop)
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aerial & Drone Photography:{" "}
                  </span>
                  Understanding the techniques of photographing subjects from an
                  aerial point of view. (A workshop)
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-0 w-full aspect-445/282 max-w-[275px] xl:max-w-[305px] 2xl:max-w-[340px] 3xl:max-w-[445px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-28 3xl:top-34 right-0 w-full aspect-252/380 max-w-[200px] 3xl:max-w-[252px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-[365px] 3xl:top-[455px] left-[29px] w-96 aspect-398/265 max-w-[240px] xl:max-w-[258px] 2xl:max-w-[300px] 3xl:max-w-[398px] overflow-hidden ">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section C
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 1
              </h2>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  The course begins with an in-depth study of the fundamentals
                  involved in creating an image.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Understanding the Camera:{" "}
                  </span>
                  Technical Aspects, Creative Possibilities and Limitations
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aesthetics of Photography:{" "}
                  </span>
                  A study of colour and composition and how it impacts an image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    History of Photography:{" "}
                  </span>
                  How the process of creating images has evolved over the years
                  and along with it the aesthetics. (An appreciation session)
                </li>
                <li>
                  <span className="text-[#E97451]">Natural Light: </span>An
                  in-depth study of natural light and its qualities. The many
                  different ways in which light adds mood and dimension to an
                  image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Moonlight & Astrophotography:{" "}
                  </span>
                  A study of how images can be made in moonlight and how the
                  night sky can be captured through photographs
                </li>
                <li>
                  <span className="text-[#E97451]">Filters: </span>The use of
                  filters & their applications in manipulating images captured
                  by the camera
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 1:{" "}
                  </span>
                  Essentials of processing RAW files and image editing
                </li>
                <li>
                  Every area of study will be covered through lectures,
                  slideshows, and demos (Wherever required), followed by
                  time-bound assignments with critique (Individual/Group) and
                  grading.
                </li>
              </ul>
            </div>
            <div>
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[220px] 2xl:max-w-[300px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[270px] 2xl:max-w-[310px] 3xl:max-w-[400px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section D
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 2
              </h2>
              <p className="text-[16px] lg:text-[13px] 3xl:text-[18px] font-normal text-black">
                This section will give students an in-depth and conceptual
                understanding of artificial light sources and their
                applications.
              </p>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  <span className="text-[#E97451]">
                    Portable Flash (Basic and Advanced):{" "}
                  </span>
                  Exploring the technical and creative possibilities with
                  portable flash.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 1 (Introduction):{" "}
                  </span>
                  Understanding technical aspects and usage of Studio Lights,
                  Light Modifying Accessories & Grip Equipment.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 2 (Advanced):{" "}
                  </span>
                  An in-depth exploration of lighting concepts used in still
                  life, product and people photography.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 3 (Conceptual Photography):{" "}
                  </span>
                  Conceptualising and executing images, keeping the
                  brand/narrative in mind.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 2:{" "}
                  </span>
                  Image editing, compositing and basics of retouching.
                </li>
                <li>
                  Every topic (above) will be covered through lectures, visual
                  presentations, and demos, followed by time-bound assignments
                  with critique and grading.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Medium format cameras:{" "}
                  </span>
                  Understanding the possibilities and limitations offered by
                  medium format cameras through hands-on experience.
                </li>
                <li>
                  <span className="text-[#E97451]">Tilt-Shift lenses: </span>
                  Understanding the different movements possible with tilt-shift
                  lenses and their applications in various areas of photography.
                  (A workshop)
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aerial & Drone Photography:{" "}
                  </span>
                  Understanding the techniques of photographing subjects from an
                  aerial point of view. (A workshop)
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-0 w-full aspect-300/204 max-w-45 xl:max-w-[190px] 2xl:max-w-[220px] 3xl:max-w-[300px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-21 2xl:top-28 3xl:top-36 left-[75px] 2xl:left-[90px] 3xl:left-[110px] w-full aspect-370/272 max-w-[230px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[370px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-[185px] 2xl:top-[220px] 3xl:top-[305px] left-0 w-96 aspect-190/286 max-w-[140px] xl:max-w-[150px] 2xl:max-w-[165px] 3xl:max-w-[190px] overflow-hidden ">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section E
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 2
              </h2>
              <p className="text-[16px] lg:text-[13px] 3xl:text-[18px] font-normal text-black">
                This section will give students an in-depth and conceptual
                understanding of artificial light sources and their
                applications.
              </p>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  <span className="text-[#E97451]">
                    Portable Flash (Basic and Advanced):{" "}
                  </span>
                  Exploring the technical and creative possibilities with
                  portable flash.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 1 (Introduction):{" "}
                  </span>
                  Understanding technical aspects and usage of Studio Lights,
                  Light Modifying Accessories & Grip Equipment.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 2 (Advanced):{" "}
                  </span>
                  An in-depth exploration of lighting concepts used in still
                  life, product and people photography.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 3 (Conceptual Photography):{" "}
                  </span>
                  Conceptualising and executing images, keeping the
                  brand/narrative in mind.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 2:{" "}
                  </span>
                  Image editing, compositing and basics of retouching.
                </li>
                <li>
                  Every topic (above) will be covered through lectures, visual
                  presentations, and demos, followed by time-bound assignments
                  with critique and grading.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Medium format cameras:{" "}
                  </span>
                  Understanding the possibilities and limitations offered by
                  medium format cameras through hands-on experience.
                </li>
                <li>
                  <span className="text-[#E97451]">Tilt-Shift lenses: </span>
                  Understanding the different movements possible with tilt-shift
                  lenses and their applications in various areas of photography.
                  (A workshop)
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aerial & Drone Photography:{" "}
                  </span>
                  Understanding the techniques of photographing subjects from an
                  aerial point of view. (A workshop)
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-[125px] 3xl:left-[185px] w-full aspect-300/203 max-w-45 xl:max-w-[190px] 2xl:max-w-[260px] 3xl:max-w-[300px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-21 2xl:top-28 3xl:top-36 left-0 w-full aspect-268/351 max-w-[190px] 2xl:max-w-[238px] 3xl:max-w-[268px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-[150px] 2xl:top-[195px] 3xl:top-[229px] left-[165px] 2xl:left-[220px] 3xl:left-[244px] w-full aspect-236/323 max-w-[140px] xl:max-w-[150px] 2xl:max-w-[165px] 3xl:max-w-[236px] overflow-hidden ">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section F
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 1
              </h2>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  The course begins with an in-depth study of the fundamentals
                  involved in creating an image.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Understanding the Camera:{" "}
                  </span>
                  Technical Aspects, Creative Possibilities and Limitations
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aesthetics of Photography:{" "}
                  </span>
                  A study of colour and composition and how it impacts an image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    History of Photography:{" "}
                  </span>
                  How the process of creating images has evolved over the years
                  and along with it the aesthetics. (An appreciation session)
                </li>
                <li>
                  <span className="text-[#E97451]">Natural Light: </span>An
                  in-depth study of natural light and its qualities. The many
                  different ways in which light adds mood and dimension to an
                  image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Moonlight & Astrophotography:{" "}
                  </span>
                  A study of how images can be made in moonlight and how the
                  night sky can be captured through photographs
                </li>
                <li>
                  <span className="text-[#E97451]">Filters: </span>The use of
                  filters & their applications in manipulating images captured
                  by the camera
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 1:{" "}
                  </span>
                  Essentials of processing RAW files and image editing
                </li>
                <li>
                  Every area of study will be covered through lectures,
                  slideshows, and demos (Wherever required), followed by
                  time-bound assignments with critique (Individual/Group) and
                  grading.
                </li>
              </ul>
            </div>
            <div>
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-0 w-full aspect-300/201 max-w-[220px] 2xl:max-w-[300px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-[115px] 2xl:top-[165px] left-13 2xl:left-20 w-full aspect-400/268 max-w-[270px] 2xl:max-w-[310px] 3xl:max-w-[400px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section G
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 1
              </h2>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  The course begins with an in-depth study of the fundamentals
                  involved in creating an image.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Understanding the Camera:{" "}
                  </span>
                  Technical Aspects, Creative Possibilities and Limitations
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aesthetics of Photography:{" "}
                  </span>
                  A study of colour and composition and how it impacts an image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    History of Photography:{" "}
                  </span>
                  How the process of creating images has evolved over the years
                  and along with it the aesthetics. (An appreciation session)
                </li>
                <li>
                  <span className="text-[#E97451]">Natural Light: </span>An
                  in-depth study of natural light and its qualities. The many
                  different ways in which light adds mood and dimension to an
                  image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Moonlight & Astrophotography:{" "}
                  </span>
                  A study of how images can be made in moonlight and how the
                  night sky can be captured through photographs
                </li>
                <li>
                  <span className="text-[#E97451]">Filters: </span>The use of
                  filters & their applications in manipulating images captured
                  by the camera
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 1:{" "}
                  </span>
                  Essentials of processing RAW files and image editing
                </li>
                <li>
                  Every area of study will be covered through lectures,
                  slideshows, and demos (Wherever required), followed by
                  time-bound assignments with critique (Individual/Group) and
                  grading.
                </li>
              </ul>
            </div>
            <div>
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-[81px] w-full aspect-387/269 max-w-60 2xl:max-w-[310px] 3xl:max-w-[387px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-[110px] 2xl:top-[135px]  3xl:top-[175px]  w-full aspect-381/254 max-w-[270px] 2xl:max-w-[321px] 3xl:max-w-[381px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section H
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 1
              </h2>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  The course begins with an in-depth study of the fundamentals
                  involved in creating an image.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Understanding the Camera:{" "}
                  </span>
                  Technical Aspects, Creative Possibilities and Limitations
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aesthetics of Photography:{" "}
                  </span>
                  A study of colour and composition and how it impacts an image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    History of Photography:{" "}
                  </span>
                  How the process of creating images has evolved over the years
                  and along with it the aesthetics. (An appreciation session)
                </li>
                <li>
                  <span className="text-[#E97451]">Natural Light: </span>An
                  in-depth study of natural light and its qualities. The many
                  different ways in which light adds mood and dimension to an
                  image
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Moonlight & Astrophotography:{" "}
                  </span>
                  A study of how images can be made in moonlight and how the
                  night sky can be captured through photographs
                </li>
                <li>
                  <span className="text-[#E97451]">Filters: </span>The use of
                  filters & their applications in manipulating images captured
                  by the camera
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 1:{" "}
                  </span>
                  Essentials of processing RAW files and image editing
                </li>
                <li>
                  Every area of study will be covered through lectures,
                  slideshows, and demos (Wherever required), followed by
                  time-bound assignments with critique (Individual/Group) and
                  grading.
                </li>
              </ul>
            </div>
            <div>
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-[140px] xl:left-[151px] 2xl:left-[200px] 3xl:left-[231px] w-full aspect-249/374 max-w-[169px] 2xl:max-w-[199px] 3xl:max-w-[249px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-[135px]  3xl:top-[186px]  w-full aspect-356/246 max-w-[250px] 2xl:max-w-[291px] 3xl:max-w-[356px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>

        <ScrollWidget animation="fadeUp" delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-6 bg-[#ECECEC] w-full p-8 pb-9 mt-8">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mulish text-xl text-[#E97451] font-normal 3xl:text-[24px]">
                Section I
              </h3>
              <h2 className="font-urbanist text-[37px] xl:text-[25px] 2xl:text-[37px] 3xl:text-[40px] font-normal text-black mt-[-10px]">
                Professional Photography Part 2
              </h2>
              <p className="text-[16px] lg:text-[13px] 3xl:text-[18px] font-normal text-black">
                This section will give students an in-depth and conceptual
                understanding of artificial light sources and their
                applications.
              </p>
              <ul className="text-[16px] flex flex-col gap-2.5 lg:text-[13px] 3xl:text-[18px] font-normal text-black w-full">
                <li>
                  <span className="text-[#E97451]">
                    Portable Flash (Basic and Advanced):{" "}
                  </span>
                  Exploring the technical and creative possibilities with
                  portable flash.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 1 (Introduction):{" "}
                  </span>
                  Understanding technical aspects and usage of Studio Lights,
                  Light Modifying Accessories & Grip Equipment.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 2 (Advanced):{" "}
                  </span>
                  An in-depth exploration of lighting concepts used in still
                  life, product and people photography.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Studio Part 3 (Conceptual Photography):{" "}
                  </span>
                  Conceptualising and executing images, keeping the
                  brand/narrative in mind.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Post Production Part 2:{" "}
                  </span>
                  Image editing, compositing and basics of retouching.
                </li>
                <li>
                  Every topic (above) will be covered through lectures, visual
                  presentations, and demos, followed by time-bound assignments
                  with critique and grading.
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Medium format cameras:{" "}
                  </span>
                  Understanding the possibilities and limitations offered by
                  medium format cameras through hands-on experience.
                </li>
                <li>
                  <span className="text-[#E97451]">Tilt-Shift lenses: </span>
                  Understanding the different movements possible with tilt-shift
                  lenses and their applications in various areas of photography.
                  (A workshop)
                </li>
                <li>
                  <span className="text-[#E97451]">
                    Aerial & Drone Photography:{" "}
                  </span>
                  Understanding the techniques of photographing subjects from an
                  aerial point of view. (A workshop)
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Mobile: Stack images vertically */}
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="relative w-full aspect-231/347 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-480/282 max-w-full mx-auto">
                  <div className="relative w-full h-full overflow-hidden">
                    <ImageWidget
                      src={Dummy1}
                      alt="Course Content"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop: Absolute positioning with overlap */}
              <div className="hidden lg:block relative w-full">
                <div className="absolute top-0 left-[155px] 3xl:left-[216px] w-full aspect-264/175 max-w-45 xl:max-w-[190px] 2xl:max-w-[220px] 3xl:max-w-[264px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-21 2xl:top-[65PX] 3xl:top-[72PX] left-0 w-full aspect-282/188 max-w-[190px] 2xl:max-w-[248px] 3xl:max-w-[282px] overflow-hidden">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute top-[150px] 2xl:top-[195px] 3xl:top-[209px] left-[165px] 2xl:left-[100px] 3xl:left-[110px] w-full aspect-300/228 max-w-[140px] xl:max-w-[150px] 2xl:max-w-60 3xl:max-w-[300px] overflow-hidden ">
                  <ImageWidget
                    src={Dummy1}
                    alt="Course Content"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollWidget>
      </ContainerWidget>
    </section>
  );
};

export default CourseContentSection;
