'use client';

import Image from 'next/image';
import logo from '@/assets/logo/logo-xl.svg';
import SocialButtons from './SocialButtons';
import Link from 'next/link';
import Button from '@/components/Button';
import { useSignup } from '@/lib/hooks/useUsers';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SignupParams, signupSchema } from '@/lib/types/users';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import ClosedEye from '@/assets/icons/eye-hidden.svg';
import OpendEye from '@/assets/icons/eye-visible.svg';
import Input from '@/components/Input';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal';
import { useLogin } from '@/lib/hooks/useAuth';
import { AxiosError } from 'axios';

export default function SignupForm() {
  const { mutateAsync: signup } = useSignup();
  const { mutateAsync: signin } = useLogin();
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    trigger,
  } = useForm<SignupParams>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupParams) => {
    try {
      await signup(data);
      const { email, password } = data;
      await signin({ email, password });
      toast.success('회원가입 성공 ');
      reset();
      router.push('/login');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err?.response?.data?.message;
      try {
        if (message === '중복된 이메일입니다.') {
          setErrorMessage(message);
          setIsModalOpen(true);
          reset();
        }
      } catch (err) {
        console.error('  error response:', err);
      }
    }
  };
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-xl px-4'>
        <div className='mb-[56px] flex justify-center'>
          <Link href='/'>
            <div className='relative h-[138px] w-[245px] md:h-[192px] md:w-[340px]'>
              <Image src={logo} alt='회원가입창 로고' layout='fill' objectFit='contain' />
            </div>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-[28px]'>
            <Input
              label='이메일'
              error={errors.email?.message}
              type='email'
              placeholder='이메일'
              required
              {...register('email', {
                onBlur: () => trigger('email'),
              })}
              disabled={isSubmitting}
            />
          </div>

          <div className='mb-[28px]'>
            <Input
              label='닉네임'
              error={errors.nickname?.message}
              type='text'
              placeholder='닉네임을 입력해 주세요'
              required
              {...register('nickname', {
                onBlur: () => trigger('nickname'),
              })}
              disabled={isSubmitting}
            />
          </div>

          <div className='relative mb-[28px]'>
            <Input
              label='비밀번호'
              error={errors.password?.message}
              type={isShowPassword ? 'password' : 'text'}
              placeholder='비밀번호'
              required
              {...register('password', {
                onBlur: () => trigger('password'),
              })}
              disabled={isSubmitting}
            />
            <Image
              src={isShowPassword ? ClosedEye : OpendEye}
              alt='비밀번호 토글 이미지'
              width={24}
              height={24}
              className='absolute top-[68px] right-3 -translate-y-1/2 cursor-pointer'
              onClick={() => setIsShowPassword((prev) => !prev)}
            />
          </div>
          <div className='relative mb-[28px]'>
            <Input
              label='비밀번호 확인'
              error={errors.confirmPassword?.message}
              type={isShowPasswordConfirm ? 'password' : 'text'}
              placeholder='비밀번호 확인'
              required
              {...register('confirmPassword')}
              disabled={isSubmitting}
            />
            <Image
              src={isShowPasswordConfirm ? ClosedEye : OpendEye}
              alt='비밀번호 토글 이미지'
              width={24}
              height={24}
              className='absolute top-[68px] right-3 -translate-y-1/2 cursor-pointer'
              onClick={() => setIsShowPasswordConfirm((prev) => !prev)}
            />
          </div>

          <Button type='submit' className='w-full py-[11px]' disabled={!isValid || isSubmitting}>
            <div>회원가입 하기</div>
          </Button>
        </form>

        <div className='mt-8 mb-12 text-center'>
          <p className='text-gray-800'>
            회원이신가요?
            <Link href='/login' className='font-semibold text-green-100 underline'>
              로그인하기
            </Link>
          </p>
        </div>

        <SocialButtons />
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          className={`flex h-[180px] w-[90%] max-w-[400px] flex-col items-center rounded-2xl bg-white p-6 md:h-[230px]`}
        >
          <div className='text-bold mb-6 pt-8 text-center text-xl md:mb-11 md:pt-12'>{errorMessage}</div>
          <Button
            className='px-[22px] py-[8px]'
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            확인
          </Button>
        </Modal>
      )}
    </div>
  );
}
