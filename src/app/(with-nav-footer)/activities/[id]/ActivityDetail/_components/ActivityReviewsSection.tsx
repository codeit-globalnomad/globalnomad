import { useRef } from 'react';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import { ActivityReviewsResponse } from '@/lib/types/activities';
import ActivityReviews from './ActivityReviews';

type ActivityReviewsProps = {
  activityReviews: ActivityReviewsResponse | undefined;
};
export default function ReviewsSection({ activityReviews }: ActivityReviewsProps) {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const totalCount = activityReviews?.reviews ? activityReviews.totalCount : 0;

  const getRatingText = (averageRating: number) => {
    if (averageRating >= 4.5) return '매우 만족';
    if (averageRating >= 3.5) return '만족';
    if (averageRating >= 2.5) return '보통';
    if (averageRating >= 1.5) return '불만족';
    return '매우 불만족';
  };

  const averageRating = activityReviews?.averageRating ?? 0;

  return (
    <div id='reviews' ref={reviewsRef}>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold md:text-[22px]'>체험 후기 {totalCount}개</h3>
          <div className='flex gap-1'>
            <Image width={26} height={26} src={starRating} alt='별점 아이콘' />
            <span className='text-2lg md:text-xl'>
              <span className='font-bold'>{averageRating}</span>&nbsp;
              {getRatingText(averageRating)}
            </span>
          </div>
        </div>
        <ActivityReviews activityReviews={activityReviews} />
      </div>
    </div>
  );
}
