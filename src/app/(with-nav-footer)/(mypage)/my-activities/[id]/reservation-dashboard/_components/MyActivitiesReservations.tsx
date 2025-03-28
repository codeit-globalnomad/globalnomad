'use client';

import Image from 'next/image';
import CloseImage from '@/assets/icons/close.svg';
import { useEffect, useRef } from 'react';
import { useReservedSchedule } from '@/lib/hooks/useMyActivities';

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  activityId: number;
};

export default function MyActivitiesReservations({ selectedDate, setSelectedDate, activityId }: Props) {
  const dateRef = useRef<HTMLDivElement | null>(null);
  const { data: dateSchedule } = useReservedSchedule(activityId, selectedDate);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setSelectedDate('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickClose = () => {
    setSelectedDate('');
  };

  const formattedDate =
    selectedDate
      .split('-')
      .join('년 ')
      .replace(/-(?=\d{2}$)/, '월 ') + '일';

  return (
    <div
      ref={dateRef}
      className='absolute top-[220px] right-0 flex min-h-[582px] w-[429px] flex-col gap-[27px] rounded-[24px] bg-red-50 px-6 py-6'
    >
      <div className='flex items-center justify-between'>
        <h1 className='text-[24px] leading-[32px] font-bold'>예약 정보</h1>
        <Image
          onClick={handleClickClose}
          className='cursor-pointer'
          src={CloseImage}
          width={40}
          height={40}
          alt='날짜별 예약 현황창 닫기'
          aria-label='예약 현황창 닫기'
        />
      </div>
      <div>
        <div className='mb-4 text-[20px] font-semibold'>예약 날짜</div>
        <div className='text-[20px] leading-[32px] font-normal'>{formattedDate}</div>
      </div>
    </div>
  );
}
