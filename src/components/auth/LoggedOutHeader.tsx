import Link from 'next/link';
import Image from 'next/image';
import logoMd from '@/assets/logo/logo-md.svg';

export default function LoggedOutHeader() {
  return (
    <div className='flex h-[70px] w-full justify-center border-b border-gray-300 bg-white'>
      <div className='flex w-full justify-between px-5 md:w-full md:px-5 lg:mx-auto lg:w-[1200px]'>
        <Link href='/activities'>
          <Image src={logoMd} width={172} height={30} alt='로고' className='my-[21px] cursor-pointer' priority />
        </Link>
        <div className='text-black-100 flex gap-[25px] text-lg leading-[70px]'>
          <Link href='/login'>로그인</Link>
          <Link href='/signup'>회원가입</Link>
        </div>
      </div>
    </div>
  );
}
