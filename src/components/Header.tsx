'use client';

import LoadingSkeleton from './auth/LoadingSkeleton';
import { useMyData } from '@/lib/hooks/useUsers';
import LoggedInHeader from './auth/LoggedInHeader';
import LoggedOutHeader from './auth/LoggedOutHeader';

export default function Header() {
  const { data: user, isLoading } = useMyData();

  return isLoading ? (
    <LoadingSkeleton />
  ) : user ? (
    <LoggedInHeader nickname={user.nickname} profileImage={user.profileImageUrl} />
  ) : (
    <LoggedOutHeader />
  );
}
