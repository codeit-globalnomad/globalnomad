import Calendar from 'react-calendar';
import React, { useState } from 'react';
import './myCalendar.css';
import Image from 'next/image';
import CalendarPrev from '@/assets/icons/calendar-prev.svg';
import CalendarNext from '@/assets/icons/calendar-next.svg';

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
}

export default function MyCalendar({ monthTotalData, onDateChange }: Props) {
  const [value, setValue] = useState<Value>(new Date());
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
      label: (count) => `예약 ${count}`,
      bgColor: 'bg-blue-100',
      textColor: 'text-white',
    },
    pending: {
      label: (count) => `승인 ${count}`,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-10',
    },
  };

  const handleChange = (date: Value) => {
    setValue(date);
    if (date instanceof Date) {
      onDateChange(date.toLocaleDateString('sv-SE'));
    }
  };

  const renderTile = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('sv-SE');
      const dayData = monthTotalData?.find((d) => d.date === formattedDate);

      return (
        <div>
          {dayData && (
            <div
              className={`absolute top-3 left-10 h-2 w-2 rounded-full ${dayData.reservations.completed ? 'bg-gray-900' : 'bg-blue-100'}`}
            ></div>
          )}
          <div className='text-md flex flex-col p-[2px]'>
            {dayData &&
              (Object.keys(reservationStatusMap) as (keyof ReservationStatus)[]).map((key) => {
                const count = dayData.reservations[key];
                if (count !== 0) {
                  const { label, bgColor, textColor } = reservationStatusMap[key];
                  return (
                    <div key={key} className={`h-6 rounded pl-1 ${bgColor} ${textColor}`}>
                      {label(count)}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Calendar
      onChange={handleChange}
      tileContent={renderTile}
      value={value}
      formatShortWeekday={(locale, date) => {
        const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return weekDays[date.getDay()];
      }}
      formatDay={(locale, date) => {
        return date.getDate().toString();
      }}
      calendarType='gregory'
      prevLabel={<Image className='cursor-pointer' src={CalendarPrev} width={24} height={24} alt='prev' />}
      nextLabel={<Image className='cursor-pointer' src={CalendarNext} width={24} height={24} alt='next' />}
      prev2Label={null}
      next2Label={null}
      className='my-calendar'
    />
  );
}
