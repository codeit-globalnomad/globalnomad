'use client';

import CloseImage from '@/assets/icons/close.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReservedSchedule } from '@/lib/hooks/useMyActivities';
import { useClickOutside } from '@/lib/utils/useClickOutside';
import FilterDropdown from '@/components/FilterDropdown';
import ReservationCardList from './ReservationCardList';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';
import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';

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
  const { data: dateSchedule, isLoading, isError } = useReservedSchedule(activityId, selectedDate);
  const [selectedSchedule, setSelectedSchedule] = useState<FilterDropdownOption | null>(null);
  const [activeTab, setActiveTab] = useState<ReservationStatus | null>('pending');
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => {
    return dateSchedule
      ? dateSchedule.map((schedule) => ({
          label: `${schedule.startTime} ~ ${schedule.endTime}`,
          value: schedule.scheduleId,
        }))
      : [];
  }, [dateSchedule]);

  useEffect(() => {
    if (options.length > 0 && !selectedSchedule) {
      setSelectedSchedule(options[0]);
    }
  }, [options, selectedSchedule]);

  useEffect(() => {
    if (dateSchedule && dateSchedule.length > 0 && !activeTab) {
      setActiveTab('pending');
    }
  }, [dateSchedule, activeTab]);

  useEffect(() => {
    if (selectedDate) return setIsOpen(true);
  }, [selectedDate]);

  useClickOutside(popupRef, () => {
    setIsOpen(false);
    setSelectedDate('');
  });

  const handleClickClose = () => {
    setSelectedDate('');
    setIsOpen(false);
  };

  const handleSelect = (option: FilterDropdownOption | null) => {
    setSelectedSchedule(option);
  };

  const formattedDate =
    selectedDate
      .split('-')
      .join('년 ')
      .replace(/-(?=\d{2}$)/, '월 ') + '일';

  const filteredSchedule = selectedSchedule
    ? dateSchedule?.filter((schedule) => schedule.scheduleId === selectedSchedule.value)
    : null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading reservation data.</div>;
  }

  return (
    <div ref={popupRef}>
      {isOpen && (
        <div className='text-black-100 absolute top-[220px] right-0 flex h-[697px] min-h-[582px] w-[429px] flex-col gap-[27px] overflow-hidden rounded-[24px] border border-gray-300 bg-white px-6 py-6 shadow-md'>
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
              <div className='h-[500px] rounded-b-[24px] bg-gray-100'>
                <section className='flex items-center gap-5 border-b border-b-gray-300 bg-white text-[20px] leading-[32px] font-normal text-gray-900'>
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

                {activeTab && selectedSchedule && (
                  <div className='px-2 pt-[27px]'>
                    <ReservationCardList
                      type={activeTab}
                      scheduleId={Number(selectedSchedule.value)}
                      activityId={activityId}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='rounded-b-[24px] bg-gray-100'>
              <div className='h-[1px] w-full bg-gray-300'></div>
              <div className='flex flex-col items-center gap-4 px-[50px] py-[145px]'>
                <Image src={NoData} width={80} height={80} alt='선택된 시간대에 대한 예약 정보가 없습니다.' />
                <div className='items-center justify-center text-center text-gray-500'>
                  선택된 시간대에 대한 예약 정보가 없습니다.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
