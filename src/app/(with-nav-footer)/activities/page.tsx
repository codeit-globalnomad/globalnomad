import BestActivitiesBanner from './_components/BestActivitiesBanner';
import ActivityList from './_components/ActivityList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <BestActivitiesBanner />
      <Suspense fallback={<LoadingSpinner />}>
        <ActivityList />
      </Suspense>
    </>
  );
}
