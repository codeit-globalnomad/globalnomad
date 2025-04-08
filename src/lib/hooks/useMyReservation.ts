import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getMyReservations, cancelMyReservation, writeReviewForReservation } from '../apis/myReservation';
import {
  GetMyReservationsParams,
  GetMyReservationsResponse,
  WriteReviewForReservationParams,
} from '../types/myReservation';

// 내 예약 리스트 조회 훅
export const useMyReservations = (params: GetMyReservationsParams) => {
  return useQuery({
    queryKey: ['myReservations', params],
    queryFn: () => getMyReservations(params),
  });
};

// 내 예약 수정(취소) 훅
const cancelReservation = (reservationId: number) => cancelMyReservation(reservationId, 'canceled');

export const useCancelMyReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['cancelMyReservation'],
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
  });
};

// 내 예약 리뷰 작성 훅
export const useWriteReviewForReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { reservationId: number; reviewData: WriteReviewForReservationParams }) =>
      writeReviewForReservation(data.reservationId, data.reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
  });
};

// 내 예약 무한스크롤 조회 훅
export const useInfiniteMyReservations = (status?: GetMyReservationsParams['status']) => {
  const PAGE_SIZE = 4;

  return useInfiniteQuery<GetMyReservationsResponse, Error>({
    queryKey: ['myReservations', status ?? 'all'],
    queryFn: ({ pageParam }) =>
      getMyReservations({
        cursorId: typeof pageParam === 'number' ? pageParam : undefined,
        size: PAGE_SIZE,
        ...(status ? { status } : {}), // status가 없을 때는 아예 status를 전송 안 함
      }),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
    staleTime: 0,
    gcTime: 0,
  });
};
