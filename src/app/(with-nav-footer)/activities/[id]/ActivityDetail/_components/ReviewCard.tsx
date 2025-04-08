import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import ProfileImage from '@/components/ProfileImage';
import { ActivityReviewsResponse } from '@/lib/types/activities';

type Review = ActivityReviewsResponse['reviews'][number];

type ReviewsProps = {
  reviews: Review[];
  firstReview: Review | null;
};

const getTimeAgo = (dateString: string) => {
  const createdAt = new Date(dateString);
  const seconds = (new Date().getTime() - createdAt.getTime()) / 1000;

  if (seconds < 60) return '방금 전';
  return formatDistanceToNow(createdAt, { addSuffix: true, locale: ko });
};

export default function ReviewCard({ reviews, firstReview }: ReviewsProps) {
  return (
    <>
      {reviews.map((review, index) => {
        const isFirstReview = firstReview && review.id === firstReview.id;
        const isLast = index === 0;
        return (
          <div key={review.id} className='rounded-[12px] border border-gray-300 bg-white px-5 py-6 md:p-8'>
            <div className='flex justify-between'>
              <ol className='flex items-center gap-3'>
                <li className='h-[45px] w-[45px] overflow-hidden rounded-full'>
                  <ProfileImage src={review.user.profileImageUrl} />
                </li>
                <li>
                  <p className='font-bold'>{review.user.nickname}</p>
                  <p className='text-sm text-gray-600'>{getTimeAgo(review.createdAt)}</p>
                </li>
              </ol>
              {isFirstReview && (
                <span className='h-fit rounded-[3px] border-[1px] border-green-100 bg-white px-2 py-1 text-xs font-medium text-green-100'>
                  첫 후기
                </span>
              )}
              {isLast && !isFirstReview && (
                <span className='h-fit rounded-[3px] bg-green-100 px-2 py-1 text-xs font-medium text-white'>
                  최근 후기
                </span>
              )}
            </div>
            <p className='mt-2'>{review.content}</p>
          </div>
        );
      })}
    </>
  );
}
