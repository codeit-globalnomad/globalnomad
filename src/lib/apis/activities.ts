import { z } from 'zod';
import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import {
  ActivitiesResponse,
  activitiesResponseSchema,
  GetActivitiesParams,
  ActivityDetailResponse,
  activityDetailSchema,
  AvailableScheduleResponse,
  availableScheduleSchema,
  ActivityReviewsResponse,
  activityReviewsResponseSchema,
  CreateActivityParams,
  CreateActivityResponse,
  createActivityResponseSchema,
  CreateReservationParams,
  ReservationResponse,
  reservationResponseSchema,
  ActivityImageUploadResponse,
  activityImageUploadResponseSchema,
} from '../types/activities';

/*
 * 체험 리스트 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Activities/Find
 */
export const getActivities = async (params: GetActivitiesParams) => {
  const response = await axiosClientHelper.get<ActivitiesResponse>('/activities', { params });
  return safeResponse(response.data, activitiesResponseSchema);
};

/*
 * 체험 상세 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Activities/GetById
 */
export const getActivityDetail = async (activityId: number) => {
  const response = await axiosClientHelper.get<ActivityDetailResponse>(`/activities/${activityId}`);
  return safeResponse(response.data, activityDetailSchema);
};

/*
 * 체험예약 가능일 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Activities/FindAvailableSchedule
 */
export const getAvailableSchedule = async (activityId: number, year: string, month: string) => {
  const response = await axiosClientHelper.get<AvailableScheduleResponse>(
    `/activities/${activityId}/available-schedule`,
    { params: { year, month } },
  );
  return safeResponse(response.data, z.array(availableScheduleSchema));
};

/*
 * 체험 리뷰 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Activities/FindReviews
 */
export const getActivityReviews = async (activityId: number, page = 1, size = 3) => {
  const response = await axiosClientHelper.get<ActivityReviewsResponse>(`/activities/${activityId}/reviews`, {
    params: { page, size },
  });
  return safeResponse(response.data, activityReviewsResponseSchema);
};

/*
 * 체험등록 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Activities/Create
 */
export const createActivity = async (data: CreateActivityParams) => {
  const response = await axiosClientHelper.post<CreateActivityResponse>('/activities', data);
  return safeResponse(response.data, createActivityResponseSchema);
};

/*
 * 체험 예약 신청  API
 * https://sp-globalnomad-api.vercel.app/docs/#/Activities/CreatReservation
 */
export const createReservation = async (activityId: number, data: CreateReservationParams) => {
  const response = await axiosClientHelper.post<ReservationResponse>(`/activities/${activityId}/reservations`, data);
  return safeResponse(response.data, reservationResponseSchema);
};

/*
 * 체험 이미지 업로드 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Activities/UploadActivityImage
 */
export const uploadActivityImage = async (formData: FormData) => {
  const response = await axiosClientHelper.post<ActivityImageUploadResponse>('/activities/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return safeResponse(response.data, activityImageUploadResponseSchema);
};
