import { Fragment } from "react/jsx-runtime";
import CampusHeroSection from "@/components/sections/campus/CampusHeroSection";
import FacilitiesSection from "@/components/sections/campus/FacilitiesSection";

const Campus = () => {
  const dummyData = {
    Title: "Campus",
    Heading: "Lorem ipsum dolor sit amet, consectetur",
    SubHeading: "adipiscing elit, sed do eiusmod tempor",
    Description:
      "Light and Life Academy is perched on a mountaintop about 7000 ft. above sea level near Ooty, Tamil Nadu, India, with a spectacular view of the Ketti valley, arguably the second largest inhabited valley in the world. The campus is an inspiring 60,000 sq ft theater with up to three seasons visiting it everyday. Custom-designed by one of India's most celebrated architects, Mr. Jaisim (recipient of NDTV award for Lifetime Achievement in Architecture), any part of the campus is a window to the continuously unfolding drama of the sights and sounds of nature.",
    Video: {
      id: 1,
      name: "Campus Video",
      url: "",
    },
    TopImage: {
      id: 1,
      name: "Campus Top",
      url: "",
    },
    BottomImage: {
      id: 2,
      name: "Campus Bottom",
      url: "",
    },
  };

  return (
    <Fragment>
      <CampusHeroSection data={dummyData} />
      <FacilitiesSection data={[]} />
    </Fragment>
  );
};

export default Campus;
