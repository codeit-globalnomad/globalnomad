'use client';
import Button from '@/components/Button';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import categoryArrowRight from '@/assets/icons/category-arrow-right.svg';
import categoryArrowLeft from '@/assets/icons/category-arrow-left.svg';

export default function Category({
  selectedCategory,
  onSelect,
}: {
  selectedCategory: string | undefined;
  onSelect: (category: string | undefined) => void;
}) {
  const categories = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? undefined : category;
    onSelect(newCategory);
  };

  useEffect(() => {
    if (!swiperRef.current) return;
    setIsStart(swiperRef.current.isBeginning);
    setIsEnd(swiperRef.current.isEnd);
  }, [isMobileOrTablet]);

  const handleArrowClick = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slideTo(isEnd ? 0 : isStart ? categories.length - 1 : swiperRef.current.activeIndex + 1);
  };

  return (
    <div className='relative flex w-full items-start md:w-full'>
      {isMobileOrTablet ? (
        <>
          <div
            className={`pointer-events-none absolute top-0 right-0 h-full w-[75px] bg-gradient-to-l from-white to-transparent transition-opacity ${
              isEnd ? 'opacity-0' : 'opacity-100'
            } z-10`}
          />
          <Swiper
            spaceBetween={16}
            slidesPerView={'auto'}
            loop={false}
            freeMode
            className='z-0 lg:hidden'
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsStart(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsStart(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category} style={{ width: 'auto' }}>
                <Button
                  variant='outline'
                  className={`md:text-2lg h-[42px] w-[80px] rounded-2xl text-center text-lg font-medium whitespace-nowrap md:h-[53px] md:w-[120px] ${
                    selectedCategory == category ? 'bg-black-200 text-white' : ''
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className='absolute top-1/2 right-0 z-20 -translate-y-1/2 cursor-pointer rounded-full'
            onClick={handleArrowClick}
          >
            <Image
              src={isEnd ? categoryArrowLeft : categoryArrowRight}
              alt={isEnd ? '좌측 화살표' : '우측 화살표'}
              width={32}
              height={32}
            />
          </button>
        </>
      ) : (
        <div className='flex gap-[8px] overflow-x-auto md:gap-[14px] lg:gap-[20px]'>
          {categories.map((category, index) => (
            <Button
              variant='outline'
              className={`text-2lg h-[53px] w-[120px] rounded-2xl text-center font-medium whitespace-nowrap ${
                selectedCategory === category ? 'bg-black-200 text-white' : ''
              } ${isEnd && index === categories.length - 1 ? 'opacity-50' : ''}`}
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
