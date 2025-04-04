import { z } from 'zod';

// 내 체험 리스트 조회 API 타입
export const activityBasicSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const myActivitiesResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  activities: z.array(activityBasicSchema),
});

export type ActivityBasic = z.infer<typeof activityBasicSchema>;

export type MyActivitiesResponse = z.infer<typeof myActivitiesResponseSchema>;

// 내 체험 월별 예약 현황 조회 API 타입
export const reservationDashboardResponseSchema = z.array(
  z.object({
    date: z.string(),
    reservations: z.object({
      pending: z.number(),
      confirmed: z.number(),
      completed: z.number(),
    }),
  }),
);

export type ReservationDashboardResponse = z.infer<typeof reservationDashboardResponseSchema>;

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케쥴 조회 API 타입
export const reservedScheduleResponseSchema = z.array(
  z.object({
    scheduleId: z.number(),
    startTime: z.string(),
    endTime: z.string(),
    count: z.object({
      declined: z.number(),
      confirmed: z.number(),
      pending: z.number(),
    }),
  }),
);

export type ReservedScheduleResponse = z.infer<typeof reservedScheduleResponseSchema>;

// 내 체험 예약 시간대별 예약 내역 조회 API 타입
export const getReservationsParams = z.object({
  scheduleId: z.number().optional(),
  status: z.enum(['declined', 'pending', 'confirmed']),
  cursorId: z.number().optional(),
  size: z.number().optional(),
});

export type GetReservationsParams = z.infer<typeof getReservationsParams>;

export const reservationResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  reservations: z.array(
    z.object({
      id: z.number(),
      nickname: z.string(),
      userId: z.number(),
      teamId: z.string(),
      activityId: z.number(),
      scheduleId: z.number(),
      status: z.string(),
      reviewSubmitted: z.boolean(),
      totalPrice: z.number(),
      headCount: z.number(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

export type ReservationResponse = z.infer<typeof reservationResponseSchema>;

// 내 체험 예약 상태(승인, 거절) 업데이트 API 타입
export const updateReservationStatusResponseSchema = z.object({
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

export type UpdateReservationStatusResponse = z.infer<typeof updateReservationStatusResponseSchema>;

// 내 체험 삭제 API 타입
export const deleteActivityResponseSchema = z.object({});

export type DeleteActivityResponse = z.infer<typeof deleteActivityResponseSchema>;

// 내 체험 수정 API 타입
export const updateActivityRequestSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요.' })
    .regex(/^[a-zA-Z0-9가-힣\s]+$/, { message: '제목은 문자열로 입력해주세요.' }),
  category: z.enum(['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'], {
    message: '카테고리명을 선택해주세요.',
  }),
  description: z
    .string()
    .min(1, { message: '설명을 입력해주세요.' })
    .regex(/^[a-zA-Z0-9가-힣\s\.,!?]+$/, {
      message: '설명에는 문자, 숫자, 공백, 일부 특수문자(HTML 코드 문자 제외)만 입력할 수 있습니다.',
    }),
  price: z.number().min(1, { message: '가격은 숫자로 입력해주세요.' }).int({ message: '가격은 정수로 입력해주세요.' }),
  address: z.string().min(1, { message: '주소를 입력해주세요.' }),
  bannerImageUrl: z.string().url().nonempty({ message: '배너 이미지를 반드시 1개 등록해주세요.' }),
  subImageIdsToRemove: z.array(z.number()),
  subImageUrlsToAdd: z.array(z.string()),
  scheduleIdsToRemove: z.array(z.number()),
  schedulesToAdd: z.array(
    z.object({
      date: z.string().min(1, { message: '날짜를 입력해주세요.' }),
      startTime: z.string().min(1, { message: '시작 시간을 입력해주세요.' }),
      endTime: z.string().min(1, { message: '종료 시간을 입력해주세요.' }),
    }),
  ),
});

export type UpdateActivityRequest = z.infer<typeof updateActivityRequestSchema>;

export const updatedActivityResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  subImages: z.array(
    z.object({
      imageUrl: z.string(),
      id: z.number(),
    }),
  ),
  schedules: z.array(
    z.object({
      date: z.string(),
      times: z.array(
        z.object({
          startTime: z.string(),
          endTime: z.string(),
          id: z.number(),
        }),
      ),
    }),
  ),
});

export type UpdatedActivityResponse = z.infer<typeof updatedActivityResponseSchema>;
