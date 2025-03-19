import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useTraining() {

  return useQuery<any, Error>({queryKey: [routes.training.index], queryFn: () => client.training.all()});
};


export const useCreateTraining = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.training.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.training.index]})
      toast.success('Review created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdatetraining= () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.training.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.training.index]})
      toast.success('Review updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeletetraining = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.training.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.training.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}