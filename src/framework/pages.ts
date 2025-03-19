import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function usePages() {
  return useQuery<any, Error>({
    queryKey: [routes.pages.index],
    queryFn: () => client.pages.allSingle(),
  });
}

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: client.pages.create,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [routes.pages.index] });
      toast.success('Page created successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });

  return { mutate, isPending };
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.pages.updateAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [routes.pages.index] });
      toast.success('Page updated successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: client.pages.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [routes.pages.index] }),
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};
