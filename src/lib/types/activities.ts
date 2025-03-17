import { z } from 'zod';

// 공통: 체험 데이터 기본 스키마
export const activitiesSchema = z.object({
  id: z.number(), // 체험 고유 ID
  userId: z.number(), // 체험 등록자 ID
  title: z.string(), // 제목
  description: z.string(), // 설명
  category: z.string(), // 카테고리
  price: z.number(), // 가격
  address: z.string(), // 주소
  bannerImageUrl: z.string(), // 대표 이미지 URL
  rating: z.number(), // 평균 평점
  reviewCount: z.number(), // 리뷰 수
  createdAt: z.union([z.string(), z.date()]), // 생성일
  updatedAt: z.union([z.string(), z.date()]), // 수정일
});
export type Activity = z.infer<typeof activitiesSchema>;

// 1. 체험 리스트 조회 API 타입
export const activitiesResponseSchema = z.object({
  activities: z.array(activitiesSchema), // 체험 리스트
  totalCount: z.number(), // 총 개수
});
export type ActivitiesResponse = z.infer<typeof activitiesResponseSchema>;

export const getActivitiesSchema = z.object({
  method: z.enum(['offset', 'cursor']), // 페이지네이션 방식
  cursorId: z.number().optional(), // 커서 ID
  category: z.string().optional(), // 카테고리 필터
  keyword: z.string().optional(), // 검색어
  sort: z.enum(['most_reviewed', 'price_asc', 'price_desc', 'latest']).optional(), // 정렬
  page: z.number().optional(), // 페이지
  size: z.number().optional(), // 페이지당 개수
});
export type GetActivitiesParams = z.infer<typeof getActivitiesSchema>;

// 2. 체험 상세 조회 API 타입
export const activityDetailSchema = activitiesSchema.extend({
  subImages: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string(),
    }),
  ), // 서브 이미지
  schedules: z.array(
    z.object({
      id: z.number(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ), // 스케줄
});
export type ActivityDetailResponse = z.infer<typeof activityDetailSchema>;

// 3. 체험 예약 가능일 조회 API 타입
export const availableScheduleSchema = z.object({
  date: z.string(),
  times: z.array(
    z.object({
      id: z.number(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});
export type AvailableScheduleResponse = z.infer<typeof availableScheduleSchema>[];

// 4. 체험 리뷰 조회 API 타입
export const activityReviewSchema = z.object({
  id: z.number(),
  user: z.object({
    profileImageUrl: z.string(),
    nickname: z.string(),
  }),
  activityId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ActivityReview = z.infer<typeof activityReviewSchema>;

export const activityReviewsResponseSchema = z.object({
  totalCount: z.number(),
  averageRating: z.number(),
  reviews: z.array(activityReviewSchema),
});
export type ActivityReviewsResponse = z.infer<typeof activityReviewsResponseSchema>;

// 5. 체험 등록 요청 & 응답 API 타입
export const createScheduleSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
export type CreateSchedule = z.infer<typeof createScheduleSchema>;

export const createActivitySchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  address: z.string(),
  price: z.number(),
  schedules: z.array(createScheduleSchema),
  bannerImageUrl: z.string(),
  subImageUrls: z.array(z.string()).optional(),
});
export type CreateActivityParams = z.infer<typeof createActivitySchema>;

export const createActivityResponseSchema = activitiesSchema.extend({
  schedules: z.array(
    z.object({
      id: z.number(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
  subImages: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string(),
    }),
  ),
});
export type CreateActivityResponse = z.infer<typeof createActivityResponseSchema>;

// 6. 체험 예약 요청 & 응답 API 타입
export const createReservationSchema = z.object({
  scheduleId: z.number(),
  headcount: z.number(),
});
export type CreateReservationParams = z.infer<typeof createReservationSchema>;

export const reservationResponseSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: z.enum(['pending', 'confirmed', 'declined', 'canceled', 'completed']),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headcount: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ReservationResponse = z.infer<typeof reservationResponseSchema>;

// 7. 체험 이미지 업로드 API 타입
export const activityImageUploadResponseSchema = z.object({
  activityImageUrl: z.string(),
});
export type ActivityImageUploadResponse = z.infer<typeof activityImageUploadResponseSchema>;
