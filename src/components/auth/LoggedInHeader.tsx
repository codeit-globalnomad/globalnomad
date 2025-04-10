'use client';

import { useActionState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import logout from './logoutAction';
import Link from 'next/link';
import Image from 'next/image';
import logoMd from '@/assets/logo/logo-md.svg';
import Dropdown from '../Dropdown';
import ProfileImage from '../ProfileImage';
import { toast } from 'react-toastify';
import NotificationDropdown from './NotificationDropdown';

export default function LoggedInHeader({
  nickname,
  profileImage,
}: {
  nickname: string;
  profileImage: string | null | undefined;
}) {
  const [state, formAction] = useActionState(logout, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.status) {
      toast.success('로그아웃 처리 되었습니다.');
      window.location.href = '/login';
    }
    console.log(state);
  }, [state, router]);

  const options = useMemo(
    () => [
      { label: '마이 페이지', onClick: () => router.push('/my-page') },
      { label: '로그아웃', formAction },
    ],
    [router, formAction],
  );
  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300 bg-white'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        <Link href='/activities'>
          <Image src={logoMd} width={172} height={30} alt='로고' className='my-[21px] cursor-pointer' priority />
        </Link>
        <div className='flex gap-[25px] max-[430px]:gap-[10px] md:gap-[25px] lg:gap-[25px]'>
          <NotificationDropdown />
          <div className='my-[24px] h-[22px] border-r-2 border-gray-300' />
          <div className='py-[19px]'>
            <Dropdown
              options={options}
              trigger={
                <div className='flex cursor-pointer justify-center gap-[10px] align-middle'>
                  <ProfileImage src={profileImage} size='small' clickable />
                  <p className='text-black-100 text-lg leading-[35px]'>{nickname}</p>
                </div>
              }
              onSelect={(selected) => selected.onClick?.()}
              dropdownClassName='top-[42px] right-0 z-100'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
