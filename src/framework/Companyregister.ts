import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useRegistrationFormList() {
  return useQuery<any, Error>({
    queryKey: [routes.Companyregister.index],
    queryFn: () => client.Companyregister.all(),
  });
};
export function useSingleRegistrationForm(id:number) {
  return useQuery<any, Error>({
    queryKey: [routes.Companyregister.index],
    queryFn: () => client.Companyregister.single(id),
  });
};

export const useDeleteContacts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: client.Companyregister.delete,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.Companyregister.index]}),
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}
