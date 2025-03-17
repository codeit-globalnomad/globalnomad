import { z } from 'zod';

// 로그인 요청 API 타입
export const loginSchema = z.object({
  email: z.string().email(), // 이메일
  password: z.string(), // 비밀번호
});
export type LoginParams = z.infer<typeof loginSchema>;

// 로그인 응답 API 타입
export const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string(),
    profileImageUrl: z.string().nullable(),
    createdAt: z.string(), // ISO date string
    updatedAt: z.string(),
  }),
  refreshToken: z.string(),
  accessToken: z.string(),
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

// 토큰 재발급 응답 API 타입
export const refreshTokenResponseSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
