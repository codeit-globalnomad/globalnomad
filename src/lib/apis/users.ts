import axiosClientHelper from '../network/axiosClientHelper';
import { safeResponse } from '../network/safeResponse';
import {
  CreateProfileImageParams,
  ProfileImageUrlResponse,
  profileImageUrlResponseSchema,
  SignupParams,
  SignupResponse,
  User,
  UserDataUpdateParams,
  userSchema,
} from '../types/users';

/*
 * 회원가입 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Users/Create
 */
export const signup = async (params: SignupParams) => {
  const response = await axiosClientHelper.post<SignupResponse>('/users', params);
  return safeResponse(response.data, userSchema);
};

/*
 * 내 정보 조회 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Users/GetMyInfo
 */
export const getUserData = async () => {
  const response = await axiosClientHelper.get<User>('/users/me');
  return safeResponse(response.data, userSchema);
};

/*
 * 내 정보 수정 API
 * https://sp-globalnomad-api.vercel.app/docs/#/Users/UpdateMyInfo
 */
export const patchUserdataUpdate = async (params: UserDataUpdateParams) => {
  const response = await axiosClientHelper.patch<User>('/users/me', params);
  return safeResponse(response.data, userSchema);
};

/*
 * 프로필 이미지 URL 생성(업로드) API
 * https://sp-globalnomad-api.vercel.app/docs/#/Users/UploadProfileImage
 */
export const postFileImageUrl = async (params: CreateProfileImageParams) => {
  const response = await axiosClientHelper.post<ProfileImageUrlResponse>('/users/me/image', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return safeResponse(response.data, profileImageUrlResponseSchema);
};
