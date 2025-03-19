import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyReservations, cancelMyReservation, writeReviewForReservation } from '../apis/myReservation';
import { GetMyReservationsParams, WriteReviewForReservationParams } from '../types/myReservation';

// 내 예약 리스트 조회 훅
export const useMyReservations = (params: GetMyReservationsParams) => {
  return useQuery({
    queryKey: ['myReservations', params],
    queryFn: () => getMyReservations(params),
  });
};

// 내 예약 수정(취소) 훅
export const useCancelMyReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reservationId: number) => cancelMyReservation(reservationId, 'canceled'),
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
