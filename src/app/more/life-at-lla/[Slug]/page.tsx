import { getLifeById } from "@/app/api/server";
import LifeDetailSection from "@/components/sections/more/life-at-lla/LifeDetailSection";

const LifeAtLlaDetail = async ({
  params,
}: {
  params: Promise<{ Slug: string }>;
}) => {
  const { Slug } = await params;
  const { data: response } = await getLifeById(Slug);
  return <LifeDetailSection data={response} />;
};

export default LifeAtLlaDetail;
