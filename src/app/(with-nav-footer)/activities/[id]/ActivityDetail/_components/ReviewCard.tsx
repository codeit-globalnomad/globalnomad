import { parseISO } from 'date-fns';
import ProfileImage from '@/components/ProfileImage';
import { ActivityReviewsResponse } from '@/lib/types/activities';

type Review = ActivityReviewsResponse['reviews'][number];

type ReviewsProps = {
  reviews: Review[];
  firstReview: Review | null;
};

const getTimeAgo = (dateString: string) => {
  const createdAt = parseISO(dateString);
  const nowKST = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  const diffInMilliseconds = nowKST.getTime() - createdAt.getTime();

  const timeIntervals = [
    { label: '년', value: 365 * 24 * 60 * 60 * 1000 },
    { label: '개월', value: 30 * 24 * 60 * 60 * 1000 },
    { label: '주', value: 7 * 24 * 60 * 60 * 1000 },
    { label: '일', value: 24 * 60 * 60 * 1000 },
    { label: '시간', value: 60 * 60 * 1000 },
    { label: '분', value: 60 * 1000 },
  ];

  for (const { label, value } of timeIntervals) {
    const diff = Math.floor(diffInMilliseconds / value);
    if (diff > 0) {
      return `${diff}${label} 전`;
    }
  }

  return '방금 전';
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
              {(isFirstReview || isLast) && (
                <span
                  className={`h-fit rounded-[3px] px-2 py-1 text-xs font-medium ${isFirstReview ? 'border-[1px] border-green-100 bg-white text-green-100' : 'bg-green-100 text-white'}`}
                >
                  {isFirstReview ? '첫 후기' : '최근 후기'}
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
