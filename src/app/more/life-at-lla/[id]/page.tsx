import { getLifeById } from "@/app/api/server";
import LifeDetailSection from "@/components/sections/more/life-at-lla/LifeDetailSection";

const LifeAtLlaDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const {data: response} = await getLifeById(Number(id));
  console.log(response);
  return <LifeDetailSection data={response} />;
};

export default LifeAtLlaDetail;
