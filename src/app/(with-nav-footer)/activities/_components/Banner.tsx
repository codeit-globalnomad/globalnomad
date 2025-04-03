'use client';
import Image from 'next/image';
import BannerSkeleton from './BannerSkeleton';
import { useActivities } from '@/lib/hooks/useActivities';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import RetryError from '@/components/RetryError';

export default function Banner() {
  const { data, isLoading, isError, refetch } = useActivities({
    method: 'offset',
    sort: 'most_reviewed',
  });

  const bestActivitiesBanner = data?.activities?.slice(0, 4);

  if (isLoading) return <BannerSkeleton />;
  if (isError) return <RetryError onRetry={refetch} className='py-40' />;

  return (
    <section aria-label='체험 목록 페이지 배너' className='relative h-[240px] w-full md:h-[550px]'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        effect='fade'
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
        loop={true}
        modules={[Autoplay, EffectFade, Pagination]}
        pagination={{ clickable: true }}
        className='relative h-full w-full'
      >
        {bestActivitiesBanner?.map((activity) => (
          <SwiperSlide key={activity.id}>
            <div className='relative h-[550px] w-full'>
              <Image
                src={activity.bannerImageUrl}
                alt={`${activity.title} 배너 이미지`}
                fill
                className='object-cover'
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent/100' />
            <div className='absolute inset-0 z-10 mx-auto my-[70px] max-w-[1200px] px-6 text-white md:my-[160px]'>
              <h2 className='text-2xl font-bold md:text-[54px] md:leading-[60px]'>
                {activity.title.split(' ').slice(0, 2).join(' ')}
                <br />
                {activity.title.split(' ').slice(2).join(' ')}
              </h2>
              <p className='text-md my-[8px] font-semibold md:my-[20px] md:text-xl'>이달의 인기 체험 BEST 🔥</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
