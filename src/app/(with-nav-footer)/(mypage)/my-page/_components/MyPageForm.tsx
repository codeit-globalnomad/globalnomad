'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { useMyData, useUserdataUpdate } from '@/lib/hooks/useUsers';
import { zodResolver } from '@hookform/resolvers/zod';
import { userDataFormSchema, UserDataFormValues, UserDataUpdateParams } from '@/lib/types/users';

export default function MyPageForm() {
  const { data: user } = useMyData();
  const { mutate: updateUserData, isPending } = useUserdataUpdate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
    trigger,
  } = useForm<UserDataFormValues>({
    mode: 'onChange',
    resolver: zodResolver(userDataFormSchema),
    defaultValues: {
      nickname: '',
      email: '',
      newPassword: '',
      confirmNewPassword: '',
      profileImageUrl: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        email: user.email,
        profileImageUrl: user.profileImageUrl ?? '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, [user, reset]);

  const nickname = watch('nickname');
  const newPassword = watch('newPassword');
  const confirmNewPassword = watch('confirmNewPassword');

  const DEFAULT_PROFILE_IMAGE_URL =
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/12-1_1757_1742022258900.png';

  const onSubmit = (data: UserDataFormValues) => {
    if (!user) return;

    const safeProfileImageUrl =
      !!user.profileImageUrl && /^https?:\/\//.test(user.profileImageUrl)
        ? user.profileImageUrl
        : DEFAULT_PROFILE_IMAGE_URL;

    const payload: UserDataUpdateParams = {
      email: data.email,
      nickname: data.nickname,
      profileImageUrl: safeProfileImageUrl,
      ...(data.newPassword ? { newPassword: data.newPassword } : {}),
    };

    console.log('📡 payload', payload);
    updateUserData(payload);
  };

  const isFormValidToSubmit = useMemo(() => {
    if (!user) return false;
    const nicknameChanged = nickname.trim() !== user.nickname.trim();
    const isPasswordFilled = newPassword.length > 0 || confirmNewPassword.length > 0;
    const noErrors = !errors.nickname && !errors.newPassword && !errors.confirmNewPassword;

    return (nicknameChanged || isPasswordFilled) && noErrors;
  }, [user, nickname, newPassword, confirmNewPassword, errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-around mb-4 flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>내 정보 페이지</h2>
        <Button type='submit' disabled={isPending || !isFormValidToSubmit || !isValid} className='px-[20px] py-[11px]'>
          {isPending ? '수정 중...' : '수정하기'}
        </Button>
      </div>

      <div className='space-y-4'>
        <Input label='닉네임' placeholder='닉네임 입력' {...register('nickname')} />
        <Input
          label='이메일'
          type='email'
          disabled
          placeholder='이메일 입력'
          {...register('email')}
          className='bg-gray-200'
        />
        <Input
          label='새 비밀번호'
          error={errors.newPassword?.message as string}
          type='password'
          placeholder='8자 이상 입력해주세요'
          {...register('newPassword', {
            minLength: { value: 8, message: '8자 이상 입력해주세요' },
            onBlur: () => trigger('newPassword'),
          })}
        />
        <Input
          label='새 비밀번호 확인'
          error={errors.confirmNewPassword?.message as string}
          type='password'
          placeholder='비밀번호를 한번 더 입력해주세요'
          {...register('confirmNewPassword', {
            validate: (value) => value === newPassword || '비밀번호가 일치하지 않습니다.',
            onBlur: () => trigger('confirmNewPassword'),
          })}
        />
      </div>
    </form>
  );
}
