'use client';

import Image from 'next/image';
import Link from 'next/link';
import BestActivitiesBannerSkeleton from './BestActivitiesBannerSkeleton';
import RetryError from '@/components/RetryError';
import { useActivities } from '@/lib/hooks/useActivities';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const swiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
  effect: 'fade',
  autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false },
  loop: true,
  modules: [Autoplay, EffectFade, Pagination],
  pagination: { clickable: true },
};

export default function BestActivitiesBanner() {
  const { data, isLoading, isError, refetch } = useActivities({
    method: 'offset',
    sort: 'most_reviewed',
  });

  if (isLoading) return <BestActivitiesBannerSkeleton />;
  if (isError) return <RetryError onRetry={refetch} className='py-40' />;

  const bestActivitiesBanner = data?.activities?.slice(0, 4) ?? [];

  return (
    <section aria-label='체험 목록 페이지 배너' className='relative h-[240px] w-full md:h-[550px]'>
      <Swiper {...swiperOptions} className='relative h-full w-full'>
        {bestActivitiesBanner?.map((activity, index) => {
          const [firstLine, secondLine] = [
            activity.title.split(' ').slice(0, 2).join(' '),
            activity.title.split(' ').slice(2).join(' '),
          ];

          return (
            <SwiperSlide key={activity.id}>
              <Link href={`/activities/${activity.id}`}>
                <div className='relative h-[550px] w-full'>
                  <Image
                    src={activity.bannerImageUrl}
                    alt={`${activity.title} 배너 이미지`}
                    fill
                    priority={index === 0}
                    sizes='100vw'
                    quality={100}
                    className='object-cover'
                  />
                </div>
                <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent' />
                <div className='absolute inset-0 z-10 mx-auto my-[70px] max-w-[1200px] px-6 text-white md:my-[160px]'>
                  <h2 className='text-2xl font-bold text-white md:text-[54px] md:leading-[60px]'>
                    {firstLine}
                    <br />
                    {secondLine}
                  </h2>
                  <p className='text-md my-[8px] font-semibold text-white md:my-[20px] md:text-xl'>
                    이달의 인기 체험 BEST 🔥
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
