import { ActivityReviewsResponse } from '@/lib/types/activities';
import ReviewCard from './ReviewCard';

type ActivityReviewsProps = {
  activityReviews: ActivityReviewsResponse | undefined;
};

export default function ActivityReviews({ activityReviews }: ActivityReviewsProps) {
  const reviews = activityReviews?.reviews ?? [];

  return (
    <>
      <div className=''>
        <ReviewCard reviews={reviews} />
      </div>
    </>
  );
}
