'use client';

import FilterDropdown from '@/components/FilterDropdown';
import { useCallback, useEffect, useState } from 'react';
import MyCalendar from '../reservation-dashboard/_components/MyCalendar';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';
import { MyActivitiesResponse, ReservationDashboardResponse } from '@/lib/types/myActivities';

type Props = {
  activity: MyActivitiesResponse;
  monthData: ReservationDashboardResponse;
};

type ActivitiesFilterOption = {
  label: string;
  value?: number | string;
  onClick?: () => void;
};

export default function MyActivityFilter({ activity, monthData }: Props) {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentYear = Number(searchParams.get('year')) || new Date().getFullYear();
  const currentMonth = (Number(searchParams.get('month')) || new Date().getMonth() + 1).toString().padStart(2, '0');

  const [selectOption, setSelectOption] = useState<ActivitiesFilterOption | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  const activitiesFilterOption = activity.activities.map((act) => ({
    label: act.title,
    value: act.id,
  }));

  useEffect(() => {
    if (id) {
      const activityId = Number(id);
      setSelectedActivityId(activityId);

      // URL의 id에 해당하는 옵션을 selectOption에 설정
      const selectedActivity = activitiesFilterOption.find((activity) => activity.value === activityId);
      setSelectOption(selectedActivity || null);
    }
  }, [id, activity.activities]);

  useEffect(() => {
    const dateStr = `${currentYear}-${currentMonth}`;
    setSelectedDate(dateStr);
  }, [currentYear, currentMonth]);

  const handleSelectActivity = (option: ActivitiesFilterOption | null) => {
    setSelectOption(option);
    setSelectedActivityId(option?.value ? Number(option.value) : null);

    if (option?.value) {
      router.push(`/my-activities/${option.value}/reservation-dashboard?year=${currentYear}&month=${currentMonth}`);
    }
  };

  useEffect(() => {
    console.log('selectedDate:', selectedDate);
  }, [selectedDate]);

  const handleMonthChange = useCallback(
    ({ activeStartDate }: { activeStartDate: Date | null }) => {
      if (!activeStartDate || !selectedActivityId) return;

      const newYear = activeStartDate.getFullYear();
      const newMonth = activeStartDate.getMonth() + 1;

      if (selectedActivityId) {
        router.push(
          `/my-activities/${selectedActivityId}/reservation-dashboard?year=${newYear}&month=${newMonth.toString().padStart(2, '0')}`,
        );
      }
    },
    [selectedActivityId, currentYear, currentMonth],
  );

  return (
    <div>
      <div className='relative flex flex-col gap-[32px]'>
        <h1 className='text-[32px] leading-[42px] font-bold'>예약현황</h1>
        <FilterDropdown
          options={activitiesFilterOption}
          label='내가 등록한 체험'
          onSelect={handleSelectActivity}
          icon={arrowFilterDropdown2}
          buttonClassName='h-[56px] w-full border text-black-100 border-gray-800 rounded-lg md:justify-between px-[15px] py-[12px] md:h-[56px] md:px-[15px] md:py-[15px]'
          dropdownClassName='rounded-xl w-full border border-gray-300 bg-white drop-shadow-sm max-h-[200px] overflow-x-hidden overflow-y-auto'
          optionClassName='text-md md:text-lg w-full h-[40px] leading-[40px] md:h-[50px] md:leading-[50px]'
          includeAllOption={false}
          iconVisibleOnMobile={false}
          autoSelectFirstOption={false}
          selected={selectOption}
        />
        <span className='absolute top-[65px] left-[16px] bg-white'>체험명</span>
      </div>
      <div>
        <MyCalendar
          onActiveStartDateChange={handleMonthChange}
          monthTotalData={monthData}
          onDateChange={setSelectedDate}
        />
      </div>
    </div>
  );
}
