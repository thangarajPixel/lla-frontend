import { getLifeById } from "@/app/api/server";
import LifeDetailSection from "@/components/sections/more/life-at-lla/LifeDetailSection";

const LifeAtLlaDetail = async ({ params }: { params: { id: string } }) => {
  const { data: response } = await getLifeById(Number(1));
  const staticData = {
    id: 1,
    Title: "Things to Know When Preparing  for a Photography Exhibition: ",
    Description: "Preparing for a photography exhibition is an exciting yet meticulous process that requires careful planning, organisation, and promotion. Whether you’re a seasoned photographer or an emerging artist, showcasing your work in an exhibition is a significant milestone that can help you gain recognition, build your portfolio, and connect with the art community. We’ve put together a comprehensive guide to prepare for a successful photography exhibition, from curating your work to promoting the event.",
    Image: [{ url: "" }]
  };
  return <LifeDetailSection data={response || staticData} />;
};

export default LifeAtLlaDetail;
