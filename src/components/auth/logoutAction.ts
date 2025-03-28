'use server';

import { cookies } from 'next/headers';

const logout = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return {
      status: true,
      error: '',
    };
  } catch {
    return { status: false, error: '오류 발생' };
  }
};

export default logout;
