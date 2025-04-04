'use client';

import FilterDropdown from '@/components/FilterDropdown';
import { useCallback, useEffect, useState } from 'react';
import MyCalendar from './_components/MyCalendar';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';
import { MyActivitiesResponse, ReservationDashboardResponse } from '@/lib/types/myActivities';
import MyActivitiesReservations from './_components/MyActivitiesReservations';
import LoadingSpinner from '@/components/LoadingSpinner';

type Props = {
  activity: MyActivitiesResponse;
  monthData: ReservationDashboardResponse;
};

type ActivitiesFilterOption = {
  label: string;
  value?: number | string;
  onClick?: () => void;
};

export default function MyReservation({ activity, monthData }: Props) {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentYear = Number(searchParams.get('year')) || new Date().getFullYear();
  const currentMonth = (Number(searchParams.get('month')) || new Date().getMonth() + 1).toString().padStart(2, '0');

  const [selectOption, setSelectOption] = useState<ActivitiesFilterOption | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const activitiesFilterOption = activity.activities.map((act) => ({
    label: act.title,
    value: act.id,
  }));

  useEffect(() => {
    if (!id && activity.activities.length === 0) return;

    setLoading(true);
    const activityId = Number(id);
    setSelectedActivityId(activityId);

    const selectedActivity = activitiesFilterOption.find((activity) => activity.value === activityId);
    setSelectOption(selectedActivity || null);

    setLoading(false);
  }, [id, activity.activities]);

  const handleSelectActivity = (option: ActivitiesFilterOption | null) => {
    setSelectOption(option);
    setSelectedActivityId(option?.value ? Number(option.value) : null);

    if (option?.value) {
      router.push(`/my-activities/${option.value}/reservation-dashboard?year=${currentYear}&month=${currentMonth}`);
    }
  };

  const handleMonthChange = useCallback(
    ({ activeStartDate }: { activeStartDate: Date | null }) => {
      if (!activeStartDate || !selectedActivityId) return;

      const newYear = activeStartDate.getFullYear();
      const newMonth = activeStartDate.getMonth() + 1;

      router.push(
        `/my-activities/${selectedActivityId}/reservation-dashboard?year=${newYear}&month=${newMonth.toString().padStart(2, '0')}`,
      );
    },
    [selectedActivityId],
  );

  if (loading) {
    return <LoadingSpinner />;
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
          onActiveStartDateChange={handleMonthChange}
          monthTotalData={monthData}
          onDateChange={setSelectedDate}
        />
      </div>
      {selectedDate && selectedActivityId && (
        <MyActivitiesReservations
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          activityId={selectedActivityId}
        />
      )}
    </div>
  );
}
