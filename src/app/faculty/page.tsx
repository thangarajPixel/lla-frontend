import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";
import DirectorAcademicsSection from "@/components/sections/faculty/DirectorAcademicsSection";
import FacultyHeroSection from "@/components/sections/faculty/FacultyHeroSection";
import FilmmakingFacultySection from "@/components/sections/faculty/FilmmakingFacultySection";
import PhotographyFacultySection from "@/components/sections/faculty/PhotographyFacultySection";
import VisitingFacultySection from "@/components/sections/faculty/VisitingFacultySection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";
import { getFacultyPageData } from "../api/server";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/faculty");
}

const Faculty = async () => {
  const { data: response } = await getFacultyPageData();
  if (response?.Faculty)
    return (
      <Fragment>
        <FacultyHeroSection data={response?.Faculty?.[0]} />
        <DirectorAcademicsSection data={response?.Faculty?.[1]} />
        <PhotographyFacultySection data={response?.Faculty?.[2]} />
        <FilmmakingFacultySection data={response?.Faculty?.[3]} />
        <VisitingFacultySection data={response?.Faculty?.[4]} />
      </Fragment>
    );
};

export default Faculty;
