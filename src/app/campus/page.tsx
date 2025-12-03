import { Fragment } from "react/jsx-runtime";
import CampusHeroSection from "@/components/sections/campus/CampusHeroSection";
import FacilitiesSection from "@/components/sections/campus/FacilitiesSection";
import { Dummy1 } from "@/helpers/ImageHelper";

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

  const facilities = [
    { id: 1, name: "Classroom", image: Dummy1 },
    { id: 2, name: "Get mentored by Iqbal Mohamed", image: Dummy1 },
    { id: 3, name: "Day Light Studio", image: Dummy1 },
    { id: 4, name: "4500 sq ft. Automobile Studio", image: Dummy1 },
    { id: 5, name: "Equipment Room", image: Dummy1 },
    { id: 6, name: "Auditorium", image: Dummy1 },
    { id: 7, name: "Library", image: Dummy1 },
    { id: 8, name: "Prop Room", image: Dummy1 },
    { id: 9, name: "Cafeteria", image: Dummy1 },
    { id: 10, name: "Reception", image: Dummy1 },
    { id: 11, name: "Student Hangout Space", image: Dummy1 },
    { id: 12, name: "Football Ground", image: Dummy1 },
    { id: 13, name: "Table Tennis Room", image: Dummy1 },
    { id: 14, name: "Carrom Room", image: Dummy1 },
  ];

  return (
    <Fragment>
      <CampusHeroSection data={dummyData} />
      <FacilitiesSection
        data={{
          Title: "Facilities",
          Heading: "Lorem ipsum dolor sit amet, consectetur",
          SubHeading: "adipiscing elit, sed do eiusmod tempor",
          Card: facilities,
        }}
      />
    </Fragment>
  );
};

export default Campus;
