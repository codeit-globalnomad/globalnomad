'use client';

import Link from 'next/link';
import LoadingSkeleton from './auth/LoadingSkeleton';
import Image from 'next/image';
import { useMyData } from '@/lib/hooks/useUsers';
import LoggedInHeader from './auth/LoggedInHeader';
import LoggedOutHeader from './auth/LoggedOutHeader';
import logoMd from '@/assets/logo/logo-md.svg';

export default function Header() {
  const { data: user, isLoading } = useMyData();

  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        {isLoading ? <LoadingSkeleton /> : user ? <LoggedInHeader nickname={user.nickname} /> : <LoggedOutHeader />}
      </div>
    </div>
  );
}
