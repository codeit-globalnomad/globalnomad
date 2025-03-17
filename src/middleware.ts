import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AFTER_LOGIN_DOMAIN = [
  '/activities',
  '/my-page',
  '/my-activities',
  '/my-reservations',
] satisfies readonly string[];

<<<<<<< HEAD
const BEFORE_LOGIN_DOMAIN = ['/login', '/signup'] satisfies readonly string[];
=======
const BEFORE_LOGIN_DOMAIN = ['/', '/login', '/signup'] satisfies readonly string[];
>>>>>>> afbe47e (feat: 간편로그인 및 회원가입 로직 완성)

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const pathname = request.nextUrl.pathname;
  const isLoggedIn = accessToken || refreshToken;

<<<<<<< HEAD
  const isAfterLoginRoute = pathname !== '/' && AFTER_LOGIN_DOMAIN.some((route) => pathname.startsWith(route));
  const isBeforeLoginRoute = BEFORE_LOGIN_DOMAIN.includes(pathname);

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

=======
  const isAfterLoginRoute = AFTER_LOGIN_DOMAIN.some((route) => pathname.startsWith(route));
  const isBeforeLoginRoute = BEFORE_LOGIN_DOMAIN.includes(pathname);
  const isLoggedIn = accessToken || refreshToken;

  if (isBeforeLoginRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/activities', request.nextUrl));
    }
    return NextResponse.next();
  }
>>>>>>> afbe47e (feat: 간편로그인 및 회원가입 로직 완성)
  if (isAfterLoginRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};
