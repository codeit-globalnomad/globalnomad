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
  createdAt: z.string(),
  updatedAt: z.string(),
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
    })
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
    })
  );
  
export type ReservedScheduleResponse = z.infer<typeof reservedScheduleResponseSchema>;


// 내 체험 예약 시간대별 예약 내역 조회 API 타입
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
        createdAt: z.string(),
        updatedAt: z.string(),
      })
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
    createdAt: z.string(),
    updatedAt: z.string(),
  });
  
export type UpdateReservationStatusResponse = z.infer<typeof updateReservationStatusResponseSchema>;


// 내 체험 삭제 API 타입
export const deleteActivityResponseSchema = z.object({});

export type DeleteActivityResponse = z.infer<typeof deleteActivityResponseSchema>;


// 내 체험 수정 API 타입
export const updateActivityRequestSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  subImageIdsToRemove: z.array(z.number()),
  subImageUrlsToAdd: z.array(z.string()),
  scheduleIdsToRemove: z.array(z.number()),
  schedulesToAdd: z.array(
    z.object({
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
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
    createdAt: z.string(),
    updatedAt: z.string(),
    subImages: z.array(
      z.object({
        imageUrl: z.string(),
        id: z.number(),
      })
    ),
    schedules: z.array(
      z.object({
        date: z.string(),
        times: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
            id: z.number(),
          })
        ),
      })
    ),
  });
  
  export type UpdatedActivityResponse = z.infer<typeof updatedActivityResponseSchema>;
