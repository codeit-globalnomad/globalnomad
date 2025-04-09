'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ProfileImage from '@/components/ProfileImage';
import MyInfo from '@/assets/icons/my-users.svg';
import MyReservation from '@/assets/icons/my-reservations.svg';
import MyActivities from '@/assets/icons/my-activities.svg';
import MyReservationStatus from '@/assets/icons/my-activities-dashboard.svg';
import EditIcon from '@/assets/icons/pencil.svg';

import { useProfileImage as useProfileImageContext } from '@/lib/contexts/ProfileImageContext';
import { useProfileImage as useProfileImageUpload, useUserdataUpdate } from '@/lib/hooks/useUsers';

interface SideNavMenuProps {
  activityId?: number;
}

const SideNavMenu = ({ activityId }: SideNavMenuProps) => {
  const pathname = usePathname();

  const { profileImageUrl, setProfileImageUrl } = useProfileImageContext();
  const { mutate: uploadImage } = useProfileImageUpload();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { mutate: patchImage } = useUserdataUpdate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    uploadImage(
      { image: file },
      {
        onSuccess: (res) => {
          console.log(res);
          setProfileImageUrl(res.profileImageUrl);
          patchImage({ profileImageUrl: res.profileImageUrl });
        },
      },
    );
  };

  const NAV_ITEMS = [
    { name: '내 정보', path: '/my-page', icon: MyInfo },
    { name: '예약 내역', path: '/my-reservations', icon: MyReservation },
    { name: '내 체험 관리', path: `/my-activities`, icon: MyActivities },
    {
      name: '예약 현황',
      path: `/my-activities/${activityId}/reservation-dashboard?year=${String(new Date().getFullYear())}&month=${String(new Date().getMonth() + 1).padStart(2, '0')}`,
      icon: MyReservationStatus,
    },
  ];

  return (
    <aside className='mx-auto h-[444px] w-full max-w-[344px] min-w-[251px] flex-none rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-md max-[900px]:max-w-[251px]'>
      <div className='flex justify-center'>
        <div className='relative w-fit'>
          <ProfileImage size='large' src={previewImage || profileImageUrl} />
          <label
            className='hover:bg-green-10 absolute -right-0 -bottom-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-green-100 transition'
            aria-label='프로필 수정'
          >
            <Image src={EditIcon} alt='프로필 수정' />
            <input type='file' accept='image/*' className='hidden h-[24px] w-[24px]' onChange={handleFileChange} />
          </label>
        </div>
      </div>
      <nav className='mt-6'>
        <ul className='flex flex-col gap-1'>
          {NAV_ITEMS.map((item) => {
            const isActive =
              (item.name === '내 정보' && pathname === '/my-page') ||
              (item.name === '예약 내역' && pathname === '/my-reservations') ||
              (item.name === '내 체험 관리' && pathname === '/my-activities') ||
              (item.name === '예약 현황' &&
                pathname.startsWith('/my-activities/') &&
                pathname.includes('/reservation-dashboard'));
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`group flex w-full items-center gap-3 rounded-lg p-3 text-lg font-bold transition ${
                    isActive ? 'text-black-200 bg-green-10' : 'hover:text-black-200 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                    className={`opacity-40 grayscale transition group-hover:opacity-100 group-hover:grayscale-0 ${isActive ? 'opacity-100' : ''}`}
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
