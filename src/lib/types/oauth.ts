import { z } from 'zod';

// 간편 로그인 App 등록, 수정 API 타입 
export const oauthAppParamsSchema = z.object({
  appKey: z.string(),
  provider: z.enum(['kakao', 'google']),
});

export type OauthAppParams = z.infer<typeof oauthAppParamsSchema>;

export const oauthAppResponseSchema = z.object({
  id: z.number(),
  provider: z.enum(['kakao', 'google']),
  teamId: z.string(),
  appKey: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type OauthAppResponse = z.infer<typeof oauthAppResponseSchema>;

// 간편 회원가입 및 로그인 API 타입
export const oauthParamsSchema = z.object({
  nickname: z.string().optional(),
  redirectUri: z.string().url(),
  token: z.string(),
});

export type OauthParams = z.infer<typeof oauthParamsSchema>;

export const oauthLoginParamsSchema = z.object({
  nickname: z.string().optional(),
  redirectUri: z.string().url(),
  token: z.string(),
});

export type OauthLoginParams = z.infer<typeof oauthLoginParamsSchema>;

export const oauthUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const oauthResponseSchema = z.object({
  user: oauthUserSchema,
  refreshToken: z.string(),
  accessToken: z.string(),
});

export type OauthResponse = z.infer<typeof oauthResponseSchema>;
