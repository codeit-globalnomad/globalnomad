'use client';
import { useMyActivities } from '@/lib/hooks/useMyActivities';
import MyActivityCard from './MyActivityCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';
import empty from '@/assets/icons/empty.svg';

export default function MyActivities() {
  const { data, isLoading, isError } = useMyActivities(undefined, 4);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div>
      {data?.activities.length === 0 ? (
        <div className='mx-auto mt-[100px] flex w-full max-w-[1200px] flex-col items-center justify-center'>
          <div className='relative h-[140px] w-[140px] md:h-[200px] md:w-[200px]'>
            <Image src={empty} fill alt='검색 결과 0개' className='absolute' />
          </div>
          <p className='text-2lg mt-[24px] font-medium text-gray-800'>아직 등록한 체험이 없어요.</p>
        </div>
      ) : (
        data?.activities.map((activity) => <MyActivityCard key={activity.id} activity={activity} />)
      )}
    </div>
  );
}
