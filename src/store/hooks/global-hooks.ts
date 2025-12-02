import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import {
  getAdmissionById,
  getStateLists,
} from "@/store/services/global-services";

export const useGetStateLists = (): UseQueryResult<
  StateDataResponse,
  Error
> => {
  return useQuery({
    queryKey: ["state-list"],
    queryFn: () => getStateLists(),
  });
};

export const useGetAdmissionById = (
  id: number,
): UseQueryResult<AdmissionResponse, Error> => {
  return useQuery({
    enabled: !!id,
    queryKey: [`admission-details`, id],
    queryFn: () => getAdmissionById(id),
  });
};
