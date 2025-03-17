import { z } from 'zod';

// 내 알림 리스트 조회 API 타입
export const myNotificationsSchema = z.object({
  cursorId: z.number().nullable(),
  notifications: z.array(
    z.object({
      id: z.number(),
      teamId: z.string(),
      userId: z.number(),
      content: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
      deletedAt: z.string().datetime().nullable(),
    }),
  ),
  totalCount: z.number(),
});

export type MyNotifications = z.infer<typeof myNotificationsSchema>;

export const getMyNotificationsParamsSchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().default(10),
});

export type GetMyNotificationsParams = z.infer<typeof getMyNotificationsParamsSchema>;

// 내 알림 삭제 API 타입
export const deleteMyNotificationResponseSchema = z.object({});

export type DeleteMyNotificationResponse = z.infer<typeof deleteMyNotificationResponseSchema>;
