// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { request } from 'http';

// const AFTER_LOGIN_DOMAIN = [
//   '/activities',
//   '/my-page',
//   '/my-activities',
//   '/my-reservations',
// ] satisfies readonly string[];
// const BEFORE_LOGIN_DOMAIN = ['/activities', '/login', 'signup'] satisfies readonly string[];

// export const middleware = async (request: NextRequest) => {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken');

//   const pathname = request.nextUrl.pathname;

//   if (!accessToken?.value) {
//     if (AFTER_LOGIN_DOMAIN.some((path) => pathname.startsWith(path))) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   } else {
//     if (BEFORE_LOGIN_DOMAIN.includes(pathname)) {
//       return NextResponse.redirect(new URL('/activities', request.url));
//     }
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: ['/:path*'],
// };

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BEFORE_LOGIN_DOMAIN = ['/activities', '/login', 'signup'] satisfies readonly string[];

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  const pathname = request.nextUrl.pathname;

  if (accessToken?.value) {
    if (BEFORE_LOGIN_DOMAIN.includes(pathname)) {
      return NextResponse.redirect(new URL('/activities', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/:path*'],
};
