import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { CreateProfileImageParams, profileImageUrlSchema, SignupParams, UserDataUpdateParams } from '../types/users';
import { getUserData, patchUserdataUpdate, postFileImageUrl, signup } from '../apis/users';

// 회원가입 훅
export const useSignup = () => {
  return useMutation({
    mutationFn: (params: SignupParams) => signup(params),
  });
};

// 내 정보 조회 훅
export const useMyData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserData(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// 내 정보 수정 훅
export const useUserdataUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: Partial<UserDataUpdateParams>) => {
      const response = await patchUserdataUpdate(params);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error(' 수정 실패:', error);
    },
  });
};
// 프로필 이미지 URL 생성 훅
export const useProfileImage = () => {
  return useMutation({
    mutationFn: async (params: CreateProfileImageParams) => {
      const { image } = params;
      profileImageUrlSchema.parse(image);
      const response = await postFileImageUrl(params);
      return response;
    },
  });
};
