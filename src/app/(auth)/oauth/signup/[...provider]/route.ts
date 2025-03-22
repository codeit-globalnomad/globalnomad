import { getErrorMessage } from '@/lib/network/errorMessage';
import { extractProviderAndCode } from '@/lib/network/extractProviderAndCode';
import { getExpirationDate } from '@/lib/network/getExpirationDate';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const GET = async (req: NextRequest) => {
  const { provider, code } = await extractProviderAndCode(req.url);

  try {
    console.log('OAuth 로그인 시도:', provider, code);

    const apiResponse = await axios.post<{ user: User; accessToken: string; refreshToken: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth/sign-in/${provider}`,
      {
        redirectUri:
          provider === 'google'
            ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
            : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        token: code,
      },
    );

    const accessTokenExp = getExpirationDate(apiResponse.data.accessToken);
    const refreshTokenExp = getExpirationDate(apiResponse.data.refreshToken);

    const response = NextResponse.redirect(new URL('/', req.url));

    response.cookies.set('accessToken', apiResponse.data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      expires: accessTokenExp || undefined,
    });

    response.cookies.set('refreshToken', apiResponse.data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      expires: refreshTokenExp || undefined,
    });

    console.log('로그인 성공:', apiResponse.data.user);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('로그인 실패:', error);

      if (error.response?.status === 403) {
        console.log('403 상태 → 회원가입 시도');

        try {
          const signupResponse = await axios.post<{ user: User; accessToken: string; refreshToken: string }>(
            `${process.env.NEXT_PUBLIC_API_URL}/oauth/sign-up/${provider}`,
            {
              redirectUri:
                provider === 'google'
                  ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
                  : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
              token: code,
              nickname: '코드잇',
            },
          );

          const accessTokenExp = getExpirationDate(signupResponse.data.accessToken);
          const refreshTokenExp = getExpirationDate(signupResponse.data.refreshToken);

          const response = NextResponse.redirect(new URL('/', req.url));

          response.cookies.set('accessToken', signupResponse.data.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            expires: accessTokenExp || undefined,
          });

          response.cookies.set('refreshToken', signupResponse.data.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            expires: refreshTokenExp || undefined,
          });

          console.log('회원가입 성공:', signupResponse.data.user);
          return response;
        } catch (signupError: unknown) {
          if (signupError instanceof AxiosError) {
            console.error('회원가입 실패:', signupError);

            const errorMessage = getErrorMessage(signupError);
            return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorMessage)}`, req.url));
          }
        }
      }

      const errorMessage = getErrorMessage(error);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorMessage)}`, req.url));
    } else {
      console.error('예상치 못한 에러:', error);
      return NextResponse.redirect(new URL(`/login?error=Unexpected error`, req.url));
    }
  }
};
