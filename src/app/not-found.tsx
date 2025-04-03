import Header from '@/components/Header';
import Image from 'next/image';
import noData from '@/assets/icons/No-data.svg';
import Button from '@/components/Button';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className='flex h-screen flex-col items-center justify-center gap-[30px]'>
        <Image className='h-[136px] w-[136px]' alt='404' src={noData} priority />
        <div className='text-center'>
          <h1 className='text-xl font-bold text-gray-800 md:text-2xl'>404</h1>
          <p className='mt-2 text-gray-800 md:text-lg'>잘못된 주소 또는 없는 페이지입니다.</p>
        </div>
        <Link href='/'>
          <Button className='text-md px-6 py-2 md:text-lg'>홈으로 돌아가기</Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
