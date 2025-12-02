import { Fragment } from "react/jsx-runtime";
import DirectorAcademicsSection from "@/components/sections/faculty/DirectorAcademicsSection";
import FacultyHeroSection from "@/components/sections/faculty/FacultyHeroSection";
import { getFacultyPageData } from "../api/server";

const Faculty = async () => {
  const { data: response } = await getFacultyPageData();
  if (response?.Faculty)
    return (
      <Fragment>
        <FacultyHeroSection data={response?.Faculty?.[0]} />
        <DirectorAcademicsSection data={response?.Faculty?.[1]} />
        {/* <FounderSection data={response?.about?.[1]} />
        <TeamSection data={response?.about?.[2]} /> */}
      </Fragment>
    );
};

export default Faculty;
