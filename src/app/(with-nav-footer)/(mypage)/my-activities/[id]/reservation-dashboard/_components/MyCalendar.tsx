'use client';

import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import './myCalendar.css';
import Image from 'next/image';
import CalendarPrev from '@/assets/icons/calendar-prev.svg';
import CalendarNext from '@/assets/icons/calendar-next.svg';
import { useSearchParams } from 'next/navigation';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ReservationStatus {
  completed: number;
  confirmed: number;
  pending: number;
}

interface MonthReservation {
  date: string;
  reservations: ReservationStatus;
}

export interface Props {
  monthTotalData?: MonthReservation[];
  onDateChange: (date: string) => void;
  onActiveStartDateChange?: ({ activeStartDate }: { activeStartDate: Date | null }) => void;
}

export default function MyCalendar({ monthTotalData, onDateChange, onActiveStartDateChange }: Props) {
  const searchParams = useSearchParams();

  const year = Number(searchParams.get('year')) || new Date().getFullYear();
  const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

  const initialDate = new Date(year, month - 1, 1);
  const [calendarValue, setCalendarValue] = useState<Value>(initialDate);

  const reservationStatusMap: Record<
    keyof ReservationStatus,
    { label: (count: number) => string; bgColor: string; textColor: string }
  > = {
    completed: {
      label: (count) => `완료 ${count}`,
      bgColor: 'bg-gray-300',
      textColor: 'text-gray-900',
    },
    confirmed: {
      label: (count) => `승인 ${count}`,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-10',
    },
    pending: {
      label: (count) => `예약 ${count}`,
      bgColor: 'bg-blue-100',
      textColor: 'text-white',
    },
  };

  const reservationMap = new Map(monthTotalData?.map((data) => [data.date, data]) ?? []);

  const handleChange = (newValue: Value) => {
    if (!newValue) return;

    const selectedDate = Array.isArray(newValue) ? newValue[0] : newValue;
    if (selectedDate) {
      setCalendarValue(selectedDate);
      onDateChange(selectedDate.toLocaleDateString('sv-SE'));
    }
  };
  const renderTile = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('sv-SE');
      const dayData = reservationMap.get(formattedDate);

      return (
        <div>
          {dayData && (
            <div
              className={`absolute top-1 left-1 h-2 w-2 rounded-full ${dayData.reservations.completed ? 'bg-gray-900' : 'bg-blue-100'}`}
            ></div>
          )}
          <div className='text-md flex flex-col p-[2px]'>
            {dayData &&
              Object.keys(reservationStatusMap).map((key) => {
                const statusKey = key as keyof ReservationStatus;
                const count = dayData.reservations[statusKey];
                if (count > 0) {
                  const { label, bgColor, textColor } = reservationStatusMap[statusKey];
                  return (
                    <div key={key} className={`h-6 rounded pl-1 ${bgColor} ${textColor}`}>
                      {label(count)}
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    setCalendarValue(initialDate);
  }, [year, month]);

  return (
    <Calendar
      onChange={handleChange}
      tileContent={renderTile}
      value={calendarValue}
      onActiveStartDateChange={onActiveStartDateChange}
      formatShortWeekday={(locale, date) => {
        const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return weekDays[date.getDay()];
      }}
      formatDay={(locale, date) => date.getDate().toString()}
      calendarType='gregory'
      prevLabel={<Image className='cursor-pointer' src={CalendarPrev} width={24} height={24} alt='prev' />}
      nextLabel={<Image className='cursor-pointer' src={CalendarNext} width={24} height={24} alt='next' />}
      prev2Label={null}
      next2Label={null}
      className='my-calendar'
    />
  );
}
