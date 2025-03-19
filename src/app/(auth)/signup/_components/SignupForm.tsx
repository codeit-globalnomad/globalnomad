'use client';

import Image from 'next/image';
import logo from '@/assets/logo/logo-xl.svg';
import SocialButtons from './SocialButtons';
import Link from 'next/link';
import Button from '@/components/Button';

export default function SignupForm() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-xl px-4'>
        <div className='mb-[56px] flex justify-center'>
          <Link href='/'>
            <Image src={logo} width={340} height={192} alt='회원가입창 로고' />
          </Link>
        </div>

        <form className='space-y-4'>
          <div className='mb-[28px]'>
            <label className='text-black-100 mb-2 block'>이메일</label>
            <input
              type='email'
              placeholder='이메일을 입력해 주세요'
              className='w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-green-100 focus:outline-none'
            />
          </div>

          <div className='mb-[28px]'>
            <label className='text-black-100 mb-2 block'>닉네임</label>
            <input
              type='text'
              placeholder='닉네임을 입력해 주세요'
              className='w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-green-100 focus:outline-none'
            />
          </div>

          <div className='mb-[28px]'>
            <label className='text-black-100 mb-2 block'>비밀번호</label>
            <input
              type='password'
              placeholder='8자 이상 입력해 주세요'
              className='w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-green-100 focus:outline-none'
            />
          </div>

          <div className='mb-[28px]'>
            <label className='text-black-100 mb-2 block'>비밀번호 확인</label>
            <input
              type='password'
              placeholder='비밀번호를 한 번 더 입력해 주세요'
              className='w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-green-100 focus:outline-none'
            />
          </div>
          <Button className='w-full py-[11px]' disabled={true}>
            <div>회원가입 하기</div>
          </Button>
        </form>

        <div className='mt-8 mb-12 text-center'>
          <p className='text-gray-800'>
            회원이신가요?{' '}
            <a href='/login' className='font-semibold text-green-100'>
              로그인하기
            </a>
          </p>
        </div>
        <SocialButtons />
      </div>
    </div>
  );
}
