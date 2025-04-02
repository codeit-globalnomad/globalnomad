'use client';

import CloseImage from '@/assets/icons/close.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReservedSchedule, useReservations } from '@/lib/hooks/useMyActivities';
import { useClickOutside } from '@/lib/utils/useClickOutside';
import ReservationCardList from './ReservationCardList';
import Image from 'next/image';
import ReservationStatusTabs from './ReservationStatusTabs';
import NoReservations from './NoReservations';
import ReservationsTimeSelect from './ReservationsTimeSelect';
import LoadingSpinner from '@/components/LoadingSpinner';

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

export type ReservationStatus = 'pending' | 'confirmed' | 'declined';

export default function MyActivitiesReservations({ selectedDate, setSelectedDate, activityId }: Props) {
  const {
    data: dateSchedule,
    isLoading,
    isError,
    refetch: refetchReservations,
  } = useReservedSchedule(activityId, selectedDate);
  const [selectedSchedule, setSelectedSchedule] = useState<FilterDropdownOption | null>(null);
  const [activeTab, setActiveTab] = useState<ReservationStatus | null>('pending');
  const { data: reservationsData } = useReservations(activityId, {
    scheduleId: Number(selectedSchedule?.value),
    status: activeTab as ReservationStatus,
    size: 3,
  });
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const reservations = reservationsData?.reservations || [];

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
      setSelectedSchedule(options[0] || null);
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
    : undefined;

  useEffect(() => {
    if (!isLoading && filteredSchedule && filteredSchedule.length > 0) {
      refetchReservations();
    }
  }, [filteredSchedule, selectedSchedule, refetchReservations, isLoading]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <div ref={popupRef}>
      {isOpen && (
        <div className='text-black-100 absolute top-[220px] right-0 flex h-[697px] min-h-[582px] w-[429px] flex-col gap-[27px] rounded-[24px] border border-gray-300 bg-white px-6 py-6 shadow-md'>
          <div className='flex items-center justify-between'>
            <h1 className='text-[24px] leading-[32px] font-bold'>예약 정보</h1>
            <Image
              onClick={() => {
                setSelectedDate('');
                setIsOpen(false);
              }}
              className='cursor-pointer'
              src={CloseImage}
              width={30}
              height={30}
              alt='날짜별 예약 현황창 닫기'
              aria-label='예약 현황창 닫기'
            />
          </div>
          <ReservationsTimeSelect
            formattedDate={formattedDate}
            options={options}
            selectedSchedule={selectedSchedule}
            handleSelect={handleSelect}
          />
          {filteredSchedule && filteredSchedule.length > 0 ? (
            <>
              <div className='h-[420px] rounded-b-[24px] bg-gray-100'>
                <ReservationStatusTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  count={filteredSchedule[0].count}
                />

                {activeTab && selectedSchedule && (
                  <div className='px-2 py-[27px]'>
                    <ReservationCardList
                      status={activeTab}
                      reservations={reservations}
                      activityId={activityId}
                      scheduleId={Number(selectedSchedule?.value)}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <NoReservations />
          )}
        </div>
      )}
    </div>
  );
}
