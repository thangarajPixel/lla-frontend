import type { Metadata } from "next";
import { getLifePageData } from "@/app/api/server";
import ListSection from "@/components/sections/more/life-at-lla/LifeLlaSection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/life-at-lla");
}

const LifeAtLla = async () => {
  const params = { page: 1, per_page: 16 };
  const { data: response } = await getLifePageData(params);
  if (response) return <ListSection data={response} />;
};

export default LifeAtLla;
