import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value || null;

  if (accessToken) {
    return NextResponse.json({ isLoggedIn: true });
  } else {
    return NextResponse.json({ isLoggedIn: false });
  }
}
