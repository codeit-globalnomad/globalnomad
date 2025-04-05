'use client';

import { useMyData } from '@/lib/hooks/useUsers';
import HeaderSkeleton from './auth/HeaderSkeleton';
import LoggedInHeader from './auth/LoggedInHeader';
import LoggedOutHeader from './auth/LoggedOutHeader';

export default function Header() {
  const { data: user, isLoading } = useMyData();

  return isLoading ? (
    <HeaderSkeleton />
  ) : user ? (
    <LoggedInHeader nickname={user.nickname} profileImage={user.profileImageUrl} />
  ) : (
    <LoggedOutHeader />
  );
}
