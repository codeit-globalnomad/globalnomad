import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { getExpirationDate } from './getExpirationDate';
<<<<<<< HEAD
import { getErrorMessage } from './errorMessage';
=======
>>>>>>> a534584 (fix: 로그인 회원가입할 때 api 수정)

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
<<<<<<< HEAD
      const baseURL = 'https://sp-globalnomad-api.vercel.app/12-1';

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
=======
      const baseURL =
        process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN
          : process.env.NEXT_PUBLIC_LOCAL_DOMAIN;
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get('refreshToken')?.value;
      const res = await axios.post(
        `${baseURL}/api/auth/refresh-token`,
        {},
        {
          headers: {
            Cookie: `refreshToken=${refreshToken};`,
          },
        },
      );

      const accessTokenCookie = res.headers['set-cookie']?.find((cookie) => {
        return cookie.startsWith('accessToken');
      });

      if (!accessTokenCookie) return Promise.reject(error);
      const accessTokenMatch = accessTokenCookie.match(/accessToken=([^;]+)/);
      const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
>>>>>>> a534584 (fix: 로그인 회원가입할 때 api 수정)

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
