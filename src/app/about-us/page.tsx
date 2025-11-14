import { Fragment } from "react";
import AboutHeroSection from "@/components/sections/about-us/AboutHeroSection";

const AboutUsPage = () => {
  return (
    <Fragment>
      <AboutHeroSection />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">About Us</h1>
      </div>
    </Fragment>
  );
};

export default AboutUsPage;
