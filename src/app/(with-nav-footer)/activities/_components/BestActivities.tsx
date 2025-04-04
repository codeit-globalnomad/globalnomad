'use client';

import { useState } from 'react';
import { useActivities } from '@/lib/hooks/useActivities';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import BestActivityItem from './BestActivityItem';
import Image from 'next/image';
import leftArrow from '@/assets/icons/left-arrow.svg';
import rightArrow from '@/assets/icons/right-arrow.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BestActivities() {
  const { data } = useActivities({
    method: 'offset',
    sort: 'most_reviewed',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const itemsPerPage = 3;
  const totalPages = Math.ceil((data?.activities.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleActivities = data?.activities.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1));
  const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));

  return (
    <div className='mx-auto w-full max-w-[1200px] px-6 max-[1250px]:px-6 min-[1251px]:px-0'>
      <div className='flex justify-between'>
        <section className='text-black-100 text-2lg font-bold md:text-3xl'>🔥 인기 체험</section>
        {!isTabletOrMobile && (
          <div className='flex gap-[12px]'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <Image
                src={leftArrow}
                alt='이전 페이지네이션'
                className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              />
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <Image
                src={rightArrow}
                alt='다음 페이지네이션'
                className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              />
            </button>
          </div>
        )}
      </div>

      <div className='mt-[16px] flex gap-[16px] md:mt-[32px] md:gap-[24px]'>
        {isTabletOrMobile ? (
          <Swiper
            spaceBetween={isMobile ? 16 : 24}
            slidesPerView={'auto'}
            centeredSlides={false}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
            modules={[Autoplay, Pagination]}
          >
            {data?.activities.map((activity) => (
              <SwiperSlide key={activity.id} className={isMobile ? '!w-[186px]' : '!max-w-[384px]'}>
                <BestActivityItem activity={activity} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          visibleActivities?.map((activity) => (
            <div key={activity.id} className='w-full max-w-[384px]'>
              <BestActivityItem activity={activity} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
