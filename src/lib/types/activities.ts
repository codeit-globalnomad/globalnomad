import { z } from 'zod';

// 공통: 체험 데이터 기본 스키마
export const activitiesSchema = z.object({
  id: z.number(), // 체험 고유 ID
  userId: z.number(), // 체험 등록자 ID
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(), // 대표 이미지 URL
  rating: z.number(), // 평균 평점
  reviewCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Activity = z.infer<typeof activitiesSchema>;

// 체험 리스트 조회 API 타입
export const activitiesResponseSchema = z.object({
  activities: z.array(activitiesSchema),
  totalCount: z.number(),
});

export type ActivitiesResponse = z.infer<typeof activitiesResponseSchema>;

export const getActivitiesSchema = z.object({
  method: z.enum(['offset', 'cursor']), // 페이지네이션 방식
  cursorId: z.number().optional(),
  category: z.string().optional(),
  keyword: z.string().optional(),
  sort: z.enum(['most_reviewed', 'price_asc', 'price_desc', 'latest']).optional(),
  page: z.number().optional(),
  size: z.number().optional(), // 페이지당 개수
});

export type GetActivitiesParams = z.infer<typeof getActivitiesSchema>;

// 체험 등록 요청, 응답 API 타입
export const createScheduleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '날짜는 YYYY-MM-DD 형식으로 입력해주세요.' }),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, { message: '시작 시간 형식이 올바르지 않습니다.' }),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, { message: '종료 시간 형식이 올바르지 않습니다.' }),
});

export type CreateSchedule = z.infer<typeof createScheduleSchema>;

export const createActivitySchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요.' })
    .regex(/^[a-zA-Z0-9가-힣\s.,?!&%-]+$/, {
      message: '문자로 입력해주세요. 기호는 . , ? ! & - % 만 가능합니다.',
    }),
  category: z.string().min(1, { message: '카테고리명을 선택해주세요.' }),
  description: z
    .string()
    .min(1, { message: '설명을 입력해주세요.' })
    .regex(/^[a-zA-Z0-9가-힣\s.,?!&%-]*$/, { message: '문자로 입력해주세요. 기호는 . , ? ! & - % 만 가능합니다.' }),
  address: z.string().min(1, { message: '주소를 입력해주세요.' }),
  price: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z
      .number({ invalid_type_error: '가격은 필수 입력값입니다.' })
      .min(1000, { message: '가격은 1000원 이상이어야 합니다.' })
      .int({ message: '가격은 정수여야 합니다.' }),
  ),

  schedules: z.array(createScheduleSchema).min(1, { message: '예약 가능한 시간대는 최소 1개 이상 등록해주세요.' }),
  bannerImageUrl: z.string(),
  subImageUrls: z.array(z.string()).max(4, { message: '소개 이미지는 최대 4개까지 등록할 수 있습니다.' }).optional(),
});

export type CreateActivityParams = z.infer<typeof createActivitySchema>;

export const createActivityResponseSchema = activitiesSchema.extend({
  schedules: z.array(
    z.object({
      date: z.string(),
      times: z.array(
        z.object({
          id: z.number(),
          startTime: z.string(),
          endTime: z.string(),
        }),
      ),
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

// 체험 상세 조회 API 타입
export const activityDetailSchema = activitiesSchema.extend({
  subImages: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string(),
    }),
  ),
  schedules: z.array(
    z.object({
      id: z.number(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

export type ActivityDetailResponse = z.infer<typeof activityDetailSchema>;

// 체험 예약 가능일 조회 API 타입
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

// 체험 리뷰 조회 API 타입
export const activityReviewSchema = z.object({
  id: z.number(),
  user: z.object({
    profileImageUrl: z.string().nullable(),
    nickname: z.string(),
  }),
  activityId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ActivityReview = z.infer<typeof activityReviewSchema>;

export const activityReviewsResponseSchema = z.object({
  totalCount: z.number(),
  averageRating: z.number(),
  reviews: z.array(activityReviewSchema),
});

export type ActivityReviewsResponse = z.infer<typeof activityReviewsResponseSchema>;

// 체험 예약 신청, 응답 API 타입
export const createReservationSchema = z.object({
  scheduleId: z.number(),
  headCount: z.number(),
});

export type CreateReservationParams = z.infer<typeof createReservationSchema>;

export const reservationResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: z.enum(['pending', 'confirmed', 'declined', 'canceled', 'completed']),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ReservationResponse = z.infer<typeof reservationResponseSchema>;

// 체험 이미지 URL 생성(업로드) 요청, 응답 API 타입
export const activityImageFormSchema = z.object({
  image: z
    .custom<File>()
    .refine((file): file is File => file instanceof File, {
      message: '이미지를 선택해 주세요.',
    })
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/ico', 'image/gif', 'image/webp'].includes(file.type),
      {
        message: '지원되지 않는 이미지 파일입니다.',
      },
    )
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: '5MB 이하의 파일만 등록이 가능합니다.',
    }),
});
export type ActivityImageForm = z.infer<typeof activityImageFormSchema>;

export const activityImageUploadResponseSchema = z.object({
  activityImageUrl: z.string().url(),
});

export type ActivityImageUploadResponse = z.infer<typeof activityImageUploadResponseSchema>;
