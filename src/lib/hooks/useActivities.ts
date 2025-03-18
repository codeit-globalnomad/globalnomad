/**
 * ================================================================
 * [ useActivities.ts ]
 *
 * ✅ Activities(체험) 도메인 API 호출을 위한 React Query Custom Hooks 모음
 *
 * [ 포함된 API ]
 * - 체험 리스트 조회
 * - 체험 상세 조회
 * - 예약 가능일 조회
 * - 리뷰 조회
 * - 체험 등록 (Mutation)
 * - 체험 예약 (Mutation)
 * - 이미지 업로드 (Mutation)
 *
 * [ 사용 목적 ]
 * - API 호출 로직 재사용 및 일관성 유지
 * - Zod로 타입 안전성 보장
 * - 컴포넌트에서 간편하게 사용
 *
 * [ 사용 예시 ]
 * const { data } = useActivities({ method: 'offset' });
 * const { mutate } = useCreateActivity();
 *
 * ================================================================
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getActivities,
  getActivityDetail,
  getAvailableSchedule,
  getActivityReviews,
  createActivity,
  createReservation,
  uploadActivityImage,
} from '@/lib/apis/activities';

import {
  GetActivitiesParams,
  ActivitiesResponse,
  ActivityDetailResponse,
  AvailableScheduleResponse,
  ActivityReviewsResponse,
  CreateActivityParams,
  CreateActivityResponse,
  CreateReservationParams,
  ReservationResponse,
  ActivityImageUploadResponse,
} from '@/lib/types/activities';

// 체험 리스트 조회 훅
export const useActivities = (params: GetActivitiesParams) => {
  return useQuery<ActivitiesResponse>({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
  });
};

// 체험 등록 훅 (Mutation)
export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateActivityResponse, unknown, CreateActivityParams>({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};

// 체험 상세 조회 훅
export const useActivityDetail = (activityId: number) => {
  return useQuery<ActivityDetailResponse>({
    queryKey: ['activityDetail', activityId],
    queryFn: () => getActivityDetail(activityId!),
  });
};

// 체험 예약 가능일 조회 훅
export const useAvailableSchedule = (activityId?: number, year?: string, month?: string) => {
  return useQuery<AvailableScheduleResponse>({
    queryKey: ['availableSchedule', activityId, year, month],
    queryFn: () => getAvailableSchedule(activityId!, year!, month!),
  });
};

// 체험 리뷰 조회 훅
export const useActivityReviews = (activityId?: number, page = 1, size = 3) => {
  return useQuery<ActivityReviewsResponse>({
    queryKey: ['activityReviews', activityId, page, size],
    queryFn: () => getActivityReviews(activityId!, page, size),
  });
};

// 체험 예약 신청 훅 (Mutation)
export const useCreateReservation = (activityId: number) => {
  const queryClient = useQueryClient();
  return useMutation<ReservationResponse, unknown, CreateReservationParams>({
    mutationFn: (data) => createReservation(activityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activityDetail', activityId] });
    },
  });
};

// 체험 이미지 URL 생성(업로드) 훅 (Mutation)
export const useUploadActivityImage = () => {
  return useMutation<ActivityImageUploadResponse, unknown, FormData>({
    mutationFn: uploadActivityImage,
  });
};
