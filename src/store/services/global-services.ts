import type { EducationDetailsSchema } from "@/components/sections/admission-form/_steps/education-details-form";
import type { PersonalDetailsSchema } from "@/components/sections/admission-form/_steps/personal-details-form";
import type { PortfolioSchema } from "@/components/sections/admission-form/_steps/portfolio-form";
import { clientAxios } from "@/helpers/AxiosHelper";

export const getStateLists = async (): Promise<StateDataResponse> => {
  const response = await clientAxios.get<StateDataResponse>("/states");
  return response.data;
};

export const createAdmission = async (
  formData: PersonalDetailsSchema | EducationDetailsSchema | PortfolioSchema,
): Promise<AdmissionFormDataResponse> => {
  const response = await clientAxios.post<AdmissionFormDataResponse>(
    "/admissions",
    { data: formData },
  );
  return response.data;
};

export const updateAdmission = async (
  id: string,
  formData: PersonalDetailsSchema | EducationDetailsSchema | PortfolioSchema,
): Promise<AdmissionFormDataResponse> => {
  const response = await clientAxios.put<AdmissionFormDataResponse>(
    `/admissions/${id}`,
    { data: formData },
  );
  return response.data;
};

export const getAdmissionById = async (
  id: number,
): Promise<AdmissionResponse> => {
  const response = await clientAxios.get<AdmissionResponse>(
    `/admissions/${id}`,
  );
  return response.data;
};
