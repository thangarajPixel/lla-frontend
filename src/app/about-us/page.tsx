import { Fragment } from "react/jsx-runtime";
import AboutHeroSection from "@/components/sections/about-us/AboutHeroSection";
import FounderSection from "@/components/sections/about-us/FounderSection";
import TeamSection from "@/components/sections/about-us/TeamSection";

const AboutUsPage = () => {
  return (
    <Fragment>
      <AboutHeroSection />
      <FounderSection />
      <TeamSection />
    </Fragment>
  );
};

export default AboutUsPage;
