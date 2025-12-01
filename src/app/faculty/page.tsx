import { Fragment } from "react/jsx-runtime";
import { getFacultyPageData } from "../api/server";
import FacultyHeroSection from "@/components/sections/faculty/FacultyHeroSection";

const Faculty = async () => {
    const { data: response } = await getFacultyPageData();
   if (response?.Faculty)
    return (
      <Fragment>
        <FacultyHeroSection data={response?.Faculty?.[0]} />
        {/* <FounderSection data={response?.about?.[1]} />
        <TeamSection data={response?.about?.[2]} /> */}
      </Fragment>
    );
};

export default Faculty;
