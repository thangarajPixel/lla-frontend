import { serverAxios } from "@/helpers/AxiosHelper";

export async function getLandingPageData() {
  try {
    const { data } = await serverAxios.get(`/home`);
    return data;
  } catch (error) {
    return { error: JSON.stringify(error, null, 2) };
  }
}
