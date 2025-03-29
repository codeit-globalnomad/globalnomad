import { startTransition, useActionState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import logout from './logoutAction';
import Link from 'next/link';
import Image from 'next/image';
import logoMd from '@/assets/logo/logo-md.svg';
import profileDefault from '@/assets/icons/profile-default.svg';
import bell from '@/assets/icons/bell.svg';
import bellHover from '@/assets/icons/bell-hover.svg';
import Dropdown from '../Dropdown';
import ProfileImage from '../ProfileImage';
import { toast } from 'react-toastify';

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
      toast.success('로그아웃');
      router.replace('/login');
    }
  }, [state, router]);

  const handleLogout = useCallback(() => {
    startTransition(() => {
      formAction();
    });
  }, []);
  const options = useMemo(
    () => [
      { label: '마이 페이지', onClick: () => router.push('/my-page') },
      { label: '로그아웃', onClick: handleLogout },
    ],
    [router, handleLogout],
  );
  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        <Link href='/'>
          <Image src={logoMd} width={166} height={28} alt='로고' className='my-[21px] cursor-pointer' priority />
        </Link>
        <div className='flex gap-[25px] max-[430px]:gap-[10px] md:gap-[25px] lg:gap-[25px]'>
          <div className='group my-[25px] cursor-pointer'>
            <Image src={bell} width={20} height={20} alt='알림' className='group-hover:hidden' />
            <Image src={bellHover} width={20} height={20} alt='알림(호버)' className='hidden group-hover:block' />
          </div>
          <div className='my-[24px] h-[22px] border-r-2 border-gray-300' />
          <div className='py-[19px]'>
            <Dropdown
              options={options}
              trigger={
                <div className='flex cursor-pointer justify-center gap-[10px] align-middle'>
                  <ProfileImage src={profileImage?.trim() ? profileImage : profileDefault} size='small' />
                  <p className='leading-[35px]'>{nickname}</p>
                </div>
              }
              onSelect={(selected) => selected.onClick?.()}
              dropdownClassName=' left-[-64px] z-100'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
