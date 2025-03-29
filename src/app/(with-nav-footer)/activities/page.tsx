import Banner from './_components/Banner';
import ActivityList from './_components/ActivityList';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Page() {
  return (
    <>
      <Banner />
      <Suspense fallback={<LoadingSpinner />}>
        <ActivityList />
      </Suspense>
    </>
  );
}
