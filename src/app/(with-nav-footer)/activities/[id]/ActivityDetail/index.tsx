'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useActivityDetail } from '@/lib/hooks/useActivities';
import { useMyData } from '@/lib/hooks/useUsers';
import { useIntersectionObserver } from '@/lib/utils/useIntersectionObserver';
import ActivityHeader from './_components/ActivityHeader';
import ActivityGallery from './_components/ActivityGallery';
import ActivityTab from './_components/ActivityTab';
import DescriptionSection from './_components/ActivityDescriptionSection';
import LocationSection from './_components/ActivityLocationSection';
import ReviewsSection from './_components/ActivityReviewsSection';
import { MobileReservation, TabletReservation, DesktopReservation } from './_components/ActivityReservation';
import ActivityBanner from './_components/ActivityBanner';
import ScrollToTopButton from './_components/ScrollToTopButton';

const wrapper = 'mt-3 flex w-full flex-col gap-4 md:gap-6 max-w-[1200px]';
const tabItems = [
  { label: '체험 설명', targetId: 'description' },
  { label: '위치', targetId: 'location' },
  { label: '후기', targetId: 'reviews' },
];

export default function ActivityDetailPage({ id }: { id: number }) {
  const { data: activityDetail } = useActivityDetail(id);
  const { data: userData } = useMyData();

  const [currentTab, setCurrentTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);

  useIntersectionObserver((id) => setCurrentTab(id));

  const scrollToTop = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    setCurrentTab('description');
  };

  useEffect(() => {
    scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !activityDetail) {
    return <LoadingSpinner />;
  }

  const isSameUser = userData?.id === activityDetail.userId;
  const category = activityDetail.category;
  const currentActivityId = activityDetail.id;
  const description = activityDetail.description;
  const address = activityDetail.address;

  return (
    <div className='relative flex flex-col items-center justify-center scroll-smooth'>
      <div className={`${wrapper} flex-col px-5 lg:mt-10`}>
        <section className='flex flex-col gap-4'>
          <ActivityHeader activityDetail={activityDetail} isSameUser={isSameUser} />
        </section>
      </div>
      <div className={`${wrapper} flex-col md:px-5`}>
        <ActivityGallery activityDetail={activityDetail} />
      </div>
      <div className={`md:${wrapper} px-5 md:flex-row md:gap-[2%] lg:mb-16`}>
        <section className={`mt-6 mb-6 w-full ${!isSameUser ? 'md:w-[70%]' : 'md:w-full'}`}>
          <div className='sticky top-0 z-20 bg-white'>
            <ActivityTab
              tabs={tabItems}
              currentTab={currentTab}
              onTabClick={(id) => {
                setCurrentTab(id);
              }}
            />
          </div>
          <div className='w-full'>
            <DescriptionSection description={description} />
            <LocationSection address={address} />
            <ReviewsSection />
            <ActivityBanner category={category} currentActivityId={currentActivityId} />
          </div>
        </section>
        {!isSameUser && (
          <section className='md: fixed bottom-0 left-0 z-50 w-full md:relative md:top-0 md:right-0 md:w-[28%]'>
            <MobileReservation />
            <div className='sticky top-3 md:mt-6 md:mb-3'>
              <TabletReservation />
              <DesktopReservation />
            </div>
          </section>
        )}
      </div>
      <ScrollToTopButton onClick={scrollToTop} />
    </div>
  );
}
