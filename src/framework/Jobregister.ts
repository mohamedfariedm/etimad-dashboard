import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useQuery } from '@tanstack/react-query';

export function useRegistrationFormList() {
  return useQuery<any, Error>({
    queryKey: [routes.Jobregister.index],
    queryFn: () => client.Jobregister.all(),
  });
};
export function useSingleRegistrationForm(id:number) {
  return useQuery<any, Error>({
    queryKey: [routes.Jobregister.index],
    queryFn: () => client.Jobregister.single(id),
  });
};
