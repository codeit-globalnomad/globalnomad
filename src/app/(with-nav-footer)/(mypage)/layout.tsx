'use client';

import SideNavMenu from '@/components/SideNavMenu';
import { ProfileImageProvider } from '@/lib/contexts/ProfileImageContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProfileInit } from '@/lib/utils/useProfileInit';

function MobileOnlyMenu() {
  const activityId = useProfileInit();
  return <SideNavMenu activityId={activityId} />;
}

function WithProfileImageContext({ children }: { children: React.ReactNode }) {
  const activityId = useProfileInit();
  return (
    <div className='flex w-full max-w-[1140px] gap-4'>
      <SideNavMenu activityId={activityId} />
      <main className='flex-1'>{children}</main>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const showSideNavOnly = isMobile && pathname === '/mypage-nav';
  const showMobileContentWithBack = isMobile && !showSideNavOnly;

  return (
    <div className='flex justify-center px-4 pt-10'>
      <ProfileImageProvider>
        {showSideNavOnly ? (
          <MobileOnlyMenu />
        ) : showMobileContentWithBack ? (
          <div className='w-full max-w-[680px]'>
            <div className='mt-[-20px]'>
              <Link href='/mypage-nav' className='text-sm text-gray-600 hover:underline'>
                ← 마이 페이지 홈으로 이동
              </Link>
            </div>
            {children}
          </div>
        ) : (
          <WithProfileImageContext>{children}</WithProfileImageContext>
        )}
      </ProfileImageProvider>
    </div>
  );
}
