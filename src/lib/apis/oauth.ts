import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import {
  OauthAppParams,
  OauthAppResponse,
  oauthAppResponseSchema,
  OauthParams,
  OauthResponse,
  oauthResponseSchema,
  // Provider,
} from '../types/oauth';

/**
 * 간편 로그인 App 등록/수정 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Oauth/UpsertOauthApp
 */
export const postOauthApps = async (params: OauthAppParams) => {
  const response = await axiosClientHelper.post<OauthAppResponse>('/oauth/apps', params);
  return safeResponse(response.data, oauthAppResponseSchema);
};

/*
 * 간편 회원가입 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Oauth/SignUpOauth
 */
export const postOauthSignup = async (provider: 'google' | 'kakao', data: OauthParams) => {
  const response = await axiosClientHelper.post<OauthResponse>(`/oauth/sign-up/${provider}`, data);
  return safeResponse(response.data, oauthResponseSchema);
};

/*
 * 간편 로그인
 * https://sp-globalnomad-api.vercel.app/docs/#/Oauth/SignInOauth
 */
export const postOauthLogin = async (provider: 'google' | 'kakao', data: OauthParams) => {
  const response = await axiosClientHelper.post<OauthResponse>(`/oauth/sign-in/${provider}`, data);
  return safeResponse(response.data, oauthResponseSchema);
};
