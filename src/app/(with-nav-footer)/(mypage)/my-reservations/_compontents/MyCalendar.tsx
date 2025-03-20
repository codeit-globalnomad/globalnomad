import Calendar from 'react-calendar';
import React, { useState } from 'react';
import './myCalendar.css';
import Image from 'next/image';
import CalendarPrev from '@/assets/icons/calendar-prev.svg';
import CalendarNext from '@/assets/icons/calendar-next.svg';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  console.log(value);

  return (
    <Calendar
      onChange={onChange}
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
      nextLabel={<Image className='cursor-pointer' src={CalendarNext} width={24} height={24} alt='prev' />}
      prev2Label={null}
      next2Label={null}
      className='my-calendar'
    />
  );
}
