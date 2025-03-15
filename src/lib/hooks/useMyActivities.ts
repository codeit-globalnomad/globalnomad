import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyActivities, getReservationDashboard, getReservedSchedule, getReservations, updateReservationStatus, deleteActivity, updateActivity } from '../apis/myActivities';
import { UpdateActivityRequest } from '../types/myActivities';

// 내 체험 리스트 조회 훅
export const useMyActivities = (cursorId?: number, size: number = 20) => {
    return useQuery({
      queryKey: ['myActivities', cursorId, size],
      queryFn: () => getMyActivities(cursorId, size),
      staleTime: 30000,
    });
  };


// 내 체험 월별 예약 현황 조회 훅
export const useReservationDashboard = (activityId: number, year: string, month: string) => {
    return useQuery({
      queryKey: ['reservationDashboard', activityId, year, month],
      queryFn: () => getReservationDashboard(activityId, year, month),
      staleTime: 30000,
    });
  };


// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케쥴 조회 훅
export const useReservedSchedule = (activityId: number, date: string) => {
    return useQuery({
      queryKey: ['reservedSchedule', activityId, date],
      queryFn: () => getReservedSchedule(activityId, date),
      staleTime: 30000,
    });
  };


// 내 체험 예약 시간대별 예약 내역 조회 훅
export const useReservations = (
    activityId: number,
    scheduledId: number,
    status: 'declined' | 'pending' | 'confirmed',
    cursorId?: number,
    size: number = 10,
  ) => {
    return useQuery({
      queryKey: ['reservations', activityId, scheduledId, status, cursorId, size],
      queryFn: () => getReservations(activityId, scheduledId, status, cursorId, size),
      staleTime: 30000,
    });
};


// 내 체험 예약 상태(승인, 거절) 업데이트 훅
export const useUpdateReservationStatus = () => {
    return useMutation({
      mutationFn: (data: { activityId: number; reservationId: number; status: 'declined' | 'confirmed' }) =>
        updateReservationStatus(data.activityId, data.reservationId, data.status),
    });
  };


// 내 체험 삭제 훅
export const useDeleteActivity = () => {
    return useMutation({
      mutationFn: (activityId: number) => deleteActivity(activityId),
    });
  };


// 내 체험 수정 훅
export const useUpdateActivity = () => {
    return useMutation({
      mutationFn: (params: { activityId: number, data: UpdateActivityRequest }) => updateActivity(params.activityId, params.data),
    });
  };
