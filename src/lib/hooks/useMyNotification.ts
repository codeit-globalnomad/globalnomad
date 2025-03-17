import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyNotifications, deleteMyNotification } from '../apis/myNotifications';
import { GetMyNotificationsParams, MyNotifications } from '../types/myNotification';

export const useMyNotifications = (params: GetMyNotificationsParams) => {
  return useQuery<MyNotifications>({
    queryKey: ['myNotifications', params],
    queryFn: async () => {
      const data = await getMyNotifications(params);
      return data || { cursorId: 0, notifications: [], totalCount: 0 };
    },
    enabled: true,
  });
};

export const useDeleteMyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => deleteMyNotification({ notificationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNotifications'] });
    },
    onError: (error) => {
      console.error('Failed to delete notification:', error);
    },
  });
};
