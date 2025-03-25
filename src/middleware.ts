import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AFTER_LOGIN_DOMAIN = ['/my-page', '/my-activities', '/my-reservations'] satisfies readonly string[];
const BEFORE_LOGIN_DOMAIN = ['/', '/login', '/signup', '/activities'] satisfies readonly string[];

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  const pathname = request.nextUrl.pathname.replace(/\/$/, '');

  const isAfterLoginRoute = AFTER_LOGIN_DOMAIN.includes(pathname);
  const isBeforeLoginRoute = BEFORE_LOGIN_DOMAIN.includes(pathname);
  const isLoggedIn = accessToken?.value || refreshToken?.value;

  if (pathname === '/') {
    return NextResponse.next();
  }

  if (isBeforeLoginRoute) {
    if (isLoggedIn && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL('/activities', request.nextUrl), 302);
    }
    return NextResponse.next();
  }

  if (isAfterLoginRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.nextUrl), 302);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};
