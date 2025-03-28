'use client';

import Image from 'next/image';
import CloseImage from '@/assets/icons/close.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReservedSchedule } from '@/lib/hooks/useMyActivities';
import FilterDropdown from '@/components/FilterDropdown';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';
import ReservationDetails from './ReservationDetails';

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  activityId: number;
};

type FilterDropdownOption = {
  label: string;
  value?: string | number;
  onClick?: () => void;
};

type ReservationStatus = 'pending' | 'confirmed' | 'declined';

export default function MyActivitiesReservations({ selectedDate, setSelectedDate, activityId }: Props) {
  const dateRef = useRef<HTMLDivElement | null>(null);
  const { data: dateSchedule } = useReservedSchedule(activityId, selectedDate);
  const [selectedSchedule, setSelectedSchedule] = useState<FilterDropdownOption | null>(null);
  const [activeTab, setActiveTab] = useState<ReservationStatus | null>(null);

  const options = useMemo(() => {
    return dateSchedule
      ? dateSchedule.map((schedule) => ({
          label: `${schedule.startTime} ~ ${schedule.endTime}`,
          value: schedule.scheduleId,
        }))
      : [];
  }, [dateSchedule]);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedSchedule(options[0]);
    }
  }, [options]);

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

  const handleSelect = (option: FilterDropdownOption | null) => {
    setSelectedSchedule(option);
    setActiveTab(null);
  };

  const formattedDate =
    selectedDate
      .split('-')
      .join('년 ')
      .replace(/-(?=\d{2}$)/, '월 ') + '일';

  const filteredSchedule = selectedSchedule
    ? dateSchedule?.filter((schedule) => schedule.scheduleId === selectedSchedule.value)
    : null;

  return (
    <div
      ref={dateRef}
      className='text-black-100 absolute top-[220px] right-0 flex min-h-[582px] w-[429px] flex-col gap-[27px] rounded-[24px] border border-gray-300 bg-white px-6 py-6'
    >
      <div className='flex items-center justify-between'>
        <h1 className='text-[24px] leading-[32px] font-bold'>예약 정보</h1>
        <Image
          onClick={handleClickClose}
          className='cursor-pointer'
          src={CloseImage}
          width={30}
          height={30}
          alt='날짜별 예약 현황창 닫기'
          aria-label='예약 현황창 닫기'
        />
      </div>
      <div>
        <div className='mb-4 text-[20px] font-semibold'>예약 날짜</div>
        <div className='mb-1 text-[20px] leading-[32px] font-normal'>{formattedDate}</div>
        <FilterDropdown
          options={options}
          onSelect={handleSelect}
          label='시간대 선택'
          icon={arrowFilterDropdown2}
          selected={selectedSchedule || { label: '시작시간 ~ 종료시간', value: '' }}
          buttonClassName='w-full rounded-[4px] h-[56px] border border-gray-800 py-2 px-4 text-black-100 bg-white'
          optionClassName='border-gray-800 p-3'
          dropdownClassName='w-full border rounded-[4px] border-gray-800 overflow-y-auto overflow-x-auto bg-white'
        />
      </div>
      {filteredSchedule && filteredSchedule.length > 0 ? (
        <>
          <section className='flex items-center gap-5 border-b border-b-gray-300 text-[20px] leading-[32px] font-normal text-gray-900'>
            <button
              className={`cursor-pointer ${activeTab === 'pending' ? 'pm-[6px] border-b-[4px] border-green-100 text-[20px] leading-[32px] font-semibold text-green-100' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              신청 {filteredSchedule[0].count.pending}
            </button>
            <button
              className={`cursor-pointer ${activeTab === 'confirmed' ? 'pm-[6px] border-b-[4px] border-green-100 text-[20px] leading-[32px] font-semibold text-green-100' : ''}`}
              onClick={() => setActiveTab('confirmed')}
            >
              승인 {filteredSchedule[0].count.confirmed}
            </button>
            <button
              className={`cursor-pointer ${activeTab === 'declined' ? 'pm-[6px] border-b-[4px] border-green-100 text-[20px] leading-[32px] font-semibold text-green-100' : ''}`}
              onClick={() => setActiveTab('declined')}
            >
              거절 {filteredSchedule[0].count.declined}
            </button>
          </section>
          {activeTab && <ReservationDetails type={activeTab} />}
        </>
      ) : (
        <div className='items-center justify-center text-center text-gray-500'>
          선택된 시간대에 대한 예약 정보가 없습니다.
        </div>
      )}
    </div>
  );
}
