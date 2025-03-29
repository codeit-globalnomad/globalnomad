'use client';

import Image from 'next/image';
import ClosedEye from '@/assets/icons/eye-hidden.svg';
import OpendEye from '@/assets/icons/eye-visible.svg';
import logo from '@/assets/logo/logo-xl.svg';
import SocialButtons from '../../signup/_components/SocialButtons';
import Link from 'next/link';
import Button from '@/components/Button';
import { useLogin } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { LoginParams, loginSchema } from '@/lib/types/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal';
import { AxiosError } from 'axios';

export default function LoginForm() {
  const { mutateAsync: signin } = useLogin();
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const modalClassName = `w-[90%] ${errorMessage === '존재하지 않는 유저입니다.' ? 'max-w-[540px] h-[250px]' : 'max-w-[400px] h-[180px]'}`;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    trigger,
  } = useForm<LoginParams>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (errorMessage === '존재하지 않는 유저입니다.') {
      router.push('/signup');
    }
  };

  const onSubmit = async (data: LoginParams) => {
    try {
      await signin(data);
      toast.success('로그인');
      router.push('/activities');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err?.response?.data?.message;
      if (message === '비밀번호가 일치하지 않습니다.' || message === '존재하지 않는 유저입니다.') {
        setErrorMessage(message);
        setIsModalOpen(true);
      } else {
        toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
        console.error(error);
      }
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-xl px-4'>
        <div className='mb-[56px] flex justify-center'>
          <Link href='/'>
            <div className='relative h-[138px] w-[245px] md:h-[192px] md:w-[340px]'>
              <Image src={logo} alt='로그인창 로고' layout='fill' objectFit='contain' />
            </div>
          </Link>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
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
          <Button type='submit' className='w-full py-[11px]' disabled={!isValid || isSubmitting}>
            로그인 하기
          </Button>
        </form>

        <div className='mt-8 mb-12 text-center'>
          <p className='text-gray-800'>
            회원이 아니신가요?
            <Link href='/signup' className='font-semibold text-green-100 underline'>
              회원가입하기
            </Link>
          </p>
        </div>
        <SocialButtons />
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          className={`flex flex-col items-center rounded-2xl bg-white p-6 md:h-[250px] ${modalClassName}`}
        >
          <div className='text-bold mb-6 pt-8 text-center text-xl md:mb-11 md:pt-12'>
            {errorMessage === '존재하지 않는 유저입니다.' ? (
              <>
                존재하지 않는 유저입니다.
                <br />
                확인을 누르면 회원가입 페이지로 이동합니다.
              </>
            ) : (
              errorMessage
            )}
          </div>
          <Button className='px-[22px] py-[8px]' onClick={handleModalConfirm}>
            확인
          </Button>
        </Modal>
      )}
    </div>
  );
}
