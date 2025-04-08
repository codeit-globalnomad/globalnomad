'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import alert from '@/assets/icons/alert.svg';
import leftArrow from '@/assets/icons/left-arrow.svg';
import 'swiper/css';

type AvailableTime = {
  id: number;
  startTime: string;
  endTime: string;
};

type AvailableTimeSelectorProps = {
  availableTimes: AvailableTime[];
  selectedTimeId: number | null;
  disabledTimeIds: number[];
  selectedDate: Date | undefined;
  onSelectTime: (timeId: number) => void;
  swiperRef: React.RefObject<SwiperType | null>;
};

export default function AvailableTimeSelector({
  availableTimes = [],
  selectedTimeId,
  disabledTimeIds = [],
  selectedDate,
  onSelectTime,
  swiperRef,
}: AvailableTimeSelectorProps) {
  useEffect(() => {
    if (swiperRef.current && selectedTimeId) {
      const timeIndex = availableTimes.findIndex((timeSlot) => timeSlot.id === selectedTimeId);
      if (timeIndex !== -1) {
        swiperRef.current.slideTo(timeIndex);
      }
    }
  }, [selectedTimeId, availableTimes, swiperRef]);

  return (
    <li className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <p className='text-[22px] font-bold md:text-xl'>예약 가능한 시간</p>
        <ol className='z-10 mr-[-10px] flex cursor-pointer'>
          <li className={`custom-prev ${availableTimes.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
            <Image src={leftArrow} width={26} height={26} alt='이전 화살표 아이콘' />
          </li>
          <li className={`custom-next ${availableTimes.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
            <Image src={leftArrow} width={26} height={26} className='scale-x-[-1] transform' alt='다음 화살표 아이콘' />
          </li>
        </ol>
      </div>
      <div className='flex space-x-2'>
        {availableTimes.length > 0 ? (
          <Swiper
            modules={[Navigation, Keyboard]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            keyboard={{ enabled: true }}
            spaceBetween={10}
            slidesPerView='auto'
            loop={false}
            className='time-swiper m-0 h-auto'
            centeredSlides={false}
            key={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'default'}
          >
            {availableTimes.map((timeSlot) => (
              <SwiperSlide
                key={`${timeSlot.id}-${selectedTimeId}-${selectedDate}`}
                style={{ width: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center' }}
              >
                <label
                  className={`cursor-pointer rounded-md border-[1px] p-2 text-lg whitespace-nowrap ${
                    selectedTimeId === timeSlot.id ? 'bg-green-100 text-white' : ''
                  } ${disabledTimeIds.includes(timeSlot.id) ? 'cursor-not-allowed border-gray-400 bg-gray-200 text-gray-500' : 'border-green-100'}`}
                >
                  <input
                    type='radio'
                    value={`${timeSlot.startTime} - ${timeSlot.endTime}`}
                    onChange={() => onSelectTime(timeSlot.id)}
                    className='hidden'
                    disabled={disabledTimeIds.includes(timeSlot.id)}
                  />
                  {timeSlot.startTime} - {timeSlot.endTime}
                </label>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
      <p className='flex w-full items-center gap-1 overflow-hidden text-[15px] text-ellipsis whitespace-nowrap text-[#767676]'>
        <Image src={alert} width={16} height={16} alt='경고 아이콘' />
        <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
          {availableTimes.length === 0
            ? '이 날짜에는 예약 가능한 시간이 없습니다.'
            : '한 번의 예약에는 한 타임만 가능합니다.'}
        </span>
      </p>
      <hr className='mt-2 mb-2 w-full border-t-1 border-gray-300' />
    </li>
  );
}
