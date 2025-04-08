'use client';

import SideNavMenu from '@/components/SideNavMenu';
import { ProfileImageProvider } from '@/lib/contexts/ProfileImageContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useProfileInit } from '@/lib/utils/useProfileInit';

function MobileSideNavWrapper() {
  const activityId = useProfileInit();
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

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    handleResize();
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [pathname, router]);

  return (
    <div className='mb-[40%] px-4 pt-10'>
      <ProfileImageProvider>
        <MobileSideNavWrapper />
      </ProfileImageProvider>
    </div>
  );
}
