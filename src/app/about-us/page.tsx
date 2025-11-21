import { Fragment } from "react/jsx-runtime";
import AboutHeroSection from "@/components/sections/about-us/AboutHeroSection";
import FounderSection from "@/components/sections/about-us/FounderSection";
import TeamSection from "@/components/sections/about-us/TeamSection";
import { getAboutUsPageData } from "../api/server";

const AboutUsPage = async ()  => {
   const response = await getAboutUsPageData();
   if (response?.about)
  return (
    <Fragment>
      <AboutHeroSection data={response?.about?.[0]} />
      <FounderSection />
      <TeamSection />
    </Fragment>
  );
};

export default AboutUsPage;
