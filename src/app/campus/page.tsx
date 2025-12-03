import { Fragment } from "react/jsx-runtime";
import CampusHeroSection from "@/components/sections/campus/CampusHeroSection";
import FacilitiesSection from "@/components/sections/campus/FacilitiesSection";
import GallerySection from "@/components/sections/campus/GallerySection";
import { getCampusPageData } from "../api/server";

const Campus = async () => {
  const [{ data: response }] = await Promise.all([getCampusPageData()]);

  if (response?.campus)
    return (
      <Fragment>
        <CampusHeroSection data={response?.campus?.[0]} />
        <FacilitiesSection data={response?.campus?.[1]} />
        <GallerySection data={response?.campus?.[2]} />
      </Fragment>
    );
};

export default Campus;
