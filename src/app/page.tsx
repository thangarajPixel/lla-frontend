import { Fragment } from "react";
// import AboutSection from "@/components/sections/home/AboutSection";
// import CampusSection from "@/components/sections/home/CampusSection";
// import CourseSection from "@/components/sections/home/CourseSection";
// import FacultySection from "@/components/sections/home/FacultySection";
// import GallertSection from "@/components/sections/home/GallertSection";
// import HeroSection from "@/components/sections/home/HeroSection";
// import LifeSection from "@/components/sections/home/LifeSection";
// import SponsorsSection from "@/components/sections/home/SponsorsSection";
// import StudentSection from "@/components/sections/home/StudentSection";
// import TestimonialSection from "@/components/sections/home/TestimonialSection";

// import { getLandingPageData } from "./api/server";

const Home = async () => {
  // const response = await getLandingPageData();

  return (
    <Fragment>
      {/* <HeroSection />
      <CourseSection />
      <CampusSection />
      <FacultySection />
      <LifeSection />
      <StudentSection />
      <TestimonialSection />
      <GallertSection />
      <AboutSection />
      <SponsorsSection /> */}
      <h1 className="text-4xl font-bold text-center mt-50">Hello World</h1>
    </Fragment>
  );
};

export default Home;
