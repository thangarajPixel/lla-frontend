import { serverAxios } from "@/helpers/AxiosHelper";

export async function getLandingPageData() {
  try {
    const { data } = await serverAxios.get(`/list`);
    return data;
  } catch (error) {
    return { error: JSON.stringify(error, null, 2) };
  }
}
