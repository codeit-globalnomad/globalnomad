import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyReservations, cancelMyReservation, writeReviewForReservation } from '../apis/myReservation';

// 내 예약 리스트 조회 훅
export const useMyReservations = (cursorId?: number, size: number = 10, status?: string) => {
  return useQuery({
    queryKey: ['myReservations', cursorId, size, status],
    queryFn: () => getMyReservations(cursorId, size, status),
    staleTime: 30000,
  });
};


// 내 예약 취소 훅
export const useCancelMyReservation = () => {
  return useMutation({
    mutationFn: (reservationId: number) => cancelMyReservation(reservationId, 'canceled'),
  });
};


// 내 예약 리뷰 작성 훅
export const useWriteReviewForReservation = () => {
  return useMutation({
    mutationFn: (data: { reservationId: number; rating: number; content: string }) =>
      writeReviewForReservation(data.reservationId, data.rating, data.content),
  });
};
