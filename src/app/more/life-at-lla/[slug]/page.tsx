import { getLifeById } from "@/app/api/server";
import LifeDetailSection from "@/components/sections/more/life-at-lla/LifeDetailSection";

const LifeAtLlaDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data: response } = await getLifeById(slug);
  console.log("LifeAtLlaDetail response:", response);
  if (!response?.card) return null;
  return <LifeDetailSection data={response} />;
};

export default LifeAtLlaDetail;
