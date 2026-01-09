import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";
import { getAboutUsPageData } from "@/app/api/server";
import AboutHeroSection from "@/components/sections/more/about-us/AboutHeroSection";
import FounderSection from "@/components/sections/more/about-us/FounderSection";
import TeamSection from "@/components/sections/more/about-us/TeamSection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/about-us");
}

const AboutUsPage = async () => {
  const { data: response } = await getAboutUsPageData();
  if (response?.about)
    return (
      <Fragment>
        <AboutHeroSection data={response?.about?.[0]} />
        <FounderSection data={response?.about?.[1]} />
        <TeamSection data={response?.about?.[2]} />
      </Fragment>
    );
};

export default AboutUsPage;
