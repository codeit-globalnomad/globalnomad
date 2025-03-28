import { NextRequest, NextResponse } from 'next/server';
import { isEmpty, omit } from 'es-toolkit/compat';
import axiosServerHelper from '@/lib/network/axiosServerHelper';
import errorResponse from '@/lib/network/errorResponse';
import { getExpirationDate } from '@/lib/network/getExpirationDate';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  const endPoint = url.pathname.replace(/^\/api/, '');
  console.log(endPoint);
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
    console.log(error);
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
    const response = NextResponse.json(omit(apiResponse.data, ['accessToken', 'refreshToken']), {
      status: apiResponse.status,
    });
    const accessToken = apiResponse.data.accessToken;
    const refreshToken = apiResponse.data.refreshToken;
    if (endPoint === '/auth/login') {
      response.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: getExpirationDate(accessToken) || undefined,
      });
      response.cookies.set('refreshToken', apiResponse.data.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: getExpirationDate(refreshToken) || undefined,
      });
    }
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
