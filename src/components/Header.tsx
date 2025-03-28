'use client';

import LoadingSkeleton from './auth/LoadingSkeleton';
import { useMyData } from '@/lib/hooks/useUsers';
import LoggedInHeader from './auth/LoggedInHeader';
import LoggedOutHeader from './auth/LoggedOutHeader';

export default function Header() {
  const { data: user, isLoading } = useMyData();

  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        {isLoading ? (
          <LoadingSkeleton />
        ) : user ? (
          <LoggedInHeader nickname={user.nickname} profileImage={user.profileImageUrl} />
        ) : (
          <LoggedOutHeader />
        )}
      </div>
    </div>
  );
}
