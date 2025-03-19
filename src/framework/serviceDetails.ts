import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';


export function useRegistrationFormList() {
  return useQuery<any, Error>({
    queryKey: [routes.ServiceDetails.index],
    queryFn: () => client.ServiceDetails.all(),
  });
};
export function useSingleRegistrationForm(id:number) {
  return useQuery<any, Error>({
    queryKey: [routes.ServiceDetails.index],
    queryFn: () => client.ServiceDetails.single(id),
  });
};
export const useUpdateServices = () => {
    const queryClient = useQueryClient();
    const { closeModal } = useModal();
    return useMutation({
      mutationFn: client.ServiceDetails.update,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [routes.ServiceDetails.index]})
        toast.success('Service updated successfully')
        closeModal()
      },
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
  }