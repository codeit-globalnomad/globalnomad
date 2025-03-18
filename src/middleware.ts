import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AFTER_LOGIN_DOMAIN = [
  '/activities',
  '/my-page',
  '/my-activities',
  '/my-reservations',
] satisfies readonly string[];

const BEFORE_LOGIN_DOMAIN = ['/', '/login', '/signup'] satisfies readonly string[];

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const pathname = request.nextUrl.pathname;

  const isAfterLoginRoute = AFTER_LOGIN_DOMAIN.some((route) => pathname.startsWith(route));
  const isBeforeLoginRoute = BEFORE_LOGIN_DOMAIN.includes(pathname);
  const isLoggedIn = accessToken || refreshToken;

  if (pathname === '/') {
    if (isLoggedIn) {
      return NextResponse.next();
    }
    return NextResponse.next();
  }

  if (isBeforeLoginRoute) {
    if (isLoggedIn) {
      if (pathname === '/login' || pathname === '/signup') {
        return NextResponse.redirect(new URL('/activities', request.nextUrl));
      }
    }
    return NextResponse.next();
  }
  if (isAfterLoginRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};
