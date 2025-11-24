import ListSection from "@/components/sections/life-lla/ListSection";
import { Fragment } from "react/jsx-runtime";
import { getLifePageData } from "../api/server";

const LifeLla = async () => {
  const response = await getLifePageData();
  return (
      <Fragment>
      <ListSection data={response} />
      </Fragment>
  );
};

export default LifeLla;
