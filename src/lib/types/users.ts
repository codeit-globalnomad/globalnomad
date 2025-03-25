import { z } from 'zod';

interface FailResponse {
  message: string;
}

// 회원가입 및 내 정보 조회, 수정 응답 API 타입
export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().trim(),
  profileImageUrl: z
    .string()
    .url()
    .default(
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/12-1_1757_1742022258900.png',
    )
    .nullable()
    .optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

// 회원가입 API 타입
export const signupSchema = z
  .object({
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
      .min(8, { message: '비밀번호는 8자 이상 입력해주세요.' }),
    confirmPassword: z.string().min(1, { message: '비밀번호 확인을 입력해주세요.' }),
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해주세요.' })
      .max(10, { message: '닉네임은 10자 이하로 입력해주세요.' })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupParams = z.infer<typeof signupSchema>;

export type SignupSuccessResponse = z.infer<typeof userSchema>;

export type SignupFailResponse = FailResponse;

export type SignupResponse = Promise<SignupSuccessResponse | SignupFailResponse>;

// 프로필 이미지 URL 생성(업로드) API 타입
export const profileImageUrlSchema = z
  .instanceof(File)
  .refine(
    (file) => ['image/jpg', 'image/jpeg', 'image/png', 'image/ico', 'image/gif', 'image/webp'].includes(file.type),
    {
      message: '지원되지 않는 이미지 파일입니다.',
    },
  )
  .refine((file) => file.size < 5 * 1024 * 1024, { message: '5MB 이하의 파일만 등록이 가능합니다.' });

export type ProfileImageUrl = z.infer<typeof profileImageUrlSchema>;

export const createProfileImageFormSchema = z.object({
  image: profileImageUrlSchema,
});

export interface CreateProfileImageParams {
  image: File;
}

export const profileImageUrlResponseSchema = z.object({
  profileImageUrl: z.string().url(),
});

export type ProfileImageUrlResponse = z.infer<typeof profileImageUrlResponseSchema>;

// 내 정보 수정 API 타입
export const userDataUpdateParams = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .max(10, { message: '닉네임을 10자 이하로 입력해주세요.' }),
  profileImageUrl: z.union([z.string().url(), profileImageUrlSchema]),
  newPassword: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .min(8, { message: '비밀번호를 8자 이상 입력해주세요.' }),
});

export type UserDataUpdateParams = z.infer<typeof userDataUpdateParams>;
