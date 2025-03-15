import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  CreateProfileImageParams,
  profileImageUrlSchema,
  SignupParams,
  UserdataUpdateParams,
  userdataUpdateSchema,
} from '../types/users';
import { getUserData, patchUserdataUpdate, postFileImageUrl, signup } from '../apis/users';

// 회원가입 훅
export const useSignup = () => {
  return useMutation({
    mutationFn: (params: SignupParams) => {
      return signup(params);
    },
  });
};

// 내 정보 조회 훅
export const useMyData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserData(),
  });
};

// 프로필 이미지 url 생성 훅
export const useProfileImage = () => {
  return useMutation({
    mutationFn: async (params: CreateProfileImageParams) => {
      const { image } = params;
      profileImageUrlSchema.parse(image);
      const response = await postFileImageUrl(params);
      return response;
    },
    onSuccess: (data) => {
      console.log('업로드된 이미지 Url:', data.profileImageUrl);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });
};

// 내 정보 수정 훅
export const useUserdataUpdate = () => {
  return useMutation({
    mutationFn: async (params: UserdataUpdateParams) => {
      if (!params.newPassword) {
        delete params.newPassword;
        delete params.confirmPassword;
      }

      userdataUpdateSchema.parse(params);

      const response = await patchUserdataUpdate(params);
      return response;
    },
  });
};
