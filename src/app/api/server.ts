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

export async function getCoursesListData() {
  return fetchData("/courses-list");
}

export async function getLandingpageCourseData() {
  return fetchData("/home/find-cards");
}

export async function getAboutUsPageData() {
  return fetchData("/about");
}
export async function getContactPageData() {
  return fetchData("/contact-page");
}
export async function getFacultyPageData() {
  return fetchData("/faculty");
}

export async function getLifePageData(params: {
  page: number;
  per_page: number;
}) {
  return fetchData("/life-at-lla", params);
}

export async function getLifeById(Slug: string) {
  return fetchData(`/life-at-lla/${Slug}`);
}

export async function getAdmissionsPageData() {
  return fetchData("/admissions");
}

export async function getAdmissionsById(id: number) {
  return fetchData(`/admissions/${id}`);
}

export async function getCampusPageData() {
  return fetchData("/campus");
}

export async function getGalleryPageData(params?: {
  page?: number;
  pageSize?: number;
  type?: string;
}) {
  return fetchData("/gallery", params);
}

export async function getCoursePageData() {
  return fetchData("/course");
}

export async function getEssentialsData() {
  return fetchData("/essential");
}

export async function getFooterData() {
  return fetchData("/footer");
}

export async function getCourseBySlug(slug: string) {
  return fetchData(`/courses/view/${slug}`);
}

export async function getBlogPageData() {
  return fetchData("/blog");
}
