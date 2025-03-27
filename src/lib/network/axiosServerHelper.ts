import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { getExpirationDate } from './getExpirationDate';

import { getErrorMessage } from './errorMessage';

const axiosServerHelper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosServerHelper.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  if (accessToken?.value) config.headers.Authorization = `Bearer ${accessToken.value}`;

  return config;
});

axiosServerHelper.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error)) return Promise.reject(error);
    const { response, config } = error;

    if (response?.status === 401) {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;

      const cookieStore = await cookies();
      const refreshToken = cookieStore.get('refreshToken')?.value;
      console.log(refreshToken);
      let res;
      try {
        res = await fetch(`${baseURL}/auth/tokens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        }).then((value) => value.json());
      } catch (e) {
        console.log(getErrorMessage(e));
      }

      const accessToken = res.accessToken;

      if (!config) return Promise.reject(error);
      if (!accessToken) return Promise.reject(error);

      const accessTokenExp = getExpirationDate(accessToken);
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: accessTokenExp || undefined,
      });
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axiosServerHelper(config);
    }
    return Promise.reject(error);
  },
);

export default axiosServerHelper;
