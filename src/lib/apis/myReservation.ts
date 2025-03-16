import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import { GetMyReservationsResponse, getMyReservationsResponseSchema, ReservationUpdateResponse, ReviewResponse, reservationUpdateResponseSchema, reviewResponseSchema } from '../types/myReservation';

/*
 * 내 예약 리스트 조회 API 
 * https://sp-globalnomad-api.vercel.app/docs/#/MyReservations/Find
 */
export const getMyReservations = async (
  cursorId?: number,
  size: number = 10,
  status?: string
): Promise<GetMyReservationsResponse> => {
  const response = await axiosClientHelper.get<GetMyReservationsResponse>('/my-reservations', {
    params: { cursorId, size, status },
  });
  return safeResponse(response.data, getMyReservationsResponseSchema);
};


/*
 * 내 예약 수정 (취소) API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyReservations/Update
 */
export const cancelMyReservation = async (
  reservationId: number,
  status: 'canceled'
): Promise<ReservationUpdateResponse> => {
  const response = await axiosClientHelper.patch<ReservationUpdateResponse>(`/my-reservations/${reservationId}`, {
    status,
  });
  return safeResponse(response.data, reservationUpdateResponseSchema);
};


/*
 * 내 예약 리뷰 작성 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyReservations/CreateReview
 */
export const writeReviewForReservation = async (
  reservationId: number,
  rating: number,
  content: string
): Promise<ReviewResponse> => {
  const response = await axiosClientHelper.post<ReviewResponse>(`/my-reservations/${reservationId}/reviews`, {
    rating,
    content,
  });
  return safeResponse(response.data, reviewResponseSchema);
};
