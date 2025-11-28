import ListSection from "@/components/sections/life-at-lla/LifeLlaSection";
import { getLifePageData } from "../api/server";

const LifeAtLla = async () => {
  const params = { page: 1, per_page: 8 };
  const { data: response } = await getLifePageData(params);
  if (response) return <ListSection data={response} />;
};

export default LifeAtLla;
