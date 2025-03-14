'use client';
import Link from 'next/link';
import Image from 'next/image';
import logoMd from '@/assets/logo/logo-md.svg';
import ProfileImage from './ProfileImage';
import profileDefault from '@/assets/icons/profile-default.svg';
import bell from '@/assets/icons/bell.svg';
import bellHover from '@/assets/icons/bell-hover.svg';
import { useEffect, useState } from 'react';

function LoggedOutHeader() {
  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        <Link href='/'>
          <Image
            src={logoMd}
            width={166}
            height={28}
            alt='로고'
            style={{ width: 166, height: 28 }}
            className='my-[21px] cursor-pointer'
            priority
          />
        </Link>
        <div className='flex gap-[25px] leading-[70px]'>
          <Link href={'/login'}>로그인</Link>
          <Link href={'/signup'}>회원가입</Link>
        </div>
      </div>
    </div>
  );
}

function LoggedInHeader() {
  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        <Link href='/'>
          <Image
            src={logoMd}
            width={166}
            height={28}
            alt='로고'
            style={{ width: 166, height: 28 }}
            className='my-[21px] cursor-pointer'
            priority
          />
        </Link>
        <div className='flex gap-[25px] max-[430px]:gap-[10px] md:gap-[25px] lg:gap-[25px]'>
          <div className='group my-[25px] cursor-pointer'>
            <Image src={bell} width={20} height={20} alt='알림' className='group-hover:hidden' />
            <Image src={bellHover} width={20} height={20} alt='알림(호버)' className='hidden group-hover:block' />
          </div>
          <div className='my-[24px] h-[22px] border-r-2 border-gray-300' />
          <div className='flex cursor-pointer gap-[10px]'>
            <div className='py-[19px]'>
              <ProfileImage src={profileDefault} size='small' onClick={() => {}} />
            </div>
            <p className='leading-[70px]'>닉네임</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  return isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />;
}
