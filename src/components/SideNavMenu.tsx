'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProfileImage from '@/components/ProfileImage';

// SVG 아이콘
import MyInfo from '@/assets/icons/my-users.svg'; // 내정보
import MyReservation from '@/assets/icons/my-reservations.svg'; // 예약내역
import MyActivities from '@/assets/icons/my-activities.svg'; // 내 체험 관리
import MyReservationStatus from '@/assets/icons/my-activities-dashboard.svg'; // 예약 현황
import EditIcon from '@/assets/icons/pencil.svg';

const NAV_ITEMS = [
  { name: '내 정보', path: '/my-page', icon: MyInfo },
  { name: '예약 내역', path: '/my-reservations', icon: MyReservation },
  { name: '내 체험 관리', path: '/my-activities', icon: MyActivities },
  { name: '예약 현황', path: '/my-activities/[activityId]/reservation-dashboard', icon: MyReservationStatus },
];

const SideNavMenu = () => {
  const pathname = usePathname();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <aside className='w-[251px] flex-none rounded-lg border border-gray-300 bg-white p-4 shadow-md md:w-[384px]'>
      {/* 프로필 이미지 */}
      <div className='relative flex flex-col items-center gap-4'>
        <ProfileImage size='large' src={previewImage || undefined} />

        {/* 프로필 수정 버튼 */}
        <label
          className='hover:bg-green-10 absolute right-7 bottom-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-green-100 transition md:right-24'
          aria-label='프로필 수정'
        >
          <Image src={EditIcon} alt='프로필 수정' width={24} height={24} />
          <input type='file' accept='image/*' className='hidden' onChange={handleFileChange} />
        </label>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className='mt-6'>
        <ul className='flex flex-col gap-1'>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`group flex w-full items-center gap-3 rounded-lg p-3 text-lg font-bold transition ${
                    isActive ? 'text-black-200 bg-gray-200' : 'hover:bg-green-10 hover:text-black-200 text-gray-700'
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                    className='opacity-40 grayscale transition group-hover:opacity-100 group-hover:grayscale-0'
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavMenu;
