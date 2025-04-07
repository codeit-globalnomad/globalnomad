import Link from 'next/link';
import Image from 'next/image';
import logoMd from '@/assets/logo/logo-md.svg';

export default function HeaderSkeleton() {
  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300 bg-white'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        <Link href='/'>
          <Image src={logoMd} width={172} height={30} alt='로고' className='my-[21px] cursor-pointer' priority />
        </Link>
        <div className='flex items-center gap-[25px] max-[430px]:gap-[10px] md:gap-[25px] lg:gap-[25px]'>
          <div className='group my-[25px]'>
            <div className='h-[20px] w-[20px] animate-pulse rounded-full bg-gray-300' />
          </div>
          <div className='my-[24px] h-[22px] w-[1px] bg-gray-300' />
          <div className='py-[19px]'>
            <div className='flex items-center justify-center gap-[10px]'>
              <div className='h-[32px] w-[32px] animate-pulse rounded-full bg-gray-300' />
              <div className='h-[20px] w-[60px] animate-pulse rounded bg-gray-300' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
