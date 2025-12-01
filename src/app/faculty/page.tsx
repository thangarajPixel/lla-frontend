import { Fragment } from "react/jsx-runtime";
import { getFacultyPageData } from "../api/server";
import FacultyHeroSection from "@/components/sections/faculty/FacultyHeroSection";
import DirectorAcademicsSection from "@/components/sections/faculty/DirectorAcademicsSection";

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
