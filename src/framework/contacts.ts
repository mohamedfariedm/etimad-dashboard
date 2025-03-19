import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useContacts() {
  return useQuery<any, Error>({
    queryKey: [routes.contacts.index],
    queryFn: () => client.contacts.all(),
  });
};
export const useDeleteContacts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: client.contacts.delete,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.contacts.index]}),
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}
