import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useTraining() {

  return useQuery<any, Error>({queryKey: ['new-training-box'], queryFn: () => client.trainingbox.all()});
};
export function useTrainingbox() {

    return useQuery<any, Error>({queryKey: ['trainingbox'], queryFn: () => client.trainingbox.allCategory()});
};
  

export const useCreateTraining = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.trainingbox.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['new-training-box']})
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
    mutationFn: client.trainingbox.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['new-training-box']})
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
      mutationFn: client.trainingbox.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: ['new-training-box']}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}