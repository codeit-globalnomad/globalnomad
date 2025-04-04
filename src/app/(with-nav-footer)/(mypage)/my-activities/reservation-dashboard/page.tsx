import Empty from '@/assets/icons/empty.svg';
import Image from 'next/image';

export default function NotActivitiesPage() {
  return (
    <>
      <h1 className='flex items-center text-2xl leading-[42px] font-bold'>예약 현황</h1>
      <div className='mx-auto mt-[100px] flex w-full max-w-[1200px] flex-col items-center justify-center'>
        <div className='relative h-[140px] w-[140px] md:h-[200px] md:w-[200px]'>
          <Image src={Empty} fill alt='검색 결과 0개' className='absolute' />
        </div>
        <p className='text-2lg mt-[24px] font-medium text-gray-800'>아직 등록한 체험이 없어요.</p>
      </div>
    </>
  );
}
