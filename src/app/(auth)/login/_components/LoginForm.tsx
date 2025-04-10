'use client';

import Image from 'next/image';
import ClosedEye from '@/assets/icons/eye-hidden.svg';
import OpendEye from '@/assets/icons/eye-visible.svg';
import logo from '@/assets/logo/logo-xl.svg';
import SocialButtons from '../../signup/_components/SocialButtons';
import Link from 'next/link';
import Button from '@/components/Button';
import { useLogin } from '@/lib/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginParams, loginSchema } from '@/lib/types/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal';
import { AxiosError } from 'axios';
import checkIcon from '@/assets/icons/check-circle-filled.svg';

export default function LoginForm() {
  const { mutateAsync: signin } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const modalClassName = `w-[90%] ${errorMessage === '존재하지 않는 유저입니다.' ? 'max-w-[540px]' : 'max-w-[400px]'}`;
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

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      const decoded = decodeURIComponent(error);
      setErrorMessage(decoded);
      setIsModalOpen(true);

      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginParams) => {
    try {
      await signin(data);
      toast.success('로그인에 성공했습니다.');
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
    <div className='my-32 flex items-center justify-center'>
      <div className='w-full max-w-xl px-4'>
        <div className='mb-[56px] flex justify-center'>
          <Link href='/'>
            <div className='relative h-[138px] w-[245px] md:h-[192px] md:w-[340px]'>
              <Image src={logo} alt='로그인창 로고' priority fill style={{ objectFit: 'contain' }} />
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
              className='bg-white'
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
              className='bg-white'
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
            로그인하기
          </Button>
        </form>

        <div className='mt-8 mb-12 text-center'>
          <p className='text-lg text-gray-800'>
            회원이 아니신가요?&nbsp;
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
          className={`flex w-[360px] flex-col items-center gap-5 ${modalClassName}`}
        >
          <Image src={checkIcon} alt='체크 아이콘' width={28} height={28} />
          <div className='font-regular text-black-100 text-2lg text-center whitespace-nowrap'>
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
          <Button className='px-6 py-2 text-lg font-bold' onClick={handleModalConfirm}>
            확인
          </Button>
        </Modal>
      )}
    </div>
  );
}
