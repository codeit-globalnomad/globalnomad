'use client';
import { useActivities } from '@/lib/hooks/useActivities';
import BestActivityItem from './BestActivityItem';
import leftArrow from '@/assets/icons/left-arrow.svg';
import rightArrow from '@/assets/icons/right-arrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BestActivities() {
  const { data, isLoading, isError } = useActivities({
    method: 'offset',
    sort: 'most_reviewed',
    page: 1,
  });

  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil((data?.activities.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleActivities = data?.activities.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className='mx-auto w-full max-w-[1200px] px-6 max-[1250px]:px-6 min-[1251px]:px-0'>
      <div className='flex justify-between'>
        <section className='text-black-100 text-2lg font-bold md:text-3xl'>🔥 인기 체험</section>
        {!isTabletOrMobile && (
          <div className='flex gap-[12px]'>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='cursor-pointer'>
              <Image src={leftArrow} alt='이전 페이지네이션' className={currentPage === 1 ? 'opacity-50' : ''} />
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='cursor-pointer'>
              <Image
                src={rightArrow}
                alt='다음 페이지네이션'
                className={currentPage === totalPages ? 'opacity-50' : ''}
              />
            </button>
          </div>
        )}
      </div>

      {isTabletOrMobile ? (
        <div className='mt-[16px] flex gap-[16px] md:mt-[32px] md:gap-[24px]'>
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
        </div>
      ) : (
        <div className='mt-[16px] flex gap-[16px] md:mt-[32px] md:gap-[24px]'>
          {visibleActivities?.map((activity) => (
            <div key={activity.id} className='w-full max-w-[384px]'>
              <BestActivityItem activity={activity} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
