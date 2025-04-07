'use client';

import { useState, useRef } from 'react';
import { useMyNotifications } from '@/lib/hooks/useMyNotification';
import bell from '@/assets/icons/bell.svg';
import bellHover from '@/assets/icons/bell-hover.svg';
import NotificationCardList from '@/app/(with-nav-footer)/(my-notifications)/_conponents/NotificationCardList';
import Image from 'next/image';
import CloseImage from '@/assets/icons/close.svg';
import { useClickOutside } from '@/lib/utils/useClickOutside';

export default function NotificationDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useMyNotifications({ size: 3 });
  const notifications = data?.notifications ?? [];
  const firstCursorId = notifications.at(-1)?.id;
  const totalCount = data?.totalCount ?? 0;

  // 외부 클릭 시 닫기
  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  console.log('id', firstCursorId);
  return (
    <div className='relative' ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)} className='group relative my-[25px] cursor-pointer'>
        <div className='group relative'>
          <Image src={bell} width={20} height={20} alt='알림' className='group-hover:hidden' />
          <Image src={bellHover} width={20} height={20} alt='알림(호버)' className='hidden group-hover:block' />
        </div>
        {totalCount > 0 && (
          <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] text-white'>
            {totalCount}
          </span>
        )}
      </div>

      {isOpen && (
        <div className='bg-green-10 absolute top-14 -right-7 z-100 h-[380px] w-[368px] rounded-[10px] p-4 px-5 py-6 shadow-lg'>
          <div className='mb-4 flex items-start justify-between'>
            <h3 className='text-[20px] leading-[32px] font-bold'>알림 {totalCount}개</h3>
            {/* <div className='flex flex-col items-end gap-2'> */}
            <Image
              onClick={() => setIsOpen(false)}
              className='cursor-pointer'
              src={CloseImage}
              width={24}
              height={24}
              alt='날짜별 예약 현황창 닫기'
              aria-label='예약 현황창 닫기'
            />
            {/* </div> */}
          </div>

          {isLoading ? (
            <p className='text-sm text-gray-500'>불러오는 중...</p>
          ) : (
            <NotificationCardList notifications={notifications} firstCursorId={firstCursorId} />
          )}

          <div className='mt-1 text-right'>
            <span className='cursor-pointer text-right text-sm text-gray-900'>모두 삭제</span>
          </div>
        </div>
      )}
    </div>
  );
}
