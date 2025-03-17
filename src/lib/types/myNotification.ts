import { z } from 'zod';

export const myNotificationsSchema = z.object({
  cursorId: z.number().nullable(),
  notifications: z.array(
    z.object({
      id: z.number(),
      teamId: z.string(),
      userId: z.number(),
      content: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      deletedAt: z.string().nullable().optional(),
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

export const deleteMyNotificationsParamsSchema = z.object({
  notificationId: z.number(),
});

export type DeleteMyNotificationsParams = z.infer<typeof deleteMyNotificationsParamsSchema>;

export const deleteMyNotificationResponseSchema = z.object({
  success: z.boolean(),
});

export type DeleteMyNotificationResponse = z.infer<typeof deleteMyNotificationResponseSchema>;
