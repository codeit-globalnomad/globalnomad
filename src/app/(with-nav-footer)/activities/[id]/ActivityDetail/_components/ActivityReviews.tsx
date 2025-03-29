import { ActivityReviewsResponse } from '@/lib/types/activities';
import ReviewCard from './ReviewCard';

type Review = ActivityReviewsResponse['reviews'][number];

type ActivityReviewsProps = {
  activityReviews: { totalCount: number; averageRating: number; reviews: ActivityReviewsResponse['reviews'] };
  firstReview: Review | null;
};

export default function ActivityReviews({ activityReviews, firstReview }: ActivityReviewsProps) {
  const reviews = activityReviews.reviews;

  return (
    <>
      <div className='flex flex-col gap-2'>
        <ReviewCard firstReview={firstReview} reviews={reviews} />
      </div>
    </>
  );
}
