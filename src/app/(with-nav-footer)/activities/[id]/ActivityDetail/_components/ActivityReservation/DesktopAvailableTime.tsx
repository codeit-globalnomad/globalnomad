'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import leftArrow from '@/assets/icons/left-arrow.svg';

type TimeSlot = {
  id: number;
  startTime: string;
  endTime: string;
};

type DesktopAvailableTimeProps = {
  availableTimes: TimeSlot[];
  disabledTimeIds: number[];
  selectedTimeId: number | null;
  onTimeSelection: (timeId: number) => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
};

export default function DesktopAvailableTime({
  availableTimes,
  disabledTimeIds,
  selectedTimeId,
  onTimeSelection,
  currentIndex,
  onIndexChange,
}: DesktopAvailableTimeProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
    onIndexChange(0);
  }, [availableTimes, onIndexChange]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <p className='text-xl font-bold'>예약 가능한 시간</p>
        <div className='z-10 mr-[-10px] flex cursor-pointer'>
          <div className={`custom-prev ${currentIndex === 0 ? 'pointer-events-none opacity-50' : ''}`}>
            <Image src={leftArrow} width={26} height={26} alt='이전 화살표 아이콘' />
          </div>
          <div
            className={`custom-next ${availableTimes.length === 0 || currentIndex === availableTimes.length - 1 ? 'pointer-events-none opacity-50' : ''}`}
          >
            <Image src={leftArrow} width={26} height={26} alt='다음 화살표 아이콘' className='scale-x-[-1] transform' />
          </div>
        </div>
      </div>
      <div className='flex space-x-2'>
        {availableTimes.length > 0 ? (
          <Swiper
            modules={[Navigation, Keyboard]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              if (swiper) swiper.slideTo(currentIndex);
            }}
            onSlideChange={(swiper) => {
              onIndexChange(swiper.activeIndex);
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            keyboard={{
              enabled: true,
            }}
            spaceBetween={10}
            slidesPerView='auto'
            loop={false}
            className='m-0 h-auto'
            centeredSlides={false}
            key={disabledTimeIds.length}
          >
            {availableTimes.map((timeSlot) => (
              <SwiperSlide
                key={`${timeSlot.id}-${selectedTimeId}`}
                style={{
                  width: 'auto',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: disabledTimeIds.includes(timeSlot.id) ? 'none' : 'auto',
                }}
              >
                <label
                  className={`cursor-pointer rounded-md border-[1px] p-2 text-lg whitespace-nowrap ${
                    selectedTimeId === timeSlot.id ? 'bg-green-100 text-white' : ''
                  } ${disabledTimeIds.includes(timeSlot.id) ? 'cursor-not-allowed border-gray-400 bg-gray-200 text-gray-500' : 'border-green-100'}`}
                >
                  <input
                    type='radio'
                    value={`${timeSlot.startTime} - ${timeSlot.endTime}`}
                    onChange={() => onTimeSelection(timeSlot.id)}
                    className='hidden'
                    disabled={disabledTimeIds.includes(timeSlot.id)}
                  />
                  {timeSlot.startTime} - {timeSlot.endTime}
                </label>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
