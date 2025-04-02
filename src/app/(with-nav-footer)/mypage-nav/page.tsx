'use client';

import SideNavMenu from '@/components/SideNavMenu';
import { useMyActivities } from '@/lib/hooks/useMyActivities';
import { useMyData } from '@/lib/hooks/useUsers';
import { useEffect, useMemo } from 'react';
import { ProfileImageProvider, useProfileImage } from '@/lib/contexts/ProfileImageContext';
import { useRouter, usePathname } from 'next/navigation';

function MobileSideNavWrapper() {
  const { data: user } = useMyData();
  const { data: activity } = useMyActivities();
  const { setProfileImageUrl } = useProfileImage();

  const activityId = useMemo(() => activity?.activities?.[0]?.id, [activity?.activities]);

  useEffect(() => {
    if (user?.profileImageUrl) {
      setProfileImageUrl(user.profileImageUrl);
    }
  }, [user, setProfileImageUrl]);

  return <SideNavMenu activityId={activityId} />;
}

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth > 768;
      const isMobileNavPage = pathname === '/mypage-nav';

      if (isDesktop && isMobileNavPage) {
        router.replace('/my-page');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, router]);

  return (
    <div className='px-4 pt-10'>
      <ProfileImageProvider>
        <MobileSideNavWrapper />
      </ProfileImageProvider>
    </div>
  );
}
