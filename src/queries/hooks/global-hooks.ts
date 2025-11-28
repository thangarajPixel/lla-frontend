import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { getStateLists } from "@/queries/services/global-services";

export const useGetStateLists = (): UseQueryResult<
  StateDataResponse,
  Error
> => {
  return useQuery({
    queryKey: ["state-list"],
    queryFn: getStateLists,
  });
};
