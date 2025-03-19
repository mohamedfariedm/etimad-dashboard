import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useServices() {

  return useQuery<any, Error>({queryKey: [routes.Services.index], queryFn: () => client.counrty.all()});
};


export const useCreateServices = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.counrty.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.Services.index]})
      toast.success('Service created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdateServices = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.counrty.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.Services.index]})
      toast.success('Service updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeleteServices = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.counrty.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.Services.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}