import { z } from 'zod';

interface FailResponse {
  message: string;
}

// 회원가입 및 내 정보 조회/수정 API Response 타입
export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().trim(),
  profileImageUrl: z
    .string()
    .url()
    .nullable()
    .transform(
      (value) =>
        value ??
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/12-1_1757_1742022258900.png',
    ),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type User = z.infer<typeof userSchema>;

// 회원가입 API 타입
export const signupSchema = z
  .object({
    email: z
      .string()
      .email({ message: '유효한 이메일 주소를 입력하세요.' })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: '올바른 이메일 형식이 아닙니다.',
      }),
    password: z.string().min(8, { message: '8자 이상 입력해주세요.' }),
    confirmPassword: z.string(),
    nickname: z.string().trim().max(10, { message: '10자 이하로 입력해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupParams = z.infer<typeof signupSchema>;

export type SignupSuccessResponse = z.infer<typeof userSchema>;
export type SignupFailResponse = FailResponse;
export type SignupResponse = Promise<SignupSuccessResponse | SignupSuccessResponse>;

// 프로필 이미지 url 생성 시 File 타입
export const profileImageUrlSchema = z
  .instanceof(File)
  .refine((file) => ['image/jpg', 'image/jpeg', 'image/png', 'image/ico'].includes(file.type), {
    message: '.jpg .jpeg .png .ico 형식의 파일이 지원됩니다.',
  })
  .refine((file) => file.size < 5 * 1024 * 1024, { message: '5MB 이하의 파일만 등록이 가능합니다.' });

export type ProfileImageUrl = z.infer<typeof profileImageUrlSchema>;

export const createProfileImageFormSchema = z.object({
  image: profileImageUrlSchema,
});

// 프로필 이미지 url 생성 API 타입
export interface CreateProfileImageParams {
  image: File;
}

export const profileImageUrlResponseSchema = z.object({
  profileImageUrl: z.string().url(),
});

export type ProfileImageUrlResponse = z.infer<typeof profileImageUrlResponseSchema>;

// 내 정보 수정 API 타입
export const userdataUpdateSchema = z
  .object({
    nickname: z.string().trim().max(10, { message: '닉네임을 10자 이하로 입력해주세요.' }),
    profileImageUrl: z.union([z.string().url(), profileImageUrlSchema]),
    newPassword: z.string().min(8, { message: '비밀번호를 8자 이상 입력해주세요.' }).optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type UserdataUpdateParams = z.infer<typeof userdataUpdateSchema>;
