'use client';

import Empty from '@/assets/icons/empty.svg';
import Image from 'next/image';
import { useMyActivities } from '@/lib/hooks/useMyActivities';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function NotActivitiesPage() {
  const { isLoading, isError } = useMyActivities(undefined, 4);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러가 발생했습니다.</div>;
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
