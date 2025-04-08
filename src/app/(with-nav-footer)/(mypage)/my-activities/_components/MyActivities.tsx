'use client';

import { useInfiniteMyActivities } from '@/lib/hooks/useMyActivities';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';
import MyActivityCard from './MyActivityCard';
import Empty from '@/components/Empty';
import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';
import RetryError from '@/components/RetryError';

export default function MyActivities() {
  const router = useRouter();
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteMyActivities();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} className='py-10' />;

  const allActivities = data?.pages.flatMap((page) => page.activities) ?? [];

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-black-100 text-2xl font-bold'>내 체험 관리</h2>
        <Button
          className='px-[16px] py-[10px] text-lg font-bold'
          onClick={() => router.push('/my-activities/add-activities')}
        >
          체험 등록하기
        </Button>
      </div>
      {allActivities.length === 0 ? (
        <Empty>아직 등록한 체험이 없어요.</Empty>
      ) : (
        allActivities.map((activity) => <MyActivityCard key={activity.id} activity={activity} />)
      )}
      <div ref={loaderRef} className='h-[1px]' />
      {isFetchingNextPage && <p className='text-center text-gray-400'>불러오는 중...</p>}
    </div>
  );
}
