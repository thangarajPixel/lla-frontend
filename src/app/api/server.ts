import { serverAxios } from "@/helpers/AxiosHelper";

export async function getLandingPageData() {
  try {
    const { data } = await serverAxios.get(`/home`);
    return data;
  } catch (error) {
    return { error: JSON.stringify(error, null, 2) };
  }
}


export async function getAboutUsPageData() {
  try {
    const { data } = await serverAxios.get(`/about`);
    return data;
  } catch (error) {
    return { error: JSON.stringify(error, null, 2) };
  }
}

export async function getLifePageData(page : number, perPage : number) {
  try {
    const { data } = await serverAxios.get(`/life?per_page=${perPage}&page=${page}`);
    return data;
  } catch (error) {
    return { error: JSON.stringify(error, null, 2) };
  }
}
