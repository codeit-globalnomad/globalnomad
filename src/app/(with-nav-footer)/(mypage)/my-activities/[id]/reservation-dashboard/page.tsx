'use client';

import FilterDropdown from '@/components/FilterDropdown';
import { useEffect, useMemo, useState } from 'react';
import MyCalendar from './_components/MyCalendar';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';
import MyActivitiesReservations from './_components/MyActivitiesReservations';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useMyActivities, useReservationDashboard } from '@/lib/hooks/useMyActivities';
import RetryError from '@/components/RetryError';

type ActivitiesFilterOption = {
  label: string;
  value?: number | string;
  onClick?: () => void;
};

export default function MyReservation() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentYear = Number(searchParams.get('year')) || new Date().getFullYear();
  const currentMonth = (Number(searchParams.get('month')) || new Date().getMonth() + 1).toString().padStart(2, '0');

  const { data: myActivities, isError: isMyActivitiesError, isLoading, refetch } = useMyActivities();
  const activities = myActivities?.activities;

  const [selectOption, setSelectOption] = useState<ActivitiesFilterOption | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  const activityIdFromParam = Number(id);
  const isActivityIdMissing = !id || isNaN(activityIdFromParam);

  const isValidActivityId = useMemo(
    () => activities?.some((a) => a.id === activityIdFromParam) ?? false,
    [activities, activityIdFromParam],
  );

  const { data: reservationDashboard, isError: isReservationDashboardError } = useReservationDashboard(
    Number(selectedActivityId),
    String(currentYear),
    String(currentMonth),
  );

  const isShowRetryError = isMyActivitiesError || isReservationDashboardError;
  const isShowActivityIdError = !isActivityIdMissing && !isValidActivityId;

  const activitiesFilterOption = useMemo(() => {
    return (
      activities?.map((act) => ({
        label: act.title,
        value: act.id,
      })) ?? []
    );
  }, [activities]);

  useEffect(() => {
    if (!isLoading && isActivityIdMissing) {
      router.replace('/my-activities/reservation-dashboard');
      return;
    }

    if (activities && isValidActivityId && activityIdFromParam) {
      setSelectedActivityId(activityIdFromParam);
      const selected = activitiesFilterOption.find((a) => a.value === activityIdFromParam);
      setSelectOption(selected || null);
    }
  }, [
    activities,
    activityIdFromParam,
    isActivityIdMissing,
    isValidActivityId,
    activitiesFilterOption,
    isLoading,
    router,
  ]);

  const handleSelectActivity = (option: ActivitiesFilterOption | null) => {
    setSelectOption(option);
    setSelectedActivityId(option?.value ? Number(option.value) : null);

    if (option?.value) {
      router.push(`/my-activities/${option.value}/reservation-dashboard?year=${currentYear}&month=${currentMonth}`);
    }
  };

  const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (!activeStartDate || !selectedActivityId) return;

    const newYear = activeStartDate.getFullYear();
    const newMonth = activeStartDate.getMonth() + 1;

    router.push(
      `/my-activities/${selectedActivityId}/reservation-dashboard?year=${newYear}&month=${newMonth.toString().padStart(2, '0')}`,
    );
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setPopupKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentYear && currentMonth) {
      setSelectedDate('');
      setPopupKey((prev) => prev + 1);
    }
  }, [currentYear, currentMonth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isShowRetryError) {
    return <RetryError onRetry={refetch} className='py-10' />;
  }

  if (isShowActivityIdError) {
    return <RetryError onRetry={refetch} className='py-20' />;
  }

  if (!id || activities?.length === 0) {
    return null;
  }

  return (
    <div className='text-black-100 relative'>
      <div className='relative flex flex-col gap-[32px]'>
        <h1 className='flex items-center text-2xl leading-[42px] font-bold'>예약 현황</h1>
        <FilterDropdown
          options={activitiesFilterOption}
          label='내가 등록한 체험'
          onSelect={handleSelectActivity}
          icon={arrowFilterDropdown2}
          buttonClassName='w-full rounded-[4px] h-[56px] border border-gray-800 py-2 px-4 bg-white'
          optionClassName='border-gray-800 p-3'
          dropdownClassName='w-full border rounded-[4px] border-gray-800 overflow-y-auto overflow-x-auto bg-white'
          includeAllOption={false}
          iconVisibleOnMobile={false}
          autoSelectFirstOption={false}
          selected={selectOption}
          value={selectOption?.label}
        />
        <span className='absolute top-[65px] left-[16px] bg-white px-2 text-[14px] font-normal'>체험명</span>
      </div>
      <div>
        <MyCalendar
          key={selectedActivityId + '-' + currentYear + '-' + currentMonth}
          onActiveStartDateChange={handleMonthChange}
          monthTotalData={reservationDashboard}
          onDateChange={handleDateClick}
          initialDate={
            currentYear && currentMonth ? new Date(Number(currentYear), Number(currentMonth) - 1) : new Date()
          }
        />
      </div>
      {selectedDate && selectedActivityId && (
        <MyActivitiesReservations key={popupKey} selectedDate={selectedDate} activityId={selectedActivityId} />
      )}
    </div>
  );
}
