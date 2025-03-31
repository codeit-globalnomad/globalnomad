import { ActivityReviewsResponse } from '@/lib/types/activities';
import ProfileImage from '@/components/ProfileImage';
import profileDefault from '@/assets/icons/profile-default.svg';

type Review = ActivityReviewsResponse['reviews'][number];

type ReviewsProps = {
  reviews: Review[];
  firstReview: Review | null;
};

const getTimeAgo = (dateString: string) => {
  const createdAt = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
};

export default function ReviewCard({ reviews, firstReview }: ReviewsProps) {
  return (
    <>
      {reviews.map((review, index) => {
        const isFirstReview = firstReview && review.id === firstReview.id;
        const isLast = index === 0;
        return (
          <div key={review.id} className='rounded-[12px] bg-gray-100 p-8'>
            <div className='flex justify-between'>
              <ul className='flex items-center gap-3'>
                <li className='h-[45px] w-[45px] overflow-hidden rounded-full'>
                  <ProfileImage src={review.user.profileImageUrl || profileDefault} />
                </li>
                <li>
                  <p className='font-bold'>{review.user.nickname}</p>
                  <p className='text-sm text-gray-600'>{getTimeAgo(review.createdAt)}</p>
                </li>
              </ul>
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
