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

function generateRandomNickname(): string {
  const adjectives = ['빠른', '멋진', '느린', '흰색'];
  const animals = ['판다', '곰', '여우', '뱀', '토끼', '삵', '판다'];

  let nickname = '';
  let tries = 0;

  while (tries < 10) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];

    const candidate = `${adj}${animal}`;
    if (candidate.length <= 4) {
      nickname = candidate;
      break;
    }

    tries++;
  }

  return nickname || '귀여운펭귄7';
}

export const GET = async (req: NextRequest) => {
  const { provider, code } = await extractProviderAndCode(req.url);
  const url = new URL(req.url);
  const state = url.searchParams.get('state') || 'signin';

  try {
    const endpoint = state === 'signup' ? 'sign-up' : 'sign-in';

    const apiResponse = await axios.post<{ user: User; accessToken: string; refreshToken: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth/${endpoint}/${provider}`,
      {
        redirectUri:
          provider === 'google'
            ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
            : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        token: code,
        ...(state === 'signup' ? { nickname: generateRandomNickname() } : {}),
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

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('로그인 실패:', error);
      const errorMessage = getErrorMessage(error);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorMessage)}`, req.url));
    } else {
      console.error('예상치 못한 에러:', error);
      return NextResponse.redirect(new URL(`/login?error=Unexpected error`, req.url));
    }
  }
};
