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

export async function getLifePageData(params: { page: number; per_page: number }) {
  try {
    const { data } = await serverAxios.get(`/life`, { params: params });
    return data;
  } catch (error) {
    return { error: JSON.stringify(error, null, 2) };
  }
}
