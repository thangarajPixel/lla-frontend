import { clientAxios } from "@/helpers/AxiosHelper";
import type {
  ApplicationFormSchema_Step1,
  ApplicationFormSchema_Step2,
  ApplicationFormSchema_Step3,
} from "@/validations/multi-step-form";

export const getStateLists = async (): Promise<StateDataResponse> => {
  const response = await clientAxios.get<StateDataResponse>("/states");
  return response.data;
};

export const createAdmission = async (
  formData:
    | ApplicationFormSchema_Step1
    | ApplicationFormSchema_Step2
    | ApplicationFormSchema_Step3,
): Promise<AdmissionFormDataResponse> => {
  const response = await clientAxios.post<AdmissionFormDataResponse>(
    "/admissions",
    { data: formData },
  );
  return response.data;
};

export const updateAdmission = async (
  id: string,
  formData:
    | ApplicationFormSchema_Step1
    | ApplicationFormSchema_Step2
    | ApplicationFormSchema_Step3,
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
