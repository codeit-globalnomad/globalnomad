import { z } from 'zod';

// 내 예약 리스트 조회 API 타입
export const reservationWithActivitySchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activity: z.object({
    bannerImageUrl: z.string(),
    title: z.string(),
    id: z.number(),
  }),
  scheduleId: z.number(),
  status: z.enum(['pending', 'confirmed', 'declined', 'canceled', 'completed']),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getMyReservationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  reservations: z.array(reservationWithActivitySchema),
  totalCount: z.number(),
});

export type ReservationWithActivity = z.infer<typeof reservationWithActivitySchema>;
export type GetMyReservationsResponse = z.infer<typeof getMyReservationsResponseSchema>;


// 내 예약 수정 (취소) API 타입
export const cancelReservationRequestSchema = z.object({
    status: z.enum(['canceled']),
  });
  
export type CancelReservationRequest = z.infer<typeof cancelReservationRequestSchema>;

export const reservationUpdateResponseSchema = z.object({
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
    createdAt: z.string(),
    updatedAt: z.string(),
  });
  
  export type ReservationUpdateResponse = z.infer<typeof reservationUpdateResponseSchema>;
  

// 내 예약 리뷰 작성 API 타입
export const createReviewRequestSchema = z.object({
  rating: z.number().min(1, '별점은 1 이상이어야 합니다.').max(5, '별점은 5 이하이어야 합니다.'), 
  content: z
    .string()
    .min(1, { message: '후기 내용을 입력해주세요.' })
    .regex(/^[a-zA-Z0-9가-힣\s\.,!?]+$/, { message: '후기 내용은 문자, 숫자, 공백, 일부 특수문자만 포함할 수 있습니다.' })
});
  
export type CreateReviewRequest = z.infer<typeof createReviewRequestSchema>;

export const reviewResponseSchema = z.object({
    deletedAt: z.string().nullable(),
    updatedAt: z.string(),
    createdAt: z.string(),
    content: z.string(),
    rating: z.number(),
    userId: z.number(),
    activityId: z.number(),
    teamId: z.string(),
    id: z.number(),
  });
  
  export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
  