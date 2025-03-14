/**
 *
 * proxy처럼 사용하기 위해 작성한 route입니다.
 * client에서 배포사이트_도메인/api/*으로 지정한 request는 해당 파일을 거칩니다.
 *
 * api 요청 흐름은 다음과 같습니다.
 * 1. client에서 axiosClient.HTTP메소드(); 로 next 서버에 api 요청을 보냅니다.
 * 2. next 서버에서 각 HTTP 메소드에 맞는 메소드를 실행합니다.
 * 3. server에서 axiosServer.HTTP메소드();로 외부 백엔드 서버에 api 요청을 보냅니다.
 * 4. axios 인터셉터에서 cookie를 읽고, Authorization Bearer 토큰을 설정해서 요청을 보냅니다.
 * 5. 외부 백엔드 서버로부터 받은 응답을 client에게 응답합니다.
 *
 */

import { NextRequest, NextResponse } from 'next/server';
import { isEmpty, omit } from 'es-toolkit/compat';
import axiosServerHelper from '@/lib/network/axiosServerHelper';
import errorResponse from '@/lib/network/errorResponse';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  const searchParams = Object.fromEntries(url.searchParams.entries());
  try {
    const apiResponse = await axiosServerHelper.get(
      endPoint,
      !isEmpty(searchParams)
        ? {
            params: searchParams,
          }
        : {},
    );
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  const contentType = request.headers.get('Content-Type')?.split(';')[0];

  try {
    const apiResponse = await axiosServerHelper.post(
      endPoint,
      contentType === 'application/json' ? await request.json() : await request.formData(),
      {
        headers: {
          'Content-Type': request.headers.get('Content-Type'),
        },
      },
    );
    const response = NextResponse.json(omit(apiResponse.data, ['accessToken']), { status: apiResponse.status });
    if (endPoint === '/auth/login')
      response.cookies.set('accessToken', apiResponse.data.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};

export const PUT = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  try {
    const apiResponse = await axiosServerHelper.put(endPoint, await request.json());
    if (isEmpty(apiResponse.data))
      return new NextResponse(null, {
        status: apiResponse.status,
      });
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  try {
    const apiResponse = await axiosServerHelper.delete(endPoint);
    if (isEmpty(apiResponse.data))
      return new NextResponse(null, {
        status: apiResponse.status,
      });
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};

export const PATCH = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  
  try {
    const apiResponse = await axiosServerHelper.patch(endPoint, await request.json());
    if (isEmpty(apiResponse.data))
      return new NextResponse(null, {
        status: apiResponse.status,
      });
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};
