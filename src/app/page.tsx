import { Fragment } from "react";
import AboutSection from "@/components/sections/home/AboutSection";
import CampusSection from "@/components/sections/home/CampusSection";
import CourseSection from "@/components/sections/home/CourseSection";
import FacultySection from "@/components/sections/home/FacultySection";
import GallertSection from "@/components/sections/home/GallertSection";
import HeroSection from "@/components/sections/home/HeroSection";
import LifeSection from "@/components/sections/home/LifeSection";
import SponsorsSection from "@/components/sections/home/SponsorsSection";
import StudentSection from "@/components/sections/home/StudentSection";
import TestimonialSection from "@/components/sections/home/TestimonialSection";
import { getLandingPageData, getLandingpageCourseData } from "./api/server";

const Home = async () => {

  const [{ data: response }, { data: courseResponse }] = await Promise.all([
    getLandingPageData(),
    getLandingpageCourseData(),
  ]);
  
  console.log(courseResponse);

  if (response?.Home)
    return (
      <Fragment>
        <HeroSection data={response?.Home?.[0]} />
        <CourseSection data={response?.Home?.[1]} />
        <CampusSection data={response?.Home?.[2]} />
        <FacultySection data={response?.Home?.[3]} />
        <LifeSection data={response?.Home?.[4]} />
        <StudentSection data={response?.Home?.[5]} />
        <TestimonialSection data={response?.Home?.[6]} />
        <GallertSection data={response?.Home?.[7]} />
        <AboutSection data={response?.Home?.[8]} />
        <SponsorsSection data={response?.Home?.[9]} />
      </Fragment>
    );
};

export default Home;
