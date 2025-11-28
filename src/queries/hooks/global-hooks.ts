import type { UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getStateLists } from '@/queries/services/global-services';
import { ApplicationFormSchema_Step1 } from '@/validations/multi-step-form';

export const useGetStateLists = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['state-list'],
    queryFn: () => getStateLists(),
  });
};