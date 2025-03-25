import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import {
  LoginParams,
  LoginResponse,
  loginResponseSchema,
  RefreshTokenResponse,
  refreshTokenResponseSchema,
} from '../types/auth';

/*
 * 로그인 요청 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Auth/Login
 */
export const login = async (data: LoginParams) => {
  const response = await axiosClientHelper.post<LoginResponse>('/auth/login', data);
  return safeResponse(response.data, loginResponseSchema);
};

/*
 * 토큰 재발급 요청 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Auth/Refresh
 */
export const refreshToken = async () => {
  const response = await axiosClientHelper.post<RefreshTokenResponse>(
    '/auth/tokens',
    {},
    {
      withCredentials: true,
    },
  );
  return safeResponse(response.data, refreshTokenResponseSchema);
};
