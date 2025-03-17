import { useMutation } from '@tanstack/react-query';
import { login, refreshToken } from '../apis/auth';
import { LoginParams, LoginResponse, RefreshTokenResponse } from '../types/auth';

// 로그인 훅
export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginParams>({
    mutationFn: login,
  });
};

// 토큰 재발급 훅
export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, unknown, void>({
    mutationFn: refreshToken,
  });
};
