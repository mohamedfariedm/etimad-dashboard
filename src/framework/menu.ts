import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useMenu() {
  return useQuery<any, Error>({
    queryKey: [routes.menu.index],
    queryFn: () => client.menu.all(),
  });
}

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: client.menu.create,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [routes.menu.index] });
      toast.success('menu created successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });

  return { mutate, isPending };
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.menu.updateAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [routes.menu.index] });
      toast.success('menu updated successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: client.menu.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [routes.menu.index] }),
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};
