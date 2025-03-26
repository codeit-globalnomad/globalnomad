'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Keyboard, Mousewheel, EffectFade } from 'swiper/modules';
import { ActivityDetailResponse } from '@/lib/types/activities';
import prevArrow from '@/assets/icons/left-arrow-white.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type ActivityGalleryProps = {
  activityDetail: ActivityDetailResponse | undefined;
};

export default function ActivityGallery({ activityDetail }: ActivityGalleryProps) {
  const { bannerImageUrl, subImages } = activityDetail || {};
  const images = bannerImageUrl ? [bannerImageUrl, ...(subImages?.map((img) => img.imageUrl) || [])] : [];
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef(null);

  const progressCircle = useRef<SVGSVGElement | null>(null); // 진행 상태 원형
  const progressContent = useRef<HTMLElement | null>(null); // 진행 시간 텍스트

  const onAutoplayTimeLeft = (swiper: any, time: number, progress: number) => {
    // 진행 상태 원형 업데이트
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`); // 템플릿 리터럴 사용
    }

    // 진행 시간 텍스트 업데이트
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`; // 남은 시간 표시
    }
  };
  return (
    <div className='relative h-[410px] w-full md:h-[540px] md:rounded-lg lg:h-[550px]'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay, Keyboard, Mousewheel, EffectFade]}
        spaceBetween={10}
        slidesPerView={1}
        loop={false}
        effect='fade'
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        keyboard={{
          enabled: true,
        }}
        mousewheel={{
          enabled: true,
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex + 1);
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className='h-full'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='h-full w-full'>
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className='rounded-lg object-cover object-center'
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-white'>
        <button
          className={`custom-prev cursor-pointer ${currentIndex === 1 ? 'pointer-events-none opacity-30' : ''}`}
          aria-label='이전 슬라이드'
        >
          <Image src={prevArrow} alt='이전 화살표 아이콘' />
        </button>
        <span className='text-md'>
          <span className='font-bold'>{currentIndex}</span> / {images.length}
        </span>
        <button
          className={`custom-next cursor-pointer ${currentIndex === images.length ? 'pointer-events-none opacity-30' : ''}`}
          aria-label='다음 슬라이드'
        >
          <Image src={prevArrow} alt='이전 화살표 아이콘' className='scale-x-[-1] transform' />
        </button>
      </div>
      <div className='absolute right-4 bottom-[20px] z-60'>
        <span ref={progressContent} className='text-md font-semibold text-white'>
          0s
        </span>
      </div>
    </div>
  );
}
