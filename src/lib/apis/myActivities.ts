import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '..//network/safeResponse';
import { 
  MyActivitiesResponse, 
  myActivitiesResponseSchema, 
  ReservationDashboardResponse, 
  reservationDashboardResponseSchema, 
  ReservedScheduleResponse, 
  reservedScheduleResponseSchema, 
  ReservationResponse, 
  reservationResponseSchema, 
  UpdateReservationStatusResponse, 
  updateReservationStatusResponseSchema, 
  DeleteActivityResponse, 
  deleteActivityResponseSchema, 
  UpdatedActivityResponse, 
  updatedActivityResponseSchema, 
  UpdateActivityRequest,
  GetReservationsParams
 } from '../types/myActivities';

/*
 * 내 체험 리스트 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyActivities/FindByUserId
 */
export const getMyActivities = async (cursorId?: number, size: number = 20): Promise<MyActivitiesResponse> => {
  const response = await axiosClientHelper.get<MyActivitiesResponse>(
    '/my-activities', 
    { params: { cursorId, size } });
  return safeResponse(response.data, myActivitiesResponseSchema);
};

/*
 * 내 체험 월별 예약 현황 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyActivities/FindReservationsByMonth
 */
export const getReservationDashboard = async (
  activityId: number, 
  year: string, 
  month: string
): Promise<ReservationDashboardResponse> => {
  const response = await axiosClientHelper.get<ReservationDashboardResponse[]>(
    `/my-activities/${activityId}/reservation-dashboard`, 
    { params: { year, month } });
  return safeResponse(response.data, reservationDashboardResponseSchema);
};

/*
 * 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케쥴 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyActivities/FindReservedSchedule
 */
export const getReservedSchedule = async (activityId: number, date: string): Promise<ReservedScheduleResponse> => {
  const response = await axiosClientHelper.get<ReservedScheduleResponse[]>(
    `/my-activities/${activityId}/reserved-schedule`, 
    { params: { date } });
  return safeResponse(response.data, reservedScheduleResponseSchema);
};

/*
 * 내 체험 예약 시간대별 예약 내역 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyActivities/FindReservations
 */
export const getReservations = async (activityId: number, params: GetReservationsParams): Promise<ReservationResponse> => {
  const response = await axiosClientHelper.get<ReservationResponse>(
      `/my-activities/${activityId}/reservations`,{ params });
  return safeResponse(response.data, reservationResponseSchema);
};

/*
 * 내 체험 예약 상태(승인, 거절) 업데이트 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyActivities/UpdateReservations
 */
export const updateReservationStatus = async (
  activityId: number,
  reservationId: number,
  status: 'declined' | 'confirmed'
): Promise<UpdateReservationStatusResponse> => {
    const response = await axiosClientHelper.patch<UpdateReservationStatusResponse>(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      { status }
    );
    return safeResponse(response.data, updateReservationStatusResponseSchema);
};

/*
 * 내 체험 삭제 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyActivities/Delete
 */
export const deleteActivity = async (activityId: number): Promise<void> => {
  const response = await axiosClientHelper.delete<DeleteActivityResponse>(`/my-activities/${activityId}`);
  if (response.status === 204) {
    return; 
  }
  safeResponse(response.data, deleteActivityResponseSchema);
  return;
};

/*
 * 내 체험 수정 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyActivities/Update
 */
export const updateActivity = async (
  activityId: number,
  data: UpdateActivityRequest
): Promise<UpdatedActivityResponse> => {
    const response = await axiosClientHelper.patch<UpdatedActivityResponse>(`/my-activities/${activityId}`, data);
    return safeResponse(response.data, updatedActivityResponseSchema);
};
