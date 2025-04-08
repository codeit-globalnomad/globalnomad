'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMyData, useUserdataUpdate } from '@/lib/hooks/useUsers';
import { zodResolver } from '@hookform/resolvers/zod';
import { userDataFormSchema, UserDataFormValues, UserDataUpdateParams } from '@/lib/types/users';
import ClosedEye from '@/assets/icons/eye-hidden.svg';
import OpendEye from '@/assets/icons/eye-visible.svg';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import RetryError from '@/components/RetryError';

export default function MyPageForm() {
  const { data: user, isLoading, isError, refetch } = useMyData();
  const { mutate: updateUserData, isPending } = useUserdataUpdate();
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(true);

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
    shouldUnregister: true,
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
    updateUserData(payload);
  };
  const isPasswordPairValid =
    (newPassword || '').length >= 8 && (confirmNewPassword || '').length >= 8 && newPassword === confirmNewPassword;

  const nicknameChanged = (nickname ?? '').trim() !== (user?.nickname.trim() ?? '');

  const isFormValidToSubmit =
    !!user &&
    ((nicknameChanged && !newPassword && !confirmNewPassword) ||
      isPasswordPairValid ||
      (nicknameChanged && isPasswordPairValid)) &&
    !errors.nickname &&
    !errors.newPassword &&
    !errors.confirmNewPassword;

  useEffect(() => {
    if (newPassword) {
      trigger('confirmNewPassword');
    }
  }, [newPassword, trigger]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} className='py-10' />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-around mb-4 flex items-center justify-between'>
        <h2 className='text-black-100 text-2xl font-bold'>내 정보</h2>
        <Button
          type='submit'
          disabled={isPending || !isFormValidToSubmit || !isValid}
          className='px-[16px] py-[10px] text-lg font-bold'
        >
          {isPending ? '수정 중...' : '수정하기'}
        </Button>
      </div>

      <div className='space-y-4'>
        <input type='hidden' {...register('profileImageUrl')} />

        <Input label='닉네임' placeholder='닉네임 입력' {...register('nickname')} className='bg-white' />
        <Input
          label='이메일'
          type='email'
          disabled
          placeholder='이메일 입력'
          {...register('email')}
          className='bg-white'
        />

        <div className='relative'>
          <Input
            label='새 비밀번호'
            className='bg-white'
            error={errors.newPassword?.message as string}
            type={isShowPassword ? 'password' : 'text'}
            placeholder='8자 이상 입력해주세요'
            {...register('newPassword', {
              onBlur: () => trigger('newPassword'),
            })}
          />
          <Image
            src={isShowPassword ? ClosedEye : OpendEye}
            alt='비밀번호 토글 이미지'
            width={24}
            height={24}
            className='absolute top-[64px] right-3 -translate-y-1/2 cursor-pointer'
            onClick={() => setIsShowPassword((prev) => !prev)}
          />
        </div>

        <div className='relative'>
          <Input
            label='새 비밀번호 확인'
            className='bg-white'
            error={errors.confirmNewPassword?.message as string}
            type={isShowPasswordConfirm ? 'password' : 'text'}
            placeholder='비밀번호를 한번 더 입력해주세요'
            {...register('confirmNewPassword', {
              onBlur: () => trigger('confirmNewPassword'),
            })}
          />
          <Image
            src={isShowPasswordConfirm ? ClosedEye : OpendEye}
            alt='비밀번호 토글 이미지'
            width={24}
            height={24}
            className='absolute top-[64px] right-3 -translate-y-1/2 cursor-pointer'
            onClick={() => setIsShowPasswordConfirm((prev) => !prev)}
          />
        </div>
      </div>
    </form>
  );
}
