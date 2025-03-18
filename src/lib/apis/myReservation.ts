import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import { 
  GetMyReservationsParams,
  GetMyReservationsResponse, 
  getMyReservationsResponseSchema,
  ReservationUpdateResponse,
  ReviewResponse,
  reservationUpdateResponseSchema,
  reviewResponseSchema, 
  WriteReviewForReservationParams
} from '../types/myReservation';

/*
 * 내 예약 리스트 조회 API 
 * https://sp-globalnomad-api.vercel.app/docs/#/MyReservations/Find
 */
export const getMyReservations = async ( params: GetMyReservationsParams): Promise<GetMyReservationsResponse> => {
  const response = await axiosClientHelper.get<GetMyReservationsResponse>('/my-reservations', { params });
  return safeResponse(response.data, getMyReservationsResponseSchema);
};

/*
 * 내 예약 수정(취소) API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyReservations/Update
 */
export const cancelMyReservation = async (reservationId: number, status: 'canceled'): Promise<ReservationUpdateResponse> => {
  const response = await axiosClientHelper.patch<ReservationUpdateResponse>(`/my-reservations/${reservationId}`, {
    status,
  });
  return safeResponse(response.data, reservationUpdateResponseSchema);
};

/*
 * 내 예약 리뷰 작성 API
 * https://sp-globalnomad-api.vercel.app/docs/#/MyReservations/CreateReview
 */
export const writeReviewForReservation = async (reservationId: number, data: WriteReviewForReservationParams ): Promise<ReviewResponse> => {
  const response = await axiosClientHelper.post<ReviewResponse>(`/my-reservations/${reservationId}/reviews`, data);
  return safeResponse(response.data, reviewResponseSchema);
};
