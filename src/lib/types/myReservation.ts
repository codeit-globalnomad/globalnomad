import { z } from 'zod';

// 내 예약 리스트 조회 API 타입
export const getMyReservationsParams = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
  status: z.enum(['pending', 'confirmed', 'declined', 'canceled', 'completed']).optional(),  
})

export type GetMyReservationsParams = z.infer<typeof getMyReservationsParams>;

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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ReservationWithActivity = z.infer<typeof reservationWithActivitySchema>;

export const getMyReservationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  reservations: z.array(reservationWithActivitySchema),
  totalCount: z.number(),
});

export type GetMyReservationsResponse = z.infer<typeof getMyReservationsResponseSchema>;

// 내 예약 수정(취소) API 타입
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
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });
  
export type ReservationUpdateResponse = z.infer<typeof reservationUpdateResponseSchema>;
  
// 내 예약 리뷰 작성 API 타입
export const writeReviewForReservationParams = z.object({
  rating: z.number()
    .int({ message: '별점은 정수로 입력해주세요.' })
    .min(1, { message: '별점은 1 이상이어야 합니다.' }),
  content: z
    .string()
    .min(1, { message: '후기 내용을 입력해주세요.' })
    .regex(/^[a-zA-Z0-9가-힣\s\.,!?]+$/, { message: '후기 내용에는 문자, 숫자, 공백, 일부 특수문자(HTML 코드 문자 제외)만 입력할 수 있습니다.' })
});
  
export type WriteReviewForReservationParams = z.infer<typeof writeReviewForReservationParams>;

export const reviewResponseSchema = z.object({
    deletedAt: z.string().nullable(),
    updatedAt: z.string().datetime(),
    createdAt: z.string().datetime(),
    content: z.string(),
    rating: z.number(),
    userId: z.number(),
    activityId: z.number(),
    teamId: z.string(),
    id: z.number(),
  });
  
  export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
  