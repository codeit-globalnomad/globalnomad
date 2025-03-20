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

interface Props {
  monthTotalData?: MonthReservation[];
  onDateChange: (date: string) => void;
}

export default function MyCalendar({ monthTotalData, onDateChange }: Props) {
  const [value, setValue] = useState<Value>(new Date());

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
              className={`absolute top-[12px] left-[40px] h-[8px] w-[8px] rounded-full ${dayData.reservations.completed ? 'bg-gray-900' : 'bg-blue-100'}`}
            ></div>
          )}
          <div className='text-md flex flex-col p-[2px]'>
            {dayData && dayData.reservations.completed !== 0 && (
              <div className='h-[23px] rounded bg-gray-300 pl-[4px] text-gray-900'>
                완료 {dayData.reservations.completed}
              </div>
            )}
            {dayData && dayData.reservations.confirmed !== 0 && (
              <div className='h-[23px] rounded bg-blue-100 pl-[4px] text-white'>
                예약 {dayData.reservations.confirmed}
              </div>
            )}
            {dayData && dayData.reservations.pending !== 0 && (
              <div className='text-orange-10 h-[23px] rounded bg-orange-100 pl-[4px]'>
                승인 {dayData.reservations.pending}
              </div>
            )}
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
