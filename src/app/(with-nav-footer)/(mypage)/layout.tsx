'use client';

import SideNavMenu from '@/components/SideNavMenu';
import { ProfileImageProvider, useProfileImage } from '@/lib/contexts/ProfileImageContext';
import { useMyData } from '@/lib/hooks/useUsers';
import { useEffect } from 'react';

function WithProfileImageContext({ children }: { children: React.ReactNode }) {
  const { data: user } = useMyData();
  const { setProfileImageUrl } = useProfileImage();

  useEffect(() => {
    if (user?.profileImageUrl) {
      setProfileImageUrl(user.profileImageUrl);
    }
  }, [user, setProfileImageUrl]);

  return (
    <div className='flex w-full max-w-[1140px] gap-10'>
      <SideNavMenu />
      <main className='flex-1'>{children}</main>
    </div>
  );
}

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex justify-center px-4 pt-10'>
      <ProfileImageProvider>
        <WithProfileImageContext>{children}</WithProfileImageContext>
      </ProfileImageProvider>
    </div>
  );
}
