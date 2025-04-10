import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  getMyActivities,
  getReservationDashboard,
  getReservedSchedule,
  getReservations,
  updateReservationStatus,
  deleteActivity,
  updateActivity,
} from '../apis/myActivities';
import { GetReservationsParams, MyActivitiesResponse, UpdateActivityRequest } from '../types/myActivities';

// 내 체험 리스트 조회 훅
export const useMyActivities = (cursorId?: number, size: number = 20) => {
  return useQuery({
    queryKey: ['myActivities', cursorId, size],
    queryFn: () => getMyActivities(cursorId, size),
  });
};

// 내 체험 월별 예약 현황 조회 훅
export const useReservationDashboard = (activityId: number, year: string, month: string) => {
  return useQuery({
    queryKey: ['reservationDashboard', activityId, year, month],
    queryFn: () => getReservationDashboard(activityId, year, month),
    enabled: !!activityId && !!year && !!month,
  });
};

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케쥴 조회 훅
export const useReservedSchedule = (activityId: number, date: string) => {
  return useQuery({
    queryKey: ['reservedSchedule', activityId, date],
    queryFn: () => getReservedSchedule(activityId, date),
  });
};

// 내 체험 예약 시간대별 예약 내역 조회 훅
export const useReservations = (activityId: number, params: GetReservationsParams) => {
  return useQuery({
    queryKey: ['reservations', activityId, params],
    queryFn: () => getReservations(activityId, params),
    enabled: params.scheduleId !== undefined && !isNaN(params.scheduleId),
  });
};

// 내 체험 예약 상태(승인, 거절) 업데이트 훅
export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { activityId: number; reservationId: number; status: 'declined' | 'confirmed' }) =>
      updateReservationStatus(data.activityId, data.reservationId, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

// 내 체험 삭제 훅
export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activityId: number) => deleteActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    },
  });
};

// 내 체험 수정 훅
export const useUpdateActivity = (activityId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateActivityRequest) => updateActivity(activityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    },
  });
};

// 내 체험 무한스크롤 조회 훅
export const useInfiniteMyActivities = () => {
  const PAGE_SIZE = 4;

  return useInfiniteQuery<MyActivitiesResponse, Error>({
    queryKey: ['myActivities'],
    queryFn: ({ pageParam }) => getMyActivities(typeof pageParam === 'number' ? pageParam : undefined, PAGE_SIZE),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
    staleTime: 0,
    gcTime: 0,
  });
};

// 내 체험 예약 시간대별 예약 내역 조회 무한스크롤 훅
export const useInfiniteTimeSlotReservations = (
  activityId: number,
  params: Omit<GetReservationsParams, 'cursorId'>,
  enabled: boolean,
) => {
  return useInfiniteQuery({
    queryKey: ['reservations', activityId, params],
    queryFn: ({ pageParam = undefined }: { pageParam?: number }) =>
      getReservations(activityId, {
        ...params,
        cursorId: pageParam ?? undefined,
        size: 3,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.reservations?.length) return undefined;
      return lastPage.reservations.at(-1)?.id;
    },
    initialPageParam: undefined,
    enabled,
    staleTime: 0,
  });
};
