import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import {
  DeleteMyNotificationResponse,
  GetMyNotificationsParams,
  deleteMyNotificationResponseSchema,
  myNotificationsSchema,
} from '../types/myNotification';

/*
 * 내 알림 리스트 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyNotifications/FindMyNotifications
 */
export const getMyNotifications = async (params: GetMyNotificationsParams) => {
  const response = await axiosClientHelper.get<{ data: unknown }>('/my-notifications', { params });
  return safeResponse(response.data, myNotificationsSchema);
};

/*
 * 내 알림 삭제 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyNotifications/Delete
 */
export const deleteMyNotification = async (notificationId: number): Promise<void> => {
  const response = await axiosClientHelper.delete<DeleteMyNotificationResponse>(`/my-notifications/${notificationId}`);
  if (response.status === 204) {
    return; 
  }
  safeResponse(response.data, deleteMyNotificationResponseSchema);
  return;
};
