'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import Empty from '@/components/Empty';
import { useActivityReviews, useInfiniteActivityReviews } from '@/lib/hooks/useActivities';
import { ActivityReviewsResponse } from '@/lib/types/activities';
import ActivityReviews from './ActivityReviews';

type ActivityReviewsProps = {
  currentActivityId: number;
  reviewCount: number;
};

export default function ReviewsSection({ currentActivityId, reviewCount }: ActivityReviewsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteActivityReviews(currentActivityId, 3);
  const { data: activityReviews } = useActivityReviews(currentActivityId, 1, reviewCount);

  const [reviews, setReviews] = useState<ActivityReviewsResponse['reviews']>([]);

  const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];
  const firstReview = reviews.length > 0 ? reviews[reviews.length - 1] : null;
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  const averageRating = data?.pages[0]?.averageRating ?? 0;

  const reviewsPerPage = 3;
  const currentPage = data?.pages.length ?? 0;
  const totalPages = Math.ceil((data?.pages[0]?.totalCount ?? 0) / reviewsPerPage);

  const getRatingText = (averageRating: number) => {
    if (averageRating >= 4.5) return '매우 만족';
    if (averageRating >= 3.5) return '만족';
    if (averageRating >= 2.5) return '보통';
    if (averageRating >= 1.5) return '불만족';
    return '매우 불만족';
  };

  useEffect(() => {
    if (activityReviews?.reviews) {
      setReviews(activityReviews.reviews);
    }
  }, [activityReviews]);

  return (
    <div id='reviews'>
      <div className='pt-[46px] md:pt-[50px]'></div>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold md:text-[22px]'>체험 후기 {totalCount}개</h3>
          <div className='flex items-center gap-1'>
            <div className='relative h-[20px] w-[20px]'>
              <Image src={starRating} fill style={{ objectFit: 'contain' }} alt='별점 아이콘' />
            </div>
            <span className='text-2lg md:text-[18px]'>
              <span className='font-bold'>{allReviews.length === 0 ? '' : averageRating.toFixed(1)}</span>
              &nbsp;
              {allReviews.length === 0 ? '후기 없음' : getRatingText(averageRating)}
            </span>
          </div>
        </div>
        {allReviews.length === 0 ? (
          <Empty>아직 후기가 없습니다.</Empty>
        ) : (
          <ActivityReviews
            activityReviews={{
              totalCount,
              averageRating,
              reviews: allReviews,
            }}
            firstReview={firstReview}
          />
        )}
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-[4px] border-1 border-black px-1 py-[8px]'
            aria-label='더보기'
          >
            {isFetchingNextPage ? '로딩 중...' : '더보기'}
            <span className='text-sm'>
              ({currentPage}/{totalPages} 페이지)
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
