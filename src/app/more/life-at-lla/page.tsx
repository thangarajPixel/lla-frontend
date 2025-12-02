import { getLifePageData } from "@/app/api/server";
import ListSection from "@/components/sections/life-at-lla/LifeLlaSection";

const LifeAtLla = async () => {
  const params = { page: 1, per_page: 8 };
  const { data: response } = await getLifePageData(params);
  if (response) return <ListSection data={response} />;
};

export default LifeAtLla;
