'use client';

import { useState } from 'react';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import { useActivityReviews } from '@/lib/hooks/useActivities';
import { ActivityReviewsResponse } from '@/lib/types/activities';
import ActivityReviews from './ActivityReviews';

type ActivityReviewsProps = {
  currentActivityId: number;
  reviewCount: number;
};

export default function ReviewsSection({ currentActivityId, reviewCount }: ActivityReviewsProps) {
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [reviews, setReviews] = useState<ActivityReviewsResponse['reviews']>([]);
  const { data: activityReviews } = useActivityReviews(currentActivityId, 1, reviewCount);

  if (activityReviews && activityReviews.reviews !== reviews) {
    setReviews(activityReviews.reviews);
  }

  const totalReviews = activityReviews?.totalCount ?? 0;
  const reviewsPerPage = 3;

  const loadMoreReviews = () => {
    setReviewsToShow((prevReviews) => prevReviews + 3);
  };

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const currentPage = Math.ceil(reviewsToShow / reviewsPerPage);
  const hasMoreReviews = reviewsToShow < totalReviews;
  const totalCount = activityReviews?.reviews ? activityReviews.totalCount : 0;

  const getRatingText = (averageRating: number) => {
    if (averageRating >= 4.5) return '매우 만족';
    if (averageRating >= 3.5) return '만족';
    if (averageRating >= 2.5) return '보통';
    if (averageRating >= 1.5) return '불만족';
    return '매우 불만족';
  };

  const averageRating = activityReviews?.averageRating ?? 0;
  const firstReview = reviews.length > 0 ? reviews[reviews.length - 1] : null;

  return (
    <div id='reviews'>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold md:text-[22px]'>체험 후기 {totalCount}개</h3>
          <div className='flex gap-1'>
            <Image width={20} height={20} src={starRating} alt='별점 아이콘' />
            <span className='text-2lg md:text-[18px]'>
              <span className='font-bold'>{reviews.length === 0 ? '' : averageRating.toFixed(1)}</span>
              &nbsp;
              {reviews.length === 0 ? '후기 없음' : getRatingText(averageRating)}
            </span>
          </div>
        </div>
        {reviews.length === 0 ? (
          <p>아직 후기가 없습니다.</p>
        ) : (
          <ActivityReviews
            activityReviews={{
              totalCount: totalReviews,
              averageRating: activityReviews?.averageRating ?? 0,
              reviews: reviews.slice(0, reviewsToShow),
            }}
            firstReview={firstReview}
          />
        )}
        {hasMoreReviews && (
          <button
            onClick={loadMoreReviews}
            className='mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-[4px] border-1 border-black bg-white px-1 py-[8px]'
          >
            더보기
            <span className='text-sm'>
              ({currentPage}/{totalPages} 페이지)
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
