import { Fragment } from "react/jsx-runtime";
import DirectorAcademicsSection from "@/components/sections/faculty/DirectorAcademicsSection";
import FacultyHeroSection from "@/components/sections/faculty/FacultyHeroSection";
import PhotographyFacultySection from "@/components/sections/faculty/PhotographyFacultySection";
import { getFacultyPageData } from "../api/server";

const Faculty = async () => {
  const { data: response } = await getFacultyPageData();
  if (response?.Faculty)
    return (
      <Fragment>
        <FacultyHeroSection data={response?.Faculty?.[0]} />
        <DirectorAcademicsSection data={response?.Faculty?.[1]} />
        <PhotographyFacultySection data={response?.Faculty?.[2]} />
      </Fragment>
    );
};

export default Faculty;
