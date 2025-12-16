import NilgirisSection from "@/components/sections/nilgiris/NilgirisSection";
import { getNilgirisPageData } from "../api/server";

const Nilgiris = async () => {
  const [{ data: response }] = await Promise.all([getNilgirisPageData()]);

  if (response) return <NilgirisSection data={response} />;
};

export default Nilgiris;
