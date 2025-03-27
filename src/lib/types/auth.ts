import { z } from 'zod';

// 로그인 요청 API 타입
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '유효한 이메일 주소를 입력하세요.' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: '올바른 이메일 형식이 아닙니다.',
    }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .min(8, { message: '8자 이상 입력해주세요.' })
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]*$/, { message: '비밀번호는 문자열로 작성해주세요.' }),
});

export type LoginParams = z.infer<typeof loginSchema>;

// 로그인 응답 API 타입
export const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string(),
    profileImageUrl: z.string().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  refreshToken: z.string().optional(),
  accessToken: z.string().optional(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

// 토큰 재발급 응답 API 타입
export const refreshTokenResponseSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
