'use client';

import SideNavMenu from '@/components/SideNavMenu';
import { ProfileImageProvider, useProfileImage } from '@/lib/contexts/ProfileImageContext';
import { useMyActivities } from '@/lib/hooks/useMyActivities';
import { useMyData } from '@/lib/hooks/useUsers';
import { useEffect, useMemo } from 'react';

function WithProfileImageContext({ children }: { children: React.ReactNode }) {
  const { data: user } = useMyData();
  const { data: activity } = useMyActivities();
  const { setProfileImageUrl } = useProfileImage();

  useEffect(() => {
    if (user?.profileImageUrl) {
      setProfileImageUrl(user.profileImageUrl);
    }
  }, [user, setProfileImageUrl]);

  const activityId = useMemo(() => activity?.activities?.[0]?.id, [activity?.activities]);

  return (
    <div className='flex w-full max-w-[1140px] gap-10'>
      <SideNavMenu activityId={activityId} />
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
