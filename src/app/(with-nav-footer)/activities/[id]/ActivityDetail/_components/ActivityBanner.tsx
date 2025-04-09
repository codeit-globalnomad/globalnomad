'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper as SwiperInstance } from 'swiper';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import leftArrow from '@/assets/icons/left-arrow.svg';
import starRating from '@/assets/icons/star-rating.svg';
import { useActivities } from '@/lib/hooks/useActivities';
import { GetActivitiesParams } from '@/lib/types/activities';
import 'swiper/css';
import 'swiper/css/pagination';

interface ActivityBannerProps {
  category: string;
  currentActivityId: number;
}

interface Banner {
  id: number;
  imageUrl: string;
  alt: string;
  title: string;
  rating: number;
  price: number;
  reviewCount: number;
}

export default function ActivityBanner({ category, currentActivityId }: ActivityBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBanners, setSelectedBanners] = useState<Banner[]>([]);

  const swiperRef = useRef<SwiperInstance | null>(null);

  const params: GetActivitiesParams = {
    method: 'offset',
    category: category,
  };

  const { data } = useActivities(params);

  useEffect(() => {
    if (data?.activities) {
      const banners = data.activities.map((activity) => ({
        ...activity,
        imageUrl: activity.bannerImageUrl,
        alt: activity.title || '추천 체험 이미지',
      }));

      const filteredBanners = banners.filter((banner) => banner.id !== currentActivityId);
      const randomBanners = filteredBanners.sort(() => Math.random() - 0.5).slice(0, 3);
      setSelectedBanners(randomBanners);
    }
  }, [data, currentActivityId]);

  const handleSlideChange = (swiper: SwiperInstance) => {
    setCurrentIndex(swiper.realIndex);
  };

  const noBanners = selectedBanners.length === 0;

  return (
    <>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <div className='relative flex items-center justify-between'>
        <h3 className='text-xl font-bold md:text-[22px]'>{category} 추천 체험</h3>
        <ol className='z-10 mr-[-10px] flex cursor-pointer'>
          <li
            className={`custom-prev-banner ${currentIndex === 0 || noBanners ? 'pointer-events-none opacity-50' : ''}`}
          >
            <Image src={leftArrow} width={32} height={32} alt='이전 화살표 아이콘' />
          </li>
          <li
            className={`custom-next-banner ${
              currentIndex === selectedBanners.length - 1 || noBanners ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <Image src={leftArrow} width={32} height={32} className='scale-x-[-1] transform' alt='다음 화살표 아이콘' />
          </li>
        </ol>
      </div>
      <div className='relative mt-3 h-[11rem] w-full overflow-hidden rounded-[12px] bg-gray-50 md:h-[12rem] lg:h-[9rem]'>
        {noBanners ? (
          <div className='flex h-full w-full items-center justify-center text-lg font-medium text-gray-500'>
            추천 체험 배너가 없습니다.
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Keyboard, Mousewheel]}
            spaceBetween={10}
            slidesPerView={1}
            loop={false}
            navigation={{
              nextEl: '.custom-next-banner',
              prevEl: '.custom-prev-banner',
            }}
            keyboard={{
              enabled: true,
            }}
            mousewheel={{
              enabled: true,
            }}
            onSlideChange={handleSlideChange}
            className='h-full'
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {selectedBanners.map((banner) => (
              <SwiperSlide key={banner.id} className='h-full'>
                <Link
                  href={`/activities/${banner.id}`}
                  className='relative h-[300px] w-full'
                  aria-label='추천 체험 배너로 이동'
                >
                  <div className='relative z-0 h-full w-full'>
                    <Image
                      src={banner.imageUrl}
                      fill
                      className='z-0 object-cover object-center'
                      priority={false}
                      sizes='100%'
                      alt={banner.alt}
                    />
                    <div className='absolute z-10 h-full w-full bg-gradient-to-t from-black/70 to-transparent'></div>
                    <div className='absolute z-11 flex h-full w-full justify-between px-5.5 md:px-10'>
                      <ol className='flex h-full w-full flex-col items-baseline justify-center gap-2 text-white lg:mt-[10px] lg:flex-row lg:items-center lg:justify-between lg:gap-0'>
                        <li className='w-full lg:mt-[-20px] lg:w-[80%]'>
                          <div className='flex items-center gap-1'>
                            <Image src={starRating} width={14} height={14} alt='별점 아이콘' />
                            <span className='text-md'>
                              {banner.rating.toFixed(1)} ({banner.reviewCount})
                            </span>
                          </div>
                          <h4 className='w-full text-2xl font-bold break-words break-keep text-white'>
                            {banner.title}
                          </h4>
                        </li>
                        <li className='text-md text-white'>
                          <span className='text-2lg font-bold lg:text-xl'>
                            ₩ {new Intl.NumberFormat().format(banner.price)}
                          </span>
                          &nbsp;
                          <span className='opacity-50'>/ 인</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
