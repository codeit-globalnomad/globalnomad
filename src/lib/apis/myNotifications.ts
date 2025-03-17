import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import {
  GetMyNotificationsParams,
  deleteMyNotificationResponseSchema,
  deleteMyNotificationsParamsSchema,
  myNotificationsSchema,
} from '../types/myNotification';

export const getMyNotifications = async (params: GetMyNotificationsParams) => {
  const response = await axiosClientHelper.get<{ data: unknown }>('/my-notifications', { params });
  return safeResponse(response.data, myNotificationsSchema);
};

export const deleteMyNotification = async (params: { notificationId: number }) => {
  deleteMyNotificationsParamsSchema.parse(params);

  const response = await axiosClientHelper.delete<{ success: boolean }>(`/my-notifications/${params.notificationId}`);

  return safeResponse(response.data, deleteMyNotificationResponseSchema);
};
