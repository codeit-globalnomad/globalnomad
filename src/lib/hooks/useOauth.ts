import { useMutation } from '@tanstack/react-query';
import { OauthAppParams, OauthAppResponse, OauthParams, OauthResponse } from '../types/oauth';
import { postOauthApps, postOauthLogin, postOauthSignup } from '../apis/oauth';

// 간편 로그인 App 등록/수정 훅
export const useOauthApps = (params: OauthAppParams) => {
  return useMutation<OauthAppResponse, Error, OauthAppParams>({
    mutationFn: () => postOauthApps(params),
  });
};

// 간편 회원가입 훅
export const useOauthSignup = (provider: 'google' | 'kakao') => {
  return useMutation<OauthResponse, Error, OauthParams>({
    mutationFn: async (data: OauthParams) => {
      if (data.nickname) {
        return postOauthSignup(provider, data);
      }
      throw new Error('Nickname is required');
    },
  });
};

// 간편 로그인 훅
export const useOauthLogin = (provider: 'google' | 'kakao') => {
  return useMutation<OauthResponse, Error, OauthParams>({
    mutationFn: async (data: OauthParams) => {
      return postOauthLogin(provider, data); // 그냥 보내기
    },
  });
};
