'use server';

import { getErrorMessage } from '@/lib/network/errorMessage';
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
  } catch (error) {
    return { status: false, error: getErrorMessage(error) };
  }
};

export default logout;
