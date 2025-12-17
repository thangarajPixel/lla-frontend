import { getTeamBySlug } from "@/app/api/server";
import TeamViewSection from "@/components/sections/more/about-us/utils/TeamViewSection";

const TeamDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data: response } = await getTeamBySlug(slug, "1");
  return <TeamViewSection data={response} />;
};
export default TeamDetail;
