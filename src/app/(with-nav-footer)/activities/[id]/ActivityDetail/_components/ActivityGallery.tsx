'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Keyboard, EffectFade } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper';
import Lightbox from 'yet-another-react-lightbox';
import prevArrow from '@/assets/icons/left-arrow-white.svg';
import play from '@/assets/icons/play.svg';
import pause from '@/assets/icons/pause.svg';
import { ActivityDetailResponse } from '@/lib/types/activities';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'yet-another-react-lightbox/styles.css';

type ActivityGalleryProps = {
  activityDetail: ActivityDetailResponse | undefined;
};

export default function ActivityGallery({ activityDetail }: ActivityGalleryProps) {
  const { bannerImageUrl, subImages } = activityDetail || {};
  const images = bannerImageUrl ? [bannerImageUrl, ...(subImages?.map((img) => img.imageUrl) || [])] : [];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoplay) {
        swiperRef.current.autoplay.stop();
        setIsAutoplay(false);
      } else {
        swiperRef.current.autoplay.start();
        setIsAutoplay(true);
      }
    }
  };

  const onAutoplayStop = () => {
    setIsAutoplay(false);
  };

  const onAutoplayStart = () => {
    setIsAutoplay(true);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const hasMultipleImages = images.length > 1;

  return (
    <div className='relative h-[430px] w-full overflow-hidden md:h-[540px] md:rounded-lg lg:h-[550px]'>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Autoplay, Keyboard, EffectFade]}
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
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex + 1);
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        onAutoplayStop={onAutoplayStop}
        onAutoplayStart={onAutoplayStart}
        className='h-full'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='relative h-full w-full cursor-pointer' onClick={() => openLightbox(index)}>
              <Image
                src={image}
                alt={`${index + 1}번째 이미지`}
                fill
                sizes='100vw'
                className='object-cover object-center'
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
          <Image src={prevArrow} alt='다음 화살표 아이콘' className='scale-x-[-1] transform' />
        </button>
        {hasMultipleImages && (
          <button onClick={toggleAutoplay} className='flex cursor-pointer items-center justify-center'>
            {isAutoplay ? (
              <Image src={pause} alt='일시정지 아이콘' width={22} height={22} />
            ) : (
              <Image src={play} alt='재생 아이콘' width={22} height={22} />
            )}
          </button>
        )}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((src) => ({ src }))}
        index={lightboxIndex}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </div>
  );
}
