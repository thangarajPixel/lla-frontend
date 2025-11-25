import ListSection from "@/components/sections/life-at-lla/LifeLlaSection";
import { getLifePageData } from "../api/server";

const LifeAtLla = async () => {
  const response = await getLifePageData(1, 8);
  if (response) return <ListSection data={response} />;
};

export default LifeAtLla;
