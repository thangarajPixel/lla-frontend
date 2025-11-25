import ListSection from "@/components/sections/life-lla/ListSection";
import { Fragment } from "react/jsx-runtime";
import { getLifePageData } from "../api/server";

const LifeLla = async ({ searchParams }: any) => {
  const val = await searchParams;
  if (!val.page || !val.per_page) {
    val.page = 1;
    val.per_page = 8;
  }
  const response = await getLifePageData(val.page, val.per_page);
  console.log(response, "dfdfdf");
  return (
    <Fragment>
      <ListSection data={response} />
    </Fragment>
  );
};

export default LifeLla;
