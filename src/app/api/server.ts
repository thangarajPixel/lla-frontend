import { serverAxios } from "@/helpers/AxiosHelper";

const fetchData = async (
  endpoint: string,
  params?: Record<string, unknown>,
) => {
  try {
    const response = await serverAxios.get(
      endpoint,
      params ? { params } : undefined,
    );
    return {
      data: response.data,
      response: response,
    };
  } catch (error) {
    return { error: JSON.stringify(error, null, 2) };
  }
};

export async function getLandingPageData() {
  return fetchData("/home");
}

export async function getLandingpageCourseData() {
  return fetchData("/home/find-cards");
}

export async function getAboutUsPageData() {
  return fetchData("/about");
}

export async function getLifePageData(params: {
  page: number;
  per_page: number;
}) {
  return fetchData("/life", params);
}
